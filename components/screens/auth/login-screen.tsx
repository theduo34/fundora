import React, {useState, useEffect} from "react";
import {View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native";
import {TextInput} from "react-native-paper";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScanFace} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppButton} from "@/components/ui/app-button";
import {LoginForm, LoginFormErrors, validateLogin} from "@/components/features/auth";
import {AuthInput} from "@/components/features/auth/auht-input";
import {SocialButtons} from "@/components/features/auth/social-button";
import {useAuthStore} from "@/stores/auth.store";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { signIn, loading } = useAuthStore();

  const [form, setForm] = useState<LoginForm>({email: "", password: ""});
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("lastEmail").then((email) => {
      if (email) setForm((p) => ({ ...p, email }));
    });
  }, []);

  const handleLogin = async () => {
    const errs = validateLogin(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const { error } = await signIn(form.email, form.password);
    if (error) {
      Alert.alert("Login Failed", error);
      return;
    }
    router.replace("/(protected)/(tabs)/home" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 24, gap: 20}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
          <SocialButtons onGoogle={() => {}} onFacebook={() => {}} />

          <View className="gap-y-3">
            <AuthInput
              label="Email"
              value={form.email}
              onChangeText={(v) => {
                setForm((p) => ({...p, email: v}));
                if (errors.email) setErrors((p) => ({...p, email: undefined}));
              }}
              keyboardType="email-address"
              error={errors.email}
              left={<TextInput.Icon icon="email-outline" color="#9CA3AF" />}
            />
            {errors.email && (
              <Text className="text-xs text-red-600 -mt-1">{errors.email}</Text>
            )}

            <AuthInput
              label="Password"
              value={form.password}
              onChangeText={(v) => {
                setForm((p) => ({...p, password: v}));
                if (errors.password) setErrors((p) => ({...p, password: undefined}));
              }}
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
              <Text className="text-xs text-red-600 -mt-1">{errors.password}</Text>
            )}

            <Pressable
              onPress={() => router.push("/(auth)/forgot-password" as any)}
              className="self-end active:opacity-60"
            >
              <Text className="text-xs font-semibold text-primary">
                Forgot password?
              </Text>
            </Pressable>
          </View>

          <View className="flex-row gap-x-3 items-center">
            <AppButton
              title={loading ? "Signing in..." : "Login"}
              onPress={handleLogin}
              loading={loading}
              style={{flex: 1}}
            />

            <Pressable
              className="w-14 h-14 rounded-2xl items-center justify-center active:opacity-70"
              style={{backgroundColor: "#2D0D3A"}}
            >
              <ScanFace size={24} color="#ffffff" strokeWidth={1.8} />
            </Pressable>
          </View>

          <View className="flex-row justify-center items-center gap-x-1">
            <Text className="text-sm text-muted-foreground">
              {"Don't have an account yet?"}
            </Text>
            <Pressable
              onPress={() => router.push("/(auth)/sign-up" as any)}
              className="active:opacity-60"
            >
              <Text className="text-sm font-bold text-foreground"> Register</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;