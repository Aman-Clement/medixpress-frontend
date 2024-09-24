import { Hero, DisplayCard } from "@/components";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <div className="px-10">
        <DisplayCard/>
      </div> 
    </div>
  );
}
