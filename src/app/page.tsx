import Nav from "./_components/nav";
import Hero from "./_components/hero";
import Problem from "./_components/problem";
import Solution from "./_components/solution";
import WaitlistSection from "./_components/waitlist-section";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Solution />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
