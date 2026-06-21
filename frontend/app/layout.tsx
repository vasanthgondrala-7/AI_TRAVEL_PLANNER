import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "AI Travel Planner",
  description:
    "AI Powered Travel Planner"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}