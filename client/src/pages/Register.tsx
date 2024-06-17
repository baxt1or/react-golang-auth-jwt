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
import { RegisterSchema, registerSchema } from "@/types/schemas";

export const Register = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const router = useNavigate();
  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (values: RegisterSchema) => {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    onSuccess: () => {
      router("/login");
    },
    onError: (error: any) => {
      toast(error.message);
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    registerUser(values);
  };

  return (
    <>
      <AuthForm
        label="Join us Today"
        message="Already have account?"
        messageBack="Sign In"
        messageLinkBack="/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
              <FormField
                disabled={isPending}
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isPending}
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              disabled={isPending}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                "Sing Up"
              )}
            </Button>
          </form>
        </Form>
      </AuthForm>
    </>
  );
};
