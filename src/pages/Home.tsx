
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { Cog } from "lucide-react-native";

import { TNavigationScreenProps } from "../AppRoutes";
import { useTimer } from "../context/TimerContext";

type Mode = "focus" | "short" | "long";

export const Home = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  const { focus, shortBreak, longBreak } = useTimer();

  const durations = {
    focus: focus * 60,
    short: shortBreak * 60,
    long: longBreak * 60,
  };

  const labels = {
    focus: "Hora de se concentrar",
    short: "Pausa curta",
    long: "Pausa longa",
  };

  const [mode, setMode] = useState<Mode>("focus");
  const [seconds, setSeconds] = useState(durations.focus);
  const [running, setRunning] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);

  useEffect(() => {
    if (!running) {
      setSeconds(durations[mode]);
    }
  }, [focus, shortBreak, longBreak, mode]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (running && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (running && seconds === 0) {
      setRunning(false);

      if (mode === "focus") {
        const next = pomodoros + 1;
        setPomodoros(next);

        if (next % 4 === 0) {
          setMode("long");
          setSeconds(durations.long);
        } else {
          setMode("short");
          setSeconds(durations.short);
        }
      } else {
        setMode("focus");
        setSeconds(durations.focus);
      }
    }

    return () => clearInterval(timer);
  }, [running, seconds]);

  const progress = useMemo(() => {
    const total = durations[mode];
    return (seconds / total) * 100;
  }, [seconds, mode, focus, shortBreak, longBreak]);

  const formatTime = (value: number) => {
    const min = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");

    const sec = (value % 60).toString().padStart(2, "0");

    return `${min}:${sec}`;
  };

  const resetTimer = () => {
    setRunning(false);
    setSeconds(durations[mode]);
  };

  const circleColor =
    progress > 50
      ? "border-primary"
      : progress > 20
      ? "border-yellow-400"
      : "border-red-500";

  return (
    <View className="flex-1 bg-background px-6 justify-center">
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="absolute top-14 right-6"
      >
        <Cog size={24} color="#ffffff" />
      </TouchableOpacity>

      <Text
        className="text-white text-4xl text-center"
        style={{ fontFamily: "InterBold" }}
      >
        Pomodoro
      </Text>

      <Text className="text-zinc-300 text-center mt-2 mb-10">
        {labels[mode]}
      </Text>

      <View className="items-center">
        <View
          className={`w-52 h-52 rounded-full border-[6px] ${circleColor} items-center justify-center`}
        >
          <Text
            className="text-white text-5xl"
            style={{ fontFamily: "InterBold" }}
          >
            {formatTime(seconds)}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-center gap-4 mt-10">
        {!running ? (
          <TouchableOpacity
            onPress={() => setRunning(true)}
            className="bg-primary px-8 py-3 rounded-full"
          >
            <Text className="text-white">Iniciar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setRunning(false)}
            className="bg-primary px-8 py-3 rounded-full"
          >
            <Text className="text-white">Pausar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={resetTimer}
          className="border border-primary px-8 py-3 rounded-full"
        >
          <Text className="text-white">Resetar</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-10 items-center">
        <Text className="text-zinc-300 mb-3">Pomodoros:</Text>

        <View className="flex-row gap-2">
          {[1, 2, 3, 4].map((item) => (
            <View
              key={item}
              className={`w-4 h-4 rounded-full ${
                item <= pomodoros % 4 ? "bg-primary" : "bg-zinc-600"
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};