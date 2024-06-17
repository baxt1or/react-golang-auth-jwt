import { Button } from "./ui/button";

const categories = [
  {
    href: "",
    label: "Programming",
  },
  {
    href: "",
    label: "AI & ML",
  },
  {
    href: "",
    label: "Traveling",
  },
  {
    href: "",
    label: "Economics",
  },
  {
    href: "",
    label: "Finance",
  },
  {
    href: "",
    label: "Business",
  },

  {
    href: "",
    label: "Engineering",
  },
];

export const Categories = () => {
  return (
    <div className="mb-6">
      <h1 className="text-sm font-bold text-black">
        Stories from all interests
      </h1>

      <div className="space-x-1 space-y-1.5 mt-4">
        {categories.map((item) => (
          <Button
            variant={"secondary"}
            key={item.label}
            size="sm"
            className="text-[12px]"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
