import React, {useState} from "react";
import {View, Text, ScrollView, Alert} from "react-native";
import {TextInput, Checkbox, Button, Modal, Portal} from "react-native-paper";
import {useRouter} from "expo-router";
import ScreenLayout from "@/components/layout/screen-layout";
import {
  CardFormData, CardFormErrors,
  detectCardNetwork, formatCardNumber,
  formatExpiry, validateCardForm,
} from "@/components/features/cards";
import {CheckCircle2} from "lucide-react-native";
import {useAuthStore} from "@/stores/auth.store";
import {useCardStore} from "@/stores/card.store";

const SuccessModal: React.FC<{visible: boolean; onDone: () => void}> = ({visible, onDone}) => (
  <Portal>
    <Modal
      visible={visible}
      onDismiss={onDone}
      contentContainerStyle={{
        backgroundColor: "#ffffff",
        marginHorizontal: 32,
        borderRadius: 20,
        padding: 32,
        alignItems: "center",
        gap: 12,
      }}
    >
      <CheckCircle2 size={56} color="#16a34a" strokeWidth={1.5} />
      <Text style={{fontSize: 16, fontWeight: "700", color: "#2D0D3A", textAlign: "center"}}>
        Card added successfully
      </Text>
      <Text style={{fontSize: 13, color: "#9CA3AF", textAlign: "center"}}>
        You have successfully added a card to your account.
      </Text>
      <Button
        mode="contained"
        onPress={onDone}
        style={{marginTop: 8, borderRadius: 12, width: "100%"}}
        buttonColor="#56034C"
        labelStyle={{fontWeight: "700", fontSize: 14}}
      >
        Done
      </Button>
    </Modal>
  </Portal>
);

const inputTheme = {
  colors: {
    primary: "#56034C",
    error: "#dc2626",
    background: "#ffffff",
    onSurfaceVariant: "#9CA3AF",
    outline: "#E8D9EC",
  },
  roundness: 12,
};

