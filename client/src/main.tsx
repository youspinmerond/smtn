import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main.tsx';
import { store } from './store/user.ts';
import {Provider} from "react-redux";
import "./styles/index.sass";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.tsx';
import Layout from './Layout.tsx';
import Registartion from './pages/Registration.tsx';
import User from './pages/User.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Main/></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login/></Layout>
  },
  {
    path: "/registration",
    element: <Layout><Registartion/></Layout>
  },
  {
    path: "/user/:id",
    element: <Layout><User/></Layout>
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
