import React from "react";
import {TextInput} from "react-native-paper";

export const authInputTheme = {
  colors: {
    primary: "#56034C",
    error: "#dc2626",
    background: "#F8F8F8",
    onSurfaceVariant: "#9CA3AF",
    outline: "#E8E8E8",
  },
  roundness: 14,
};

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  maxLength?: number;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const AuthInput: React.FC<AuthInputProps> = (
  {
    label,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize = "none",
    maxLength,
    error,
    left,
    right,
  }) => (
  <TextInput
    label={label}
    mode="outlined"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize={autoCapitalize}
    maxLength={maxLength}
    autoCorrect={false}
    error={!!error}
    theme={authInputTheme}
    style={{backgroundColor: "#F8F8F8"}}
    left={left}
    right={right}
  />
);