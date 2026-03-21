import React, {useState} from "react";
import {View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native";
import {TextInput} from "react-native-paper";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {AppButton} from "@/components/ui/app-button";
import {SignUpForm, SignUpFormErrors, validateSignUp} from "@/components/features/auth";
import {AuthInput} from "@/components/features/auth/auht-input";
import {SocialButtons} from "@/components/features/auth/social-button";
import {useAuthStore} from "@/stores/auth.store";

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const { signUp, loading } = useAuthStore();

  const [form, setForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const update = (key: keyof SignUpForm) => (val: string) => {
    setForm((p) => ({...p, [key]: val}));
    if (errors[key]) setErrors((p) => ({...p, [key]: undefined}));
  };

  const handleSignUp = async () => {
    const errs = validateSignUp(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const { error } = await signUp({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    });

    if (error) {
      Alert.alert("Sign Up Failed", error);
      return;
    }

    Alert.alert(
      "Success", 
      "Successfully registered an account", 
      [
        {
          text: "OK",
          onPress: () => router.push({ pathname: "/(auth)/verify-otp", params: { email: form.email } } as any)
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{padding: 24, gap: 16, paddingBottom: 40}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="gap-y-1 mb-2">
            <Text className="text-2xl font-bold text-foreground">Create account</Text>
            <Text className="text-sm text-muted-foreground">
              Fill in your details to get started
            </Text>
          </View>

          <SocialButtons onGoogle={() => {}} onFacebook={() => {}} />

          <View className="flex-row items-center gap-x-3">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-xs text-muted-foreground">or continue with email</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <View className="flex-row gap-x-3">
            <View className="flex-1">
              <AuthInput
                label="First name"
                value={form.firstName}
                onChangeText={update("firstName")}
                autoCapitalize="words"
                error={errors.firstName}
                left={<TextInput.Icon icon="account-outline" color="#9CA3AF" />}
              />
              {errors.firstName && (
                <Text className="text-xs text-red-600 mt-1">{errors.firstName}</Text>
              )}
            </View>
            <View className="flex-1">
              <AuthInput
                label="Last name"
                value={form.lastName}
                onChangeText={update("lastName")}
                autoCapitalize="words"
                error={errors.lastName}
              />
              {errors.lastName && (
                <Text className="text-xs text-red-600 mt-1">{errors.lastName}</Text>
              )}
            </View>
          </View>

          <View>
            <AuthInput
              label="Email"
              value={form.email}
              onChangeText={update("email")}
              keyboardType="email-address"
              error={errors.email}
              left={<TextInput.Icon icon="email-outline" color="#9CA3AF" />}
            />
            {errors.email && (
              <Text className="text-xs text-red-600 mt-1">{errors.email}</Text>
            )}
          </View>

          <View>
            <AuthInput
              label="Phone number"
              value={form.phone}
              onChangeText={update("phone")}
              keyboardType="phone-pad"
              error={errors.phone}
              left={<TextInput.Icon icon="phone-outline" color="#9CA3AF" />}
            />
            {errors.phone && (
              <Text className="text-xs text-red-600 mt-1">{errors.phone}</Text>
            )}
          </View>

          <View>
            <AuthInput
              label="Password"
              value={form.password}
              onChangeText={update("password")}
              secureTextEntry={!showPw}
              error={errors.password}
              left={<TextInput.Icon icon="lock-outline" color="#9CA3AF" />}
              right={
                <TextInput.Icon
                  icon={showPw ? "eye" : "eye-off"}
                  color="#9CA3AF"
                  onPress={() => setShowPw((v) => !v)}
                />
              }
            />
            {errors.password && (
              <Text className="text-xs text-red-600 mt-1">{errors.password}</Text>
            )}
          </View>

          <View>
            <AuthInput
              label="Confirm password"
              value={form.confirmPassword}
              onChangeText={update("confirmPassword")}
              secureTextEntry={!showCpw}
              error={errors.confirmPassword}
              left={<TextInput.Icon icon="lock-check-outline" color="#9CA3AF" />}
              right={
                <TextInput.Icon
                  icon={showCpw ? "eye" : "eye-off"}
                  color="#9CA3AF"
                  onPress={() => setShowCpw((v) => !v)}
                />
              }
            />
            {errors.confirmPassword && (
              <Text className="text-xs text-red-600 mt-1">{errors.confirmPassword}</Text>
            )}
          </View>

          <AppButton
            title={loading ? "Registering..." : "Create Account"}
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
            style={{marginTop: 4, flex: 1}}
            variant={"primary"}
          />

          <View className="flex-row justify-center items-center gap-x-1">
            <Text className="text-sm text-muted-foreground">
              Already have an account?
            </Text>
            <Pressable
              onPress={() => router.back()}
              className="active:opacity-60"
            >
              <Text className="text-sm font-bold text-foreground"> Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;