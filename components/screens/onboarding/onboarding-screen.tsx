import React, {useRef, useState} from "react";
import {View, Text, Pressable, Dimensions, FlatList, Image, ViewToken} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button} from "react-native-paper";
import {useRouter} from "expo-router";

const {width: W, height: H} = Dimensions.get("window");
const IMAGE_HEIGHT = H * 0.52;

const slides = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1579621970590-9d624316904b?w=600&q=80",
    title: "Welcome to Fundify, the ultimate financial management app!",
    subtitle: "With Fundify, you can easily keep track of your expenses, investments, and savings all in one place. Let's get started by setting up your account.",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    title: "Are you ready to take control of your finances?",
    subtitle: "With Fundify, you can do just that. Our easy-to-use app allows you to manage your money and investments effortlessly. Let's start by creating your account.",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    title: "Thank you for choosing Fundify, the all-in-one finance app.",
    subtitle: "With Fundify, you can monitor your income, expenses, and investments with ease. Let's begin by setting up your account and start managing your money like a pro.",
  },
];

const Dots: React.FC<{count: number; active: number}> = ({count, active}) => (
  <View className="flex-row items-center justify-center gap-x-1.5">
    {Array.from({length: count}).map((_, i) => (
      <View
        key={i}
        style={{
          height: 4,
          width: i === active ? 24 : 8,
          borderRadius: 2,
          backgroundColor: i === active ? "#2D0D3A" : "#D1C4E9",
        }}
      />
    ))}
  </View>
);

const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const flatRef = useRef<FlatList>(null);

  // Keep index in BOTH state (for re-render) and ref (for handleNext closure)
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const goToLogin = () => router.replace("/(auth)/login" as any);

  const handleNext = () => {
    const current = activeRef.current;
    if (current < slides.length - 1) {
      const next = current + 1;
      flatRef.current?.scrollToIndex({index: next, animated: true});
      activeRef.current = next;
      setActive(next);
    } else {
      goToLogin();
    }
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        const idx = viewableItems[0].index;
        activeRef.current = idx;
        setActive(idx);
      }
    }
  ).current;

  const isLast = active === slides.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>

      {/* Skip */}
      {!isLast && (
        <Pressable
          onPress={goToLogin}
          className="absolute top-12 right-6 z-10 active:opacity-60"
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        >
          <Text className="text-sm font-semibold text-muted-foreground">Skip</Text>
        </Pressable>
      )}

      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled          // allow manual swipe too
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        getItemLayout={(_, index) => ({
          length: W,
          offset: W * index,
          index,
        })}
        renderItem={({item}) => (
          <View style={{width: W, flex: 1}}>
            <Image
              source={{uri: item.image}}
              style={{width: W, height: IMAGE_HEIGHT}}
              resizeMode="cover"
            />
            <View className="flex-1 bg-background px-6 pt-6 pb-2 gap-y-3">
              <Text className="text-lg font-bold text-foreground text-center leading-6">
                {item.title}
              </Text>
              <Text className="text-xs text-muted-foreground text-center leading-5">
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
        style={{flex: 1}}
      />

      {/* Bottom controls */}
      <View className="px-6 pb-6 gap-y-5 bg-background">
        <Dots count={slides.length} active={active} />
        <Button
          mode="contained"
          onPress={handleNext}
          style={{borderRadius: 14}}
          buttonColor="#2D0D3A"
          labelStyle={{fontWeight: "700", fontSize: 15, paddingVertical: 4}}
        >
          {isLast ? "Get started" : "Continue"}
        </Button>
      </View>

    </SafeAreaView>
  );
};

export default OnboardingScreen;