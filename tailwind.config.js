/** @type {import('tailwindcss').Config} */
export const content = [ "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html" ];
export const theme = { extend: {} };
export const variants = { extend: {} };
export const plugins = [import("daisyui")];