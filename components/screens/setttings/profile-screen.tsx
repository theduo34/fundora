import React, {useState} from "react";
import {View, Text, Pressable, Image, Alert} from "react-native";
import {AppButton} from "@/components/ui/app-button";
import {Phone, MapPin, Mail, Pencil} from "lucide-react-native";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenLayout from "@/components/layout/screen-layout";
import {EditField, EditFieldKey, profileEditFields} from "@/components/features/settings/index";
import {EditFieldModal} from "@/components/features/settings/edit-modal";
import {useAuthStore} from "@/stores/auth.store";

const ProfileFieldRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    onEdit: () => void;
}> = ({icon, label, value, onEdit}) => (
    <View className="flex-row items-center gap-x-3 py-3 border-b border-border">
        <View className="w-8 h-8 items-center justify-center">{icon}</View>
        <View className="flex-1">
            <Text className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {label}
            </Text>
            <Text className="text-sm font-medium text-foreground mt-0.5">{value}</Text>
        </View>
        <Pressable
            onPress={onEdit}
            className="w-8 h-8 items-center justify-center active:opacity-60"
        >
            <Pencil size={15} color="#9CA3AF" strokeWidth={1.8}/>
        </Pressable>
    </View>
);

const ProfileScreen: React.FC = () => {
    const router = useRouter();
    const {profile, updateProfile, signOut} = useAuthStore();

    const [activeField, setActiveField] = useState<EditField | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openEdit = (key: EditFieldKey) => {
        const field = profileEditFields.find((f) => f.key === key) ?? null;
        setActiveField(field);
        setModalVisible(true);
    };

    const handleSave = async (key: string, value: string) => {
        const updates: Record<string, string> = {};
        if (key === "phone") updates.phone = value;
        if (key === "email") updates.email = value;
        if (key === "address") updates.address = value;
        await updateProfile(updates as any);
    };

    const handleSignOut = async () => {
        await signOut();
        await AsyncStorage.removeItem("hasSeenOnboarding");
        router.replace("/(auth)/login" as any);
    };

    return (
        <ScreenLayout screen="profile" showBack navbarTitle="Profile" scrollable={false}>
            <View className="flex-1 gap-y-6">
                <View className="items-center gap-y-3 pt-2">
                    <View className="relative">
                        {profile?.avatar_url ? (
                            <Image
                                source={{uri: profile?.avatar_url}}
                                className="w-24 h-24 rounded-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-24 h-24 rounded-full bg-card items-center justify-center">
                                <Text className="text-sm font-bold text-secondary">
                                    {profile?.first_name[0]}{profile?.last_name?.[0] ?? ""}
                                </Text>
                            </View>
                        )}
                        <Pressable
                            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary items-center justify-center active:opacity-70">
                            <Pencil size={12} color="#ffffff" strokeWidth={2}/>
                        </Pressable>
                    </View>
                    <Text className="text-base font-bold text-foreground">
                        {profile?.first_name} {profile?.last_name}
                    </Text>
                </View>

                <View className="bg-card rounded-2xl px-4">
                    <ProfileFieldRow
                        icon={<Phone size={16} color="#56034C" strokeWidth={1.8}/>}
                        label="Phone number"
                        value={profile?.phone ?? "Not set"}
                        onEdit={() => openEdit("phone")}
                    />
                    <ProfileFieldRow
                        icon={<MapPin size={16} color="#56034C" strokeWidth={1.8}/>}
                        label="Address"
                        value={profile?.address ?? "Not set"}
                        onEdit={() => openEdit("address")}
                    />
                    <ProfileFieldRow
                        icon={<Mail size={16} color="#56034C" strokeWidth={1.8}/>}
                        label="Email"
                        value={profile?.email ?? "Not set"}
                        onEdit={() => openEdit("email")}
                    />
                </View>

                <View className="flex-1"/>

                <AppButton
                    title="Sign out"
                    variant="danger"
                    onPress={handleSignOut}
                    style={{marginBottom: 8}}
                />
            </View>

            <EditFieldModal
                field={activeField}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSave}
            />
        </ScreenLayout>
    );
};

export default ProfileScreen;