import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
  beforeLoad: async (ctx) => {
    const token = await ctx.context.auth?.getToken();
    console.log({ token });
    if (token) throw redirect({ to: "/chat" });
  },
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
