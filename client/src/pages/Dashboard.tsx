import { DashboardTabs } from "@/components/DashboardTabs";

export const Dashboard = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <div className="md:flex pt-16">
        <div className="hidden md:block h-screen w-3/12 ">
          <div className="py-4 px-6">
            <h1 className="text-md font-bold text-black border-b pb-2">
              Dashboard
            </h1>

            <div className="flex flex-col gap-y-4 py-12">
              <p className="text-md text-muted-foreground font-medium">Blogs</p>
              <p className="text-md text-muted-foreground font-medium">
                Notiofications
              </p>
              <p className="text-md text-muted-foreground font-medium">Write</p>
            </div>

            <div className="border-t flex  flex-col gap-y-4 pt-8">
              <p className="text-md text-muted-foreground font-medium">
                Edit Profile
              </p>

              <p className="text-md text-muted-foreground font-medium">
                Log out
              </p>
            </div>
          </div>
        </div>

        <div className="h-screen  md:w-3/4 md:border-l">Hello</div>
      </div>
    </div>
  );
};
