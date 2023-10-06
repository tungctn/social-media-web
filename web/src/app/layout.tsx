"use client";

import { roboto } from "@/constants/Fonts";
import "./globals.css";
import * as dayjs from "dayjs";
import "dayjs/locale/vi";
import { ToastContainer } from "react-toastify";
import store from "@/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CheckAuth from "@/middlewares/CheckAuth";
import LoadingProvider from "@/providers/LoadingProvider";

dayjs.locale("vi");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className + " relative min-h-screen bg-white"}>
        <LoadingProvider>
          <Provider store={store}>
            <CheckAuth>{children}</CheckAuth>
          </Provider>
        </LoadingProvider>
        <ToastContainer autoClose={300} closeOnClick />
      </body>
    </html>
  );
}
