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
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export const WriteBlog = () => {
  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      sub_title: "",
      category: "",
      status: "",
      location: "",
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

  const editor = useCreateBlockNote();

  return (
    <div className="min-h-screen max-w-7xl mx-auto ">
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
            <FormField
              disabled={isPending}
              control={form.control}
              name="sub_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtite</FormLabel>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Grab the attention" {...field} />
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
