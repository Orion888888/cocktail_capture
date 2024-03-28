/** @type {import('tailwindcss').Config} */
module.exports = {
// this here indicates the documents that need to be included in the tailwindcss usage.
  content: [
    './components/**/*.{html,js}',
    './utilites/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './node_modules/@my-company/tailwind-components/**/*.js',
    './server.js',
    './tailwind.config.js',
    './views/layouts/main.handlebars',
    './views/homepage.handlebars',
    './views/ingredients.handlebars',
    './views/login.handlebars',
  ],
}