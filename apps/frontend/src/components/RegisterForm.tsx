import { authTypes } from "@repo/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSignUp } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useState } from "react";

const RegisterForm = () => {
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<authTypes.RegisterSchemaType>({
    resolver: zodResolver(authTypes.RegisterSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: authTypes.RegisterSchemaType) => {
    if (!isLoaded) return;

    try {
      setIsRegistering(true);
      await signUp?.create({
        emailAddress: data.email,
        password: data.password,
      });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      navigate({
        to: "/emailVerification",
        state: { emailVerification: { email: data.email } },
      });
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      toast.error(
        error?.errors[0]?.message ||
          "Something went wrong while registering the user"
      );
    } finally {
      setIsRegistering(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-3">
        <FormField
          control={form.control}
          name="fullname"
          disabled={isRegistering}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoFocus placeholder="John Doe" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isRegistering}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="johndoe@gmail.com" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isRegistering}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full py-5" disabled={isRegistering}>
          Register
          {isRegistering && <Loader className="animate animate-spin" />}
        </Button>
      </form>

      <p className="text-center text-sm">
        Already have an account ?{" "}
        <Link to="/login" className="text-primary font-bold hover:underline">
          Login
        </Link>
      </p>
    </Form>
  );
};
export default RegisterForm;
