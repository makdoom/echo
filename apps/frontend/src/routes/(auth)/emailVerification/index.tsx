import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export const Route = createFileRoute("/(auth)/emailVerification/")({
  component: EmailVerification,
});

function EmailVerification() {
  const email = useRouterState({
    select: (s) => s.location.state?.emailVerification?.email, // Access the formData from state
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col space-y-10">
      <div className=" max-w-80 w-full space-y-8 flex flex-col">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Verifiy your email</h2>
          <p className="text-muted-foreground">
            Enter the code sent to <span className="font-bold">{email}</span>
          </p>
        </div>
      </div>

      <div className="w-full max-w-80 space-y-8 flex flex-col items-center justify-center">
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} autoFocus>
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button className="w-full">Verify</Button>
      </div>
    </div>
  );
}
