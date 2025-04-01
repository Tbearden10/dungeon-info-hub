import "./global.css";
import { ReactNode } from "react";
import Header from "./layout/header/Header";

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
      <body className="bg-gray-900 text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}