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
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useRequest } from "@/hooks/useApi";
import type { LoginData } from "@repo/types/src/authTypes";

const LoginForm = () => {
  const { post } = useRequest();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const form = useForm<authTypes.LoginSchemaType>({
    resolver: zodResolver(authTypes.LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: authTypes.LoginSchemaType) => {
    if (!isLoaded) return;

    try {
      setIsAuthenticating(true);
      let result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      if (result.status == "complete") {
        await setActive({ session: result.createdSessionId });

        const responseData = await post<LoginData>("/auth/login");

        if (responseData.success) {
          console.log("Login successful:", responseData);
          // responseData.data is now properly typed as LoginData
          navigate({ to: "/chat" });
        } else {
          console.error("Login failed:", responseData.message);
          toast.error(
            responseData.message ||
              "An unexpected error occurred. Please try again."
          );
        }
      } else {
        toast.error(
          "Login failed, Please check your credentials and try again"
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle different types of errors
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (
        error.errors &&
        Array.isArray(error.errors) &&
        error.errors[0]?.message
      ) {
        // Clerk authentication errors
        errorMessage = error.errors[0].message;
      } else if (error.message) {
        // API response errors or other errors with message property
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!isLoaded) return;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isAuthenticating}
                  autoFocus
                  placeholder="johndoe@gmail.com"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={isAuthenticating}
                  placeholder="******"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-5"
          disabled={isAuthenticating}
        >
          Login
          {isAuthenticating && <Loader className="animate animate-spin" />}
        </Button>
      </form>

      <p className="text-center text-sm">
        Don't have an account ?{" "}
        <Link to="/register" className="text-primary font-bold hover:underline">
          Create one{" "}
        </Link>
      </p>
    </Form>
  );
};
export default LoginForm;
