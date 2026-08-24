const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        success: "hsl(var(--success))",
        softblack: "hsl(var(--softblack))",
        softblack2: "hsl(var(--softblack2))",
        lightdark: "hsl(var(--lightdark))",
        lightgray: "hsl(var(--lightgray))",
        lightgray2: "hsl(var(--lightgray2))",
        lightgray3: "hsl(var(--lightgray3))",
        gray: "hsl(var(--gray))",
        grayvariant: "hsl(var(--grayvariant))",
        grayborder: "hsl(var(--grayborder))",
        grayborder2: "hsl(var(--grayborder2))",
        graytext: "hsl(var(--graytext))",
        rejected: "hsl(var(--rejected))",
        activelink: "hsl(var(--activelink))",
        googlelink: "hsl(var(--googlelink))",
        primaryneutral: "hsl(var(--primaryneutral))",
        primaryneutral2: "hsl(var(--primaryneutral2))",
        successneutral: "hsl(var(--successneutral))",
        rejectedneutral: "hsl(var(--rejectedneutral))",
        darkneutral: "hsl(var(--darkneutral))",
        orangelight: "hsl(var(--orangelight))",

        status1: {
          DEFAULT: "hsl(var(--status1))",
          foreground: "hsl(var(--status1-foreground))",
        },
        status2: {
          DEFAULT: "hsl(var(--status2))",
          foreground: "hsl(var(--status2-foreground))",
        },
        status3: {
          DEFAULT: "hsl(var(--status3))",
          foreground: "hsl(var(--status3-foreground))",
        },
        status4: {
          DEFAULT: "hsl(var(--status4))",
          foreground: "hsl(var(--status4-foreground))",
        },
        status5: {
          DEFAULT: "hsl(var(--status5))",
          foreground: "hsl(var(--status5-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        extra: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 3px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        poppins: "'Poppins', sans-serif",
        noto: "'Noto Sans', sans-serif",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
