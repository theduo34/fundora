import React, { useState } from "react";
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "@/components/ui/app-button";
import { useAuthStore } from "@/stores/auth.store";
import { AuthInput } from "@/components/features/auth/auht-input";

const VerifyOtpScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { verifyOtp, loading } = useAuthStore();
  
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!code || code.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    
    const safeEmail = Array.isArray(email) ? email[0] : email || "";
    const { error: verifyError } = await verifyOtp(safeEmail, code);
    
    if (verifyError) {
      Alert.alert("Verification Failed", verifyError);
      return;
    }

    Alert.alert(
      "Success", 
      "Account verified! You can now log in.", 
      [{ text: "Login", onPress: () => router.replace("/(auth)/login" as any) }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 24, gap: 24}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="gap-y-2 mb-4">
            <Text className="text-2xl font-bold text-foreground text-center">Verify Email</Text>
            <Text className="text-sm text-muted-foreground text-center leading-5 px-4">
              An OTP code was sent to your account ({email}). Please enter it below to verify your account.
            </Text>
          </View>

          <View className="gap-y-1">
            <AuthInput
              label="Verification Code (6 digits)"
              value={code}
              onChangeText={(v) => {
                setCode(v);
                if (error) setError("");
              }}
              keyboardType="number-pad"
              maxLength={6}
              error={error}
              left={<TextInput.Icon icon="shield-key-outline" color="#9CA3AF" />}
            />
            {error ? (
              <Text className="text-xs text-red-600 mt-1">{error}</Text>
            ) : null}
          </View>

          <AppButton
            title={loading ? "Verifying..." : "Verify Account"}
            onPress={handleVerify}
            loading={loading}
            disabled={code.length < 6}
            style={{marginTop: 8}}
          />

          <AppButton
            title="Back to Login"
            onPress={() => router.replace("/(auth)/login" as any)}
            disabled={loading}
            variant="ghost"
            style={{marginTop: 4}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyOtpScreen;