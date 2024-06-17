import { AuthForm } from "@/components/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { LoginSchema, loginSchema } from "@/types/schemas";

export const Login = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useNavigate();

  const { mutate: loginUser, isPending } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (values: LoginSchema) => {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    onSuccess: () => {
      form.reset();
      router("/");
    },
    onError: (error: any) => {
      toast(error.message);
    },
  });

  const onSubmit = (values: LoginSchema) => {
    loginUser(values);
  };

  return (
    <>
      <AuthForm
        label="Welcome back"
        message="Dont have account?"
        messageBack="Join us Today"
        messageLinkBack="/register"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                </>
              ) : (
                "Sing In"
              )}
            </Button>
          </form>
        </Form>
      </AuthForm>
    </>
  );
};
