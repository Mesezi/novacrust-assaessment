# README.md

# Novacrust Assessment

This project implements a submission form for Novacrust assessment. The form is built using Next.js and leverages custom React components for inputs and dropdowns. 
Form handling and validation using react-hook-form.
State management for form values, submission status, and query parameters.
---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build and start for production**

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

---

## Libraries Used

* **React** – UI library
* **Next.js** – Framework for React
* **TypeScript** – Type safety
* **Tailwind CSS** – Utility-first CSS framework
* **react-hook-form** – Form handling and validation
* **use-query-state** – Query state management for URL
* **Zod** – Schema validation (used with forms)
* **react-icons** – Icon library

---

## Notes

* Dropdown components support searchable options.
* Clipboard hook uses the browser API.
* Form errors are handled via `react-hook-form`.
