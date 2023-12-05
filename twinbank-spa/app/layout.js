import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";
import Sidebar from "./components/Sidebar";
import "./styles.css";
import { UserProvider } from "./utils/UserContext";
import { LayoutProvider } from "./LayoutProvider";
import PrivateRoute from "./utils/PrivateRoute";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TwinBank",
  description: "Twin Bank es un banco digital que te permite realizar tus operaciones bancarias de manera fácil y segura.",
  keywords: "prestamos, twinbank, banco, digital, dinero, transferencias, pagos, depositos, retiros, retiro, deposito, pago, transferencia, transaccion",
};

export default function RootLayout({ children }) {
  return (
      <html lang="es">
        <body>
        <UserProvider>
          <LayoutProvider>
          <PrivateRoute>
          <Header />
          <div className="content_area continer_side">
            <Sidebar />
            {children}
          </div>
          <Footer />
          </PrivateRoute>
          </LayoutProvider>
          </UserProvider>
        </body>
      </html>

  );
}
