import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useTimer } from "../context/TimerContext";

export const Settings = () => {
  const navigation = useNavigation();

  const {
    focus,
    shortBreak,
    longBreak,
    setFocus,
    setShortBreak,
    setLongBreak,
  } = useTimer();

  const [notifications, setNotifications] = useState(true);

  const ButtonGroup = ({
    title,
    options,
    selected,
    onSelect,
  }: {
    title: string;
    options: number[];
    selected: number;
    onSelect: (value: number) => void;
  }) => (
    <View className="mb-8">
      <Text className="text-white mb-3 text-base">{title}</Text>

      <View className="flex-row justify-between space-x-4">
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            className={`px-5 py-3 rounded-full ${
              selected === item ? "bg-primary" : "bg-zinc-700"
            }`}
          >
            <Text className="text-white">{item} min</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-14 right-6 z-10"
      >
        <Text className="text-white text-3xl">✕</Text>
      </TouchableOpacity>

      <Text
        className="text-white text-4xl text-center mb-14"
        style={{ fontFamily: "InterBold" }}
      >
        Configurações
      </Text>

      <ButtonGroup
        title="Período de foco"
        options={[15, 25, 35]}
        selected={focus}
        onSelect={setFocus}
      />

      <ButtonGroup
        title="Pausa curta"
        options={[3, 5, 7]}
        selected={shortBreak}
        onSelect={setShortBreak}
      />

      <ButtonGroup
        title="Pausa longa"
        options={[10, 15, 20]}
        selected={longBreak}
        onSelect={setLongBreak}
      />

      <View className="mt-2">
        <Text className="text-white mb-3 text-base">Notificações</Text>

        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => setNotifications(false)}
            className={`px-5 py-3 rounded-full ${
              !notifications ? "bg-zinc-700" : "bg-zinc-800"
            }`}
          >
            <Text className="text-white">Desativado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setNotifications(true)}
            className={`px-5 py-3 rounded-full ${
              notifications ? "bg-primary" : "bg-zinc-700"
            }`}
          >
            <Text className="text-white">Ativado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};