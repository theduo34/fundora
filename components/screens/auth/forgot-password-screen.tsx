import React, {useState} from "react";
import {View, Text, Pressable, KeyboardAvoidingView, Platform} from "react-native";
import {TextInput} from "react-native-paper";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {AppButton} from "@/components/ui/app-button";
import {Mail} from "lucide-react-native";
import {AuthInput} from "@/components/features/auth/auht-input";


const EnterEmailStep: React.FC<{
    email: string;
    error?: string;
    loading: boolean;
    onChange: (v: string) => void;
    onSubmit: () => void;
    onBack: () => void;
}> = ({email, error, loading, onChange, onSubmit, onBack}) => (
    <View className="flex-1 justify-center gap-y-6 p-6">
        <View className="items-center gap-y-4">
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center">
                <Mail size={36} color="#56034C" strokeWidth={1.5}/>
            </View>
            <View className="items-center gap-y-1">
                <Text className="text-2xl font-bold text-foreground">Forgot password?</Text>
                <Text className="text-sm text-muted-foreground text-center">
                    {"Enter your email and we'll send you a reset link"}
                </Text>
            </View>
        </View>

        {/* Email input */}
        <View className="gap-y-2">
            <AuthInput
                label="Email address"
                value={email}
                onChangeText={onChange}
                keyboardType="email-address"
                error={error}
                left={<TextInput.Icon icon="email-outline" color="#9CA3AF"/>}
            />
            {error && <Text className="text-xs text-red-600">{error}</Text>}
        </View>

        <AppButton
            title={loading ? "Sending..." : "Send Reset Link"}
            onPress={onSubmit}
            loading={loading}
            disabled={!email.trim()}
        />

        <Pressable onPress={onBack} className="items-center active:opacity-60">
            <Text className="text-sm font-semibold text-primary">Back to Login</Text>
        </Pressable>
    </View>
);


const EmailSentStep: React.FC<{ email: string; onBack: () => void }> = ({
        email, onBack,
                                                                        }) => (
    <View className="flex-1 justify-center items-center gap-y-6 p-6">
        <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center">
            <Mail size={44} color="#16a34a" strokeWidth={1.5}/>
        </View>

        <View className="items-center gap-y-2">
            <Text className="text-2xl font-bold text-foreground">Check your email</Text>
            <Text className="text-sm text-muted-foreground text-center leading-5">
                We sent a password reset link to{"\n"}
                <Text className="font-semibold text-foreground">{email}</Text>
            </Text>
        </View>

        <AppButton
            title="Back to Login"
            onPress={onBack}
            style={{ width: "100%" }}
        />

        <Text className="text-xs text-muted-foreground text-center">
            {"Didn't receive it?"}{" "}
            <Text className="font-semibold text-primary">Resend</Text>
        </Text>
    </View>
);


const ForgotPasswordScreen: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async () => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Enter a valid email address");
            return;
        }
        setError(undefined);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1200);
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {sent ? (
                    <EmailSentStep email={email} onBack={() => router.back()}/>
                ) : (
                    <EnterEmailStep
                        email={email}
                        error={error}
                        loading={loading}
                        onChange={(v) => {
                            setEmail(v);
                            setError(undefined);
                        }}
                        onSubmit={handleSubmit}
                        onBack={() => router.back()}
                    />
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;