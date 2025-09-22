import { Tabs } from "expo-router";
import { Home, FileText, Calendar, Info, Bot, ClipboardList } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8C1D40",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
            
      <Tabs.Screen
        name="visa"
        options={{
          title: "Visa",
          tabBarIcon: ({ color }) => <FileText color={color} size={22} />,
        }}
      />
      
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color }) => <Calendar color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="registration"
        options={{
          title: "Registration",
          tabBarIcon: ({ color }) => <ClipboardList color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <Info color={color} size={22} />,
        }}
      />
      
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          tabBarIcon: ({ color }) => <Bot color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
