import { Tabs } from 'expo-router';
import React from 'react';
<<<<<<< HEAD
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
=======

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
<<<<<<< HEAD
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
=======
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
<<<<<<< HEAD
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
=======
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
<<<<<<< HEAD
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
=======
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
>>>>>>> 5afc81d8a6ccece98638bafd6f1a372e34cb2e43
        }}
      />
    </Tabs>
  );
}
