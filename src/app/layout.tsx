import "./global.css";
import { ReactNode } from "react";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-900 text-white scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 overflow-auto flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}