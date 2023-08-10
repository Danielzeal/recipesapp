import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Home,
  MyRecipes,
  SavedRecipes,
  CreateRecipe,
  RecipeDetails,
  Login,
  Register,
  EditRecipe,
  EditUser,
} from "./pages";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import ProtectRoutes from "./components/ProtectRoutes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='search/:search_word' element={<Home />} />
      <Route path='page/:pageNumber' element={<Home />} />
      <Route path='search/:search_word/page/:pageNumber' element={<Home />} />
      <Route path='recipes/:id' element={<RecipeDetails />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<ProtectRoutes />}>
        <Route path='my-recipes' element={<MyRecipes />} />
        <Route path='saved-recipes' element={<SavedRecipes />} />
        <Route path='create-recipe' element={<CreateRecipe />} />
        <Route path='user/:id/edit' element={<EditUser />} />
        <Route path=':id/edit' element={<EditRecipe />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
