import MainHeader from "@/components/main-header/main-header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

export const metadata = {
  title: "The Foodies App",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