const AddCardScreen: React.FC = () => {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const {addCard} = useCardStore();

  const [form, setForm] = useState<CardFormData>({
    cardNumber: "",
    cardHolderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    saveCard: true,
  });
  const [errors, setErrors] = useState<CardFormErrors>({});
  const [showCvv, setShowCvv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const network = detectCardNetwork(form.cardNumber);

  const networkLabel: Record<string, string> = {
    visa: "VISA", mastercard: "MC", amex: "AMEX", discover: "DISC",
  };

  const isFormFilled =
    form.cardNumber.replace(/\s/g, "").length === 16 &&
    form.cardHolderName.trim().length > 0 &&
    form.expiryMonth.length === 2 &&
    form.expiryYear.length === 2 &&
    form.cvv.length >= 3;

  const handleCardNumberChange = (val: string) => {
    setForm((p) => ({...p, cardNumber: formatCardNumber(val)}));
    if (errors.cardNumber) setErrors((p) => ({...p, cardNumber: undefined}));
  };

  const handleExpiryChange = (val: string) => {
    const formatted = formatExpiry(val);
    const parts = formatted.split("/");
    setForm((p) => ({
      ...p,
      expiryMonth: parts[0] ?? "",
      expiryYear: parts[1] ?? "",
    }));
    if (errors.expiry) setErrors((p) => ({...p, expiry: undefined}));
  };

  const expiryValue =
    form.expiryMonth && form.expiryYear
      ? `${form.expiryMonth}/${form.expiryYear}`
      : form.expiryMonth;

  const handleSubmit = async () => {
    const validationErrors = validateCardForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!profile?.id) return;

    setLoading(true);
    const rawNumber = form.cardNumber.replace(/\s/g, "");
    const {error} = await addCard({
      user_id: profile.id,
      network: network || "visa",
      type: "debit",
      status: "active",
      label: `${(network || "visa").toUpperCase()} •••• ${rawNumber.slice(-4)}`,
      card_holder_name: form.cardHolderName,
      masked_pan: rawNumber.slice(-4),
      expiry_month: form.expiryMonth,
      expiry_year: form.expiryYear,
      balance: 0,
      credit_limit: null,
      available_credit: null,
      gradient_variant: cards_count() % 2 === 0 ? "primary" : "secondary",
    });

    setLoading(false);
    if (error) {
      Alert.alert("Error", error);
      return;
    }
    setShowSuccess(true);
  };

  const cards_count = () => useCardStore.getState().cards.length;

  const handleDone = () => {
    setShowSuccess(false);
    router.back();
  };

  return (
    <ScreenLayout screen="add-card" showBack navbarTitle="Add Cards">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 12, paddingBottom: 40}}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-sm text-muted-foreground text-center mb-2">
          Kindly enter your card details below.
        </Text>

        <TextInput
          label="Card number"
          mode="outlined"
          value={form.cardNumber}
          onChangeText={handleCardNumberChange}
          keyboardType="numeric"
          maxLength={19}
          error={!!errors.cardNumber}
          theme={inputTheme}
          right={
            network ? (
              <TextInput.Affix
                text={networkLabel[network] ?? ""}
                textStyle={{
                  color: network === "visa" ? "#1A1F71" : "#EB001B",
                  fontWeight: "900",
                  fontStyle: "italic",
                  fontSize: 13,
                }}
              />
            ) : (
              <TextInput.Icon icon="credit-card-outline" color="#9CA3AF" />
            )
          }
        />
        {errors.cardNumber && (
          <Text className="text-xs text-red-600 -mt-2">{errors.cardNumber}</Text>
        )}

        <TextInput
          label="Card holder's name"
          mode="outlined"
          value={form.cardHolderName}
          onChangeText={(val) => {
            setForm((p) => ({...p, cardHolderName: val}));
            if (errors.cardHolderName) setErrors((p) => ({...p, cardHolderName: undefined}));
          }}
          autoCapitalize="words"
          error={!!errors.cardHolderName}
          theme={inputTheme}
        />
        {errors.cardHolderName && (
          <Text className="text-xs text-red-600 -mt-2">{errors.cardHolderName}</Text>
        )}

        <View className="flex-row gap-x-3">
          <View className="flex-1">
            <TextInput
              label="Valid thru (MM/YY)"
              mode="outlined"
              value={expiryValue}
              onChangeText={handleExpiryChange}
              keyboardType="numeric"
              maxLength={5}
              error={!!errors.expiry}
              theme={inputTheme}
            />
            {errors.expiry && (
              <Text className="text-xs text-red-600 mt-1">{errors.expiry}</Text>
            )}
          </View>
          <View className="flex-1">
            <TextInput
              label="CVV"
              mode="outlined"
              value={form.cvv}
              onChangeText={(val) => {
                setForm((p) => ({...p, cvv: val.replace(/\D/g, "").slice(0, 4)}));
                if (errors.cvv) setErrors((p) => ({...p, cvv: undefined}));
              }}
              keyboardType="numeric"
              secureTextEntry={!showCvv}
              maxLength={4}
              error={!!errors.cvv}
              theme={inputTheme}
              right={
                <TextInput.Icon
                  icon={showCvv ? "eye" : "eye-off"}
                  color="#9CA3AF"
                  onPress={() => setShowCvv((v) => !v)}
                />
              }
            />
            {errors.cvv && (
              <Text className="text-xs text-red-600 mt-1">{errors.cvv}</Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center gap-x-2 mt-1">
          <Checkbox
            status={form.saveCard ? "checked" : "unchecked"}
            onPress={() => setForm((p) => ({...p, saveCard: !p.saveCard}))}
            color="#56034C"
          />
          <Text className="text-sm text-foreground">
            Save this card for later payments
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!isFormFilled || loading}
          loading={loading}
          style={{borderRadius: 16, marginTop: 8}}
          buttonColor={isFormFilled && !loading ? "#56034C" : "#E8D9EC"}
          labelStyle={{
            fontWeight: "700",
            fontSize: 14,
            color: isFormFilled && !loading ? "#ffffff" : "#9CA3AF",
          }}
        >
          {loading ? "Adding card..." : "Add Card"}
        </Button>
      </ScrollView>

      <SuccessModal visible={showSuccess} onDone={handleDone} />
    </ScreenLayout>
  );
};

export default AddCardScreen;