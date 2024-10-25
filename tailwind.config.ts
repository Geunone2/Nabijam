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
                'yellow-1': '#E05F00',
                'yellow-2': '#FAAD00',
                'yellow-3': '#FFC746',
                'yellow-4': '#FFE169',
                'yellow-5': '#FDEB87',
                'yellow-6': '#FAAC01',
                'footer': '#616161',
                'user-gray': '#D9D9D9',
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite linear',
            },
            keyframes: {
                shimmer: {
                    '0%': {backgroundPosition: '200%'},
                    '100%': {backgroundPosition: '-200%'},
                },
            },
            backgroundImage: {
                'gradient-custom': 'linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)',
            },
            backgroundSize: {
                custom: '300% 100%',
            },

            boxShadow: {
                custom: '18px 0 5px -5px #D9D9D9;'
            }
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
