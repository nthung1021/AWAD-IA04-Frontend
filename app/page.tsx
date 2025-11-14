import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="relative bg-teal-900 text-white py-24 lg:py-40">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">New Page Template</h1>
          <p className="text-lg opacity-80 mb-10">
            This is the beginning of our project. Join with us now!
          </p>
          <Link
            href="/register"
            className="inline-flex py-3 px-6 rounded-full bg-lime-500 text-teal-900 border border-lime-500 hover:bg-white transition"
          >
            Create your account
          </Link>
        </div>
      </section>
    </main>
  );
}
