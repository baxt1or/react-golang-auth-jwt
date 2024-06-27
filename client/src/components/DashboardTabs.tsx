import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="blogs">
      <TabsList className="flex flex-col gap-y-4">
        <TabsTrigger value="blogs">Blogs</TabsTrigger>
        <TabsTrigger value="notification">Notiofication</TabsTrigger>
        <TabsTrigger value="write">Write</TabsTrigger>
      </TabsList>

      <TabsContent value="blogs">Hello from Blogs</TabsContent>
      <TabsContent value="notification">Hello from notification</TabsContent>
      <TabsContent value="write">Hello write a blog</TabsContent>
    </Tabs>
  );
};
