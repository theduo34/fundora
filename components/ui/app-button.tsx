import React from 'react';
import {Pressable, Text, ActivityIndicator, ViewStyle, TextStyle, View} from 'react-native';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    style?: ViewStyle;
    textStyle?: TextStyle;
    className?: string;
    icon?: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = (
    {
        title,
        onPress,
        loading = false,
        disabled = false,
        variant = 'primary',
        style,
        textStyle,
        className,
        icon,
    }) => {
    const getBackgroundColor = () => {
        if (disabled && variant !== 'ghost') return '#E8D9EC';
        if (disabled && variant === 'ghost') return 'transparent';
        switch (variant) {
            case 'primary': return '#2D0D3A';
            case 'secondary': return '#56034C';
            case 'danger': return '#EB1254';
            case 'ghost': return 'transparent';
            default: return '#2D0D3A';
        }
    };

    const getTextColor = () => {
        if (disabled) return '#9CA3AF';
        if (variant === 'ghost') return '#56034C';
        return '#ffffff';
    };

    return (
        <View style={[{ alignSelf: 'stretch' }, style]}>
            <Pressable
                onPress={onPress}
                disabled={disabled || loading}
                hitSlop={8}
            >
                {({ pressed }) => (
                    <View
                        className={className}
                        style={{
                            backgroundColor: getBackgroundColor(),
                            paddingVertical: 14,
                            paddingHorizontal: 20,
                            borderRadius: 999, // Pill shape
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            opacity: pressed ? 0.85 : 1,
                            transform: [{ scale: pressed ? 0.98 : 1 }],
                            borderWidth: variant === 'ghost' ? 1 : 0,
                            borderColor: variant === 'ghost' ? '#56034C' : 'transparent',
                            width: '100%',
                        }}
                    >
                        {loading ? (
                            <ActivityIndicator color={getTextColor()} size="small" />
                        ) : (
                            <>
                                {icon && <View className="mr-1">{icon}</View>}
                                <Text
                                    style={[
                                        {
                                            color: getTextColor(),
                                            fontSize: 15,
                                            fontWeight: '700',
                                            textAlign: 'center',
                                        },
                                        textStyle,
                                    ]}
                                >
                                    {title}
                                </Text>
                            </>
                        )}
                    </View>
                )}
            </Pressable>
        </View>
    );
};