import LoginForm from "@/components/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: Login,
});

function Login() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col space-y-10">
      <div className=" max-w-80 w-full space-y-8 flex flex-col">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-bold">Welcome Back !</h2>
          <p className="text-muted-foreground">
            Time to reconnect, share and chat again
          </p>
        </div>
      </div>

      <div className="w-full max-w-80">
        <LoginForm />
      </div>

      {/* Google Login */}
    </div>
  );
}
