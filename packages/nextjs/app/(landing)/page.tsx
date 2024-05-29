import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";

// import { TopNav } from "@/components/landing/top-nav";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      {/* <TopNav /> */}
      <Hero />
      <Features />
    </main>
  );
}
