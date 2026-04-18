import React, { createContext, useContext, useState } from "react";

type TimerContextType = {
  focus: number;
  shortBreak: number;
  longBreak: number;
  setFocus: (value: number) => void;
  setShortBreak: (value: number) => void;
  setLongBreak: (value: number) => void;
};

const TimerContext = createContext({} as TimerContextType);

export const TimerProvider = ({ children }: any) => {
  const [focus, setFocus] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  return (
    <TimerContext.Provider
      value={{
        focus,
        shortBreak,
        longBreak,
        setFocus,
        setShortBreak,
        setLongBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);