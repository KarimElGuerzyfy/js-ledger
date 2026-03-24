# Ledger — Expense Tracker App

A clean and responsive expense tracking application built with vanilla JavaScript.
It allows users to log daily expenses, filter them by category, and track total spending in real time.

## Features

* Add expenses with description, amount, and category
* Instant validation with user-friendly error messages
* Press Enter to quickly add expenses (keyboard support)
* Filter expenses by category using interactive filter pills
* Dynamic total calculation based on active filters
* Delete individual expenses
* Persistent data using localStorage
* Light and dark mode toggle
* Empty state UI when no expenses are available
* Fully responsive design (mobile + desktop)

## Technologies Used

* Vanilla JavaScript (ES6+)
* Tailwind CSS v4
* HTML5 & semantic structure
* localStorage API
* Font Awesome Icons
* Google Fonts (Playfair Display, IBM Plex)

## What I Learned

* How to manage application state (expenses array + filters)
* How to persist data using localStorage
* Event delegation for handling dynamic elements (delete buttons)
* Handling form validation and user input properly
* Working with Sets for flexible filtering logic
* Updating the DOM efficiently based on state changes
* Improving UX with keyboard interactions (Enter key support)
* Structuring code into reusable and clear functions (render, updateTotal, saveToLocal)

## Challenges I Faced

* Implementing multi-filter logic while keeping "All" as a default fallback
* Syncing UI state (active pills) with internal filter state
* Handling edge cases like empty filters or no expenses
* Managing re-renders without breaking functionality
* Ensuring total updates correctly depending on filtered data

## What I Would Improve

* Add edit functionality for existing expenses
* Add a chart (e.g. spending per category)
* Add date tracking for each expense
* Add export to CSV feature
* Improve accessibility (ARIA labels, better keyboard navigation)
* Store theme preference in localStorage

## Author

Built by Karim El Guerzyfy
Second JavaScript project — continuing the journey into front-end development (Started February 2026)
