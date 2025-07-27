import RegisterForm from "@/components/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register/")({
  component: Register,
});

function Register() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col space-y-10">
      <div className=" max-w-96 w-full space-y-8 flex flex-col">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Let's get you started</h2>
          <p className="text-muted-foreground">Sign up and stay connected</p>
        </div>
      </div>
      <div className="w-full max-w-80">
        <RegisterForm />
      </div>
    </div>
  );
}
