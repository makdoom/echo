import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignUp } from "@clerk/clerk-react";
import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/emailVerification/")({
  beforeLoad: (ctx) => {
    const email = ctx.location.state.emailVerification?.email;
    if (!email) throw redirect({ to: "/register" });
  },
  component: EmailVerification,
});

function EmailVerification() {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setisVerifying] = useState(false);

  const email = useRouterState({
    select: (s) => s.location.state?.emailVerification?.email,
  });

  const handleOtpChange = (value: string) => setOtpValue(value);

  const handleEmailVerification = async () => {
    try {
      if (!isLoaded || otpValue?.length !== 6) return;

      setisVerifying(true);
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code: otpValue,
      });
      if (completeSignup.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
        navigate({ to: "/chat" });
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      toast.error(
        error.errors[0]?.message ||
          "Something went wrong while email verification"
      );
    } finally {
      setisVerifying(false);
    }
  };

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
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={otpValue}
          disabled={isVerifying}
          onChange={handleOtpChange} // Attach the change handler
          autoFocus
        >
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          className="w-full py-5"
          onClick={handleEmailVerification}
          disabled={isVerifying}
        >
          Verify {isVerifying && <Loader className="animate animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
