import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./**/*.{ts,tsx}"],
  theme: {
    extend: {
			maxWidth: {
				'modal': 'min(400px, 100%)'
			},
			fontSize: {
				'xxs': '0.55rem'
			}
		},
  },
  plugins: [
    plugin(function ({ matchUtilities, addComponents, addVariant }) {
      matchUtilities({ ga: (val) => ({ gridArea: val }) }),
        addVariant("hovered", "@media(hover: hover)");
    }),
  ],
};
