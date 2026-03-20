import React, {useState} from "react";
import {View, Dimensions} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {Card} from "@/components/features/home";
import {CARD_HEIGHT, VisaCard} from "@/components/features/cards/visa-card";

interface CardCarouselProps {
    cards: Card[];
    showFullNumber?: boolean;
    frozen?: boolean;
    onActiveCardChange?: (card: Card) => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const CARD_H_PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - CARD_H_PADDING * 2;

export const CardCarousel: React.FC<CardCarouselProps> = (
    {
        cards,
        showFullNumber = false,
        frozen = false,
        onActiveCardChange,
    }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View className="gap-y-2">
            <Carousel
                loop={false}
                autoPlay={false}
                width={SCREEN_WIDTH}
                height={CARD_HEIGHT}
                data={cards}
                onSnapToItem={(index) => {
                    setActiveIndex(index);
                    onActiveCardChange?.(cards[index]);
                }}
                style={{marginLeft: -CARD_H_PADDING}}
                renderItem={({item}) => (
                    <View style={{width: CARD_WIDTH, marginLeft: CARD_H_PADDING}}>
                        <VisaCard
                            card={item}
                            showFullNumber={showFullNumber}
                            frozen={frozen}
                        />
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