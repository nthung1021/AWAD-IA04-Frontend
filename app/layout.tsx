import './globals.css';
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: 'IA03 Demo',
  description: 'Home, Register, Login (Next.js + Tailwind)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-body text-body font-sans">    
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

