import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "700"],
});

export const tildaScript = localFont({
  src: "../assets/fonts/TildaScript.otf",
  display: "swap",
});
