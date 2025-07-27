import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/")({
  beforeLoad: async (ctx) => {
    const token = await ctx.context.auth?.getToken();
    console.log({ token });
    if (!token) throw redirect({ to: "/login" });
  },
  component: Chat,
});

function Chat() {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  const handleLogout = async () => {
    await signOut(() => navigate({ to: "/" }));
  };
  if (!isLoaded) return;
  return (
    <div>
      Hello "/chat/"!
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
