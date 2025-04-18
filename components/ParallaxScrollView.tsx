import type { PropsWithChildren, ReactElement } from 'react';
<<<<<<< HEAD
import { StyleSheet } from 'react-native';
=======
import { StyleSheet, useColorScheme } from 'react-native';
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
<<<<<<< HEAD
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
=======
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
<<<<<<< HEAD
  const bottom = useBottomTabOverflow();
=======

>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
<<<<<<< HEAD
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
=======
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
<<<<<<< HEAD
    height: HEADER_HEIGHT,
=======
    height: 250,
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
