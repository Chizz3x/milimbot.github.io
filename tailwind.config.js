/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export const content = [ "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html" ];
export const theme = { extend: {} };
export const variants = { extend: {} };
export const plugins = [daisyui];