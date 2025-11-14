import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'IA03 Demo',
  description: 'Home, Register, Login (Next.js + Tailwind)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-body text-body font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
