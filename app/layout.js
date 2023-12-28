import "./globals.css";
import Header from "@/app/components/header";
import { Providers } from "./features/provider";

export const metadata = {
  title: "Canteen Revamp",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div>
            <Header />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
