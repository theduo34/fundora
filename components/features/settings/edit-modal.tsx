import React, {useState} from "react";
import {View, Text} from "react-native";
import {Modal, Portal, TextInput, Button} from "react-native-paper";
import {EditField} from "@/components/features/settings/index";

interface EditFieldModalProps {
  field: EditField | null;
  visible: boolean;
  onClose: () => void;
  onSave: (key: string, value: string) => void;
}

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

export const EditFieldModal: React.FC<EditFieldModalProps> = ({
                                                                field,
                                                                visible,
                                                                onClose,
                                                                onSave,
                                                              }) => {
  const [value, setValue] = useState("");

  const handleSave = () => {
    if (!field || !value.trim()) return;
    onSave(field.key, value.trim());
    setValue("");
    onClose();
  };

  const handleCancel = () => {
    setValue("");
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={{
          backgroundColor: "#ffffff",
          marginHorizontal: 24,
          borderRadius: 20,
          padding: 24,
          gap: 16,
        }}
      >
        {/* Title */}
        <Text style={{
          fontSize: 15,
          fontWeight: "600",
          color: "#2D0D3A",
          textAlign: "center",
        }}>
          {field?.label}
        </Text>

        {/* Input */}
        <TextInput
          mode="outlined"
          placeholder={field?.placeholder}
          value={value}
          onChangeText={setValue}
          keyboardType={field?.keyboardType ?? "default"}
          autoFocus
          theme={inputTheme}
          style={{backgroundColor: "#ffffff"}}
        />

        {/* Actions */}
        <View style={{flexDirection: "row", gap: 12}}>
          <Button
            mode="text"
            onPress={handleCancel}
            style={{flex: 1}}
            textColor="#EB1254"
            labelStyle={{fontWeight: "700"}}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            disabled={!value.trim()}
            style={{flex: 1, borderRadius: 12}}
            buttonColor="#56034C"
            labelStyle={{fontWeight: "700"}}
          >
            Enter
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};