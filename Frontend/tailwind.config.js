/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "signUpGreen": "#3B8382",
        "bg-user-pr": "#BF865F",
        "bg-admin-sidebar": "#353334",
        "bg-admin-sidebar-button": "#4D4949",
        "bg-admin-navbar": "#353334",
        "bookstack-logo": "#FFFFF",
        "user-from": "#C98C63",
        "user-to": "#73482C",
        "user-nav": "#EBE6E2",
        "book-card-bg": "#D9D9D9",
        "button-green": "#3B8382",
        "user-sign-from": "#DFC4B3",
        "user-sign-to": "#9C6846",
        "user-footer": "#73482C",
        "user-profile-from": "#DFC4B3",
        "user-profile-to": "#9C6846",
        "user-sidebar-menu": "#AF7752"
      },
      fontFamily: {
        'nunito': ["nunito", "sans-serif"],
        'roboto': ['Roboto', "sans-serif"],
        'ubuntu': ['Ubuntu', 'sans-serif']
      },
      fontSize: {
        'logo': "2rem",
        'nav-element': "1.5rem"
      },
      minWidth: {
        "home-content": "500px"
      },
      listStyleType: {
        "list-default": "default"
      }
    }
  }
}

