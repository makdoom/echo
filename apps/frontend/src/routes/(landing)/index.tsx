import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="h-screen max-w-5xl mx-auto flex flex-col items-center justify-center">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <Hero />
      </div>
    </div>
  );
}
