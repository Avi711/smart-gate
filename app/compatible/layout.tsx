import "@/app/globals.css";

export const metadata = {
  title: "Smart Gate Access - Compatible Mode",
  description: "Control your garage door remotely - Compatible version",
};

// This is a completely separate layout that doesn't inherit from the root layout
export default function CompatibleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
