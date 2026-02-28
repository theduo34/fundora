import React, {useState} from "react";
import {View, Dimensions} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {VisaCard, CARD_HEIGHT} from "@/components/features/home/visa-card";
import {Card} from "@/components/features/home";

interface CardCarouselProps {
  cards: Card[];
}

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const CARD_H_PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - CARD_H_PADDING * 2;

export const CardCarousel: React.FC<CardCarouselProps> = ({cards}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="gap-y-2">
      <Carousel
        loop={true}
        autoPlay={false} //will
        autoPlayInterval={3000}
        width={SCREEN_WIDTH}
        height={CARD_HEIGHT}
        data={cards}
        onSnapToItem={(index) => setActiveIndex(index)}
        style={{marginLeft: -CARD_H_PADDING}}
        renderItem={({item}) => (
          <View style={{width: CARD_WIDTH, marginLeft: CARD_H_PADDING}}>
            <VisaCard card={item} />
          </View>
        )}
      />

      {cards.length > 1 && (
        <View className="flex-row justify-center items-center gap-x-1.5">
          {cards.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${
                i === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};