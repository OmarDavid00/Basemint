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
        <meta name="talentapp:project_verification" content="9db3630d8e709accd2b6a2897f82bb230dddba4880380f8d8ab37fe7f7853b0dfc109d89983625cbcdee0d6b41656a05a8402642714a6c645a1af2524cc10afd" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
