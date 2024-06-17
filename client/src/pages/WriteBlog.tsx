import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BlogSchema, blogSchema } from "@/types/schemas";
import axios from "axios";

export const WriteBlog = () => {
  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const router = useNavigate();

  const { mutate: createBlog, isPending } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: async (values: BlogSchema) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/blog",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Something went wrong");
      }
    },
    onSuccess: () => {
      form.reset();
      router("/");
    },
    onError: (error: any) => {
      toast(error.message);
    },
  });

  const onSubmit = (values: BlogSchema) => {
    createBlog(values);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto ">
      <header className="fixed top-0 right-0 left-0  bg-white border-b px-12 py-2.5">
        <nav className="flex items-center justify-between">
          <div className="flex gap-8">
            <Link to="/" className="text-sm font-bold text-black">
              <img src="/logo.png" alt="logo" className="w-8 h-8" />
            </Link>
            <Input
              placeholder="Search a blog"
              className="bg-gray-100 rounded-3xl outline-none border-none w-72"
            />
          </div>

          <div className="flex gap-4 items-center">
            <Link
              to="/write-blog"
              className={buttonVariants({ variant: "secondary" })}
            >
              Write
            </Link>

            <p className="text-sm font-bold text-black">baxtior</p>
          </div>
        </nav>
      </header>

      <div className="flex flex-col gap-y-4 mt-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Grab the attention" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lets create an awesome story</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="It starts here"
                      rows={15}
                      {...field}
                    />
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
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
