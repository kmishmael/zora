import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role == "basic") {
    redirect("/no-access");
  }
  return <>{children}</>;
}
