module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#d9cffc",
          200: "#b39ffa",
          300: "#8c6ff7",
          400: "#663ff5",
          500: "#400ff2",
          600: "#330cc2",
          700: "#260991",
          800: "#1a0661",
          900: "#0d0330"
        },

        red: {
          100: "#fcd8db",
          200: "#fab1b7",
          300: "#f78b94",
          400: "#f56470",
          500: "#f23d4c",
          600: "#c2313d",
          700: "#91252e",
          800: "#61181e",
          900: "#300c0f"
        },

        black: {
          100: "#d0d0d0",
          200: "#a2a2a1",
          300: "#737373",
          400: "#454544",
          500: "#161615",
          600: "#121211",
          700: "#0d0d0d",
          800: "#090908",
          900: "#040404"
        },
      },

      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
