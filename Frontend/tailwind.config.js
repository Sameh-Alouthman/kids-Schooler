/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
            lightBlue: "#87CEEB",
            lightGreen: "#98FB98",
            lightYellow: "#FFFACD",
        },
        secondary: {
            white: "#FFFFFF",
            lightGray: "#F0F0F0",
        },
        // "primary-ligth-blue": "#87CEEB",
        // "primary-light-green": "#98FB98",
        // "primary-light-yellow": "#FFFACD",
        // "secondary-white": "#FFFFFF",
        // "secondary-light-gray": "#F0F0F0",

        success: "#10B981", // أخضر
        danger: "#EF4444", // أحمر
        warning: "#F59E0B", // برتقالي
        info: "#3B82F6", // أزرق
      },
    },
  },
  plugins: [],
};
