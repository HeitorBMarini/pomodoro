module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#137844",
        background: "#062013",
        text: "#fff",
        divider: "#373738",
      },
      fonts: {
        InterRegular: "Inter-Regular",
        InterBold: "Inter-Bold",
      },

      fontsSizes: {
        title: "32px",
        body: "16px",
        label: "14px",
      },
    },
    plugins: [],
  },
};
