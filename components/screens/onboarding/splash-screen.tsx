import React, {useEffect, useRef} from "react";
import {View, Text, Animated, Dimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {useRouter} from "expo-router";

const {width: W, height: H} = Dimensions.get("window");

const SplashScreen: React.FC = () => {
  const router  = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to onboarding after 2.5s
    const timer = setTimeout(() => {
      router.replace("/onboarding" as any);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#2D0D3A", "#56034C", "#2D0D3A"]}
      locations={[0, 0.5, 1]}
      style={{flex: 1, width: W, height: H}}
    >
      <SafeAreaView
        className="flex-1 items-center justify-center"
        edges={["top", "bottom"]}
      >
        <Animated.View
          style={{opacity, transform: [{scale}]}}
        >
          <View
            style={{
              borderWidth: 1.5,
              borderColor: "rgba(255,255,255,0.35)",
              borderRadius: 20,
              paddingHorizontal: 40,
              paddingVertical: 28,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 28,
                fontWeight: "700",
                letterSpacing: 2,
              }}
            >
              Fundify
            </Text>
          </View>
        </Animated.View>

        <View
          style={{
            position: "absolute",
            bottom: 40,
            flexDirection: "row",
            gap: 6,
          }}
        >
          <View style={{width: 24, height: 4, borderRadius: 2, backgroundColor: "#ffffff"}} />
          <View style={{width: 8,  height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.35)"}} />
          <View style={{width: 8,  height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.35)"}} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SplashScreen;