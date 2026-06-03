# 🚐 TravelTrucks

TravelTrucks is a frontend web application for browsing, filtering, and booking
camper vans. The project was built with React and Vite, and uses Redux Toolkit
for global state management.

## ✨ Features

- Home page with a hero section and call-to-action button
- Catalog page with camper listing
- Backend-based filtering by location, camper form, engine, transmission, and
  features
- Favorites system with localStorage persistence
- Camper details page with gallery, vehicle details, reviews, and booking form
- Route-level lazy loading with React Router
- Loading, error, and empty state handling

## 🛠️ Technologies

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Axios
- React Hot Toast
- React Icons
- CSS Modules
- ESLint

## 🔗 API

Base URL:

```text
https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
```

Endpoints:

```text
GET /campers
GET /campers/:id
```

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd travel-trucks
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## ▶️ Usage

- Open the app in the browser after starting the dev server
- Use the `View Now` button on the home page to open the catalog
- Filter campers on the catalog page
- Add or remove campers from favorites
- Open camper details with the `Show More` button
- Submit the booking form on the details page

## 📜 Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 🧱 Project Structure

```text
src/
  components/
  pages/
  redux/
  router/
  services/
  styles/
  utils/
```

## 🌍 Live Demo

Add your Vercel deployment link here after publishing:

```text
https://your-vercel-link.vercel.app
```

## 👨‍💻 Author

Kerem Yıldırım
