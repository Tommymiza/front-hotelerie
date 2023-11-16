import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import ThemeRegistry from "./ThemeRegistry";
import dynamic from "next/dynamic";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import Footer from "@/components/Footer";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });
const Context = dynamic(() => import("@/components/Context"), { ssr: false });

export const metadata: Metadata = {
  title: "Hotel",
  description: "Réservation hôtel ou chambre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: "mui" }}>
          <Context>
            <Navbar />
          </Context>
          <main>

            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
