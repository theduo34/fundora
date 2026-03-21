import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle, View } from 'react-native';

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

export const AppButton: React.FC<AppButtonProps> = ({
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
    if (disabled && variant !== 'ghost') return '#E8D9EC'; // Disabled state (light purple gray)
    if (disabled && variant === 'ghost') return 'transparent'; 
    
    switch (variant) {
      case 'primary': return '#2D0D3A'; // Darkest purple
      case 'secondary': return '#56034C'; // Primary Purple
      case 'danger': return '#EB1254'; // Pink Red
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
    <Pressable
      onPress={onPress}
      className={className}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: 14, // Slightly smaller than standard Material 3 button heights
          paddingHorizontal: 20,
          borderRadius: 9999, // Max rounded (not sharp at all)
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <Text
            style={[
              {
                color: getTextColor(),
                fontSize: 14, // Smaller font for a compact look
                fontWeight: '700',
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};
