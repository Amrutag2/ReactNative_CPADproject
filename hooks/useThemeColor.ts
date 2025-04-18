/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

<<<<<<< HEAD
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
=======
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
