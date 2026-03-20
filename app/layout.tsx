import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69ba5ee0e3869312452b6bdf" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
