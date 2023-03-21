module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        youtube: '#FF0000',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
