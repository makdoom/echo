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

const RegisterForm = () => {
  const { isLoaded } = useSignUp();
  const navigate = useNavigate();

  const form = useForm<authTypes.RegisterSchemaType>({
    resolver: zodResolver(authTypes.RegisterSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: authTypes.LoginSchemaType) => {
    console.log(data);
    navigate({
      to: "/emailVerification",
      state: { emailVerification: { email: data.email } },
    });
  };

  if (!isLoaded) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-3">
        <FormField
          control={form.control}
          name="fullname"
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
        <Button type="submit" className="w-full py-5">
          Register
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
