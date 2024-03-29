import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-green-bold': '#b5d081',
                'pastel-green-semi': '#cfd99a',
                'pastel-brown': '#dad49b',
                'pastel-yellow': '#f8e6ac',
                'pastel-apricot': '#fcefd4',
                'pastel-gray': '#cfcfc4',
            },
        },
    },
    plugins: [],
};
export default config;
