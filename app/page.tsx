import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="home-section">
        <div className="home-container">
          <h1 className="home-title">New Page Template</h1>
          <p className="home-lead">
            This is the beginning of our project. Join with us now!
          </p>
          <Link href="/register" className="cta-primary">
            Create your account
          </Link>
        </div>
      </section>
    </main>
  );
}
