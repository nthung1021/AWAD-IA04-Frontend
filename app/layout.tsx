import './globals.css';
import { AuthProvider } from "../context/AuthContext";
import QueryProvider from "../providers/QueryProvider";

export const metadata = {
  title: 'IA03 Demo',
  description: 'Home, Register, Login (Next.js + Tailwind)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>     
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

