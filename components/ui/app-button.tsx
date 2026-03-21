import React from 'react';
import {Button} from 'react-native-paper';
import {ViewStyle, TextStyle} from 'react-native';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: string;
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
        icon,
    }) => {
    const getButtonColor = () => {
        if (disabled) return '#E8D9EC';
        switch (variant) {
            case 'primary':
                return '#2D0D3A';
            case 'secondary':
                return '#56034C';
            case 'danger':
                return '#EB1254';
            case 'ghost':
                return 'transparent';
            default:
                return '#2D0D3A';
        }
    };

    const getTextColor = () => {
        if (disabled) return '#9CA3AF';
        if (variant === 'ghost') return '#56034C';
        return '#ffffff';
    };

    return (
        <Button
            mode={variant === 'ghost' ? 'outlined' : 'contained'}
            onPress={onPress}
            loading={loading}
            disabled={disabled || loading}
            icon={icon}
            buttonColor={getButtonColor()}
            textColor={getTextColor()}
            style={[
                {borderRadius: 10},
                variant === 'ghost' && {borderColor: '#56034C'},
                style,
            ]}
            labelStyle={[
                {
                    fontWeight: '700',
                    fontSize: 15,
                },
                textStyle,
            ]}
        >
            {title}
        </Button>
    );
};