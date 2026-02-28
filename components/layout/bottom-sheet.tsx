import React, {ReactNode} from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import {X} from "lucide-react-native";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");


interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  heightRatio?: number;
  fullScreen?: boolean;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  scrollable?: boolean;
}


export const BottomSheet: React.FC<BottomSheetProps> = (
  {
    visible,
    onClose,
    children,
    title,
    heightRatio = 0.8,
    fullScreen = false,
    showCloseButton = true,
    closeOnBackdrop = true,
    scrollable = true,
  }) => {
  const sheetHeight = fullScreen ? SCREEN_HEIGHT : SCREEN_HEIGHT * heightRatio;
  const borderRadius = fullScreen ? 0 : 24;

  const Content = scrollable ? ScrollView : View;
  const contentProps = scrollable
    ? {showsVerticalScrollIndicator: false, contentContainerStyle: {paddingBottom: 32}}
    : {style: {flex: 1, paddingBottom: 32}};

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">

        <TouchableWithoutFeedback onPress={closeOnBackdrop ? onClose : undefined}>
          <View className="absolute inset-0 bg-black/50"/>
        </TouchableWithoutFeedback>

        <View
          className="absolute left-0 right-0 bottom-0 bg-background"
          style={{
            height: sheetHeight,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            overflow: "hidden",
          }}
        >
          {!fullScreen && (
            <View className="items-center pt-3 pb-1">
              <View className="w-10 h-1 rounded-full bg-border"/>
            </View>
          )}

          {(title || showCloseButton) && (
            <View className="flex-row items-center justify-between px-5 py-3">
              {title ? (
                <Text className="text-base font-bold text-foreground">{title}</Text>
              ) : (
                <View/>
              )}
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  className="w-8 h-8 rounded-full bg-card items-center justify-center active:opacity-60"
                  hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                >
                  <X size={16} color="#5C3568" strokeWidth={2.5}/>
                </Pressable>
              )}
            </View>
          )}

          <Content {...(contentProps as any)}>
            {children}
          </Content>

        </View>
      </View>
    </Modal>
  );
};