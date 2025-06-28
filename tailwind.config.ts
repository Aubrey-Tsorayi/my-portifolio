import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        'xs-custom': '0.75rem',     // 12px
        'sm-custom': '0.875rem',    // 14px
        'base-custom': '1rem',      // 16px
        'lg-custom': '1.125rem',    // 18px
        'xl-custom': '1.25rem',     // 20px
        '2xl-custom': '1.5rem',     // 24px
        '3xl-custom': '1.875rem',   // 30px
        '4xl-custom': '2.25rem',    // 36px
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
