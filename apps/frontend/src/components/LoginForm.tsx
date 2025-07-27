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
import { Link } from "@tanstack/react-router";

const LoginForm = () => {
  const form = useForm<authTypes.LoginSchemaType>({
    resolver: zodResolver(authTypes.LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

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
                <Input {...field} autoFocus placeholder="johndoe@gmail.com" />
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
          Login
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
