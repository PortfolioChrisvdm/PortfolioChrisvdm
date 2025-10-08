
/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./pages/**/*.{js,jsx}",
"./components/**/*.{js,jsx}",
],
theme: {
extend: {
colors: {
brand: {
50: '#f5f9f7', 100:'#e6f1ec', 200:'#c7e0d5', 300:'#a2cbbb', 400:'#74ae98', 500:'#4f957d', 600:'#3d7563', 700:'#305b4f', 800:'#284a41', 900:'#1c322d'
}
}
},
},
plugins: [],
};