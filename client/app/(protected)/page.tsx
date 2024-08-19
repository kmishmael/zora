import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import MainDashboard from "@/components/Dashboard";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import SalesmenDashboard from "@/components/Dashboard/SalemenDashboard";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
export const metadata: Metadata = {
  title: "Zora System",
  description: "",
};

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role == "manager") {
    return (
      <>
        <DefaultLayout>
          <Suspense fallback={<Loader />}>
          <MainDashboard />
          </Suspense>
        </DefaultLayout>
      </>
    );
  }

  if (session.user.role == "salesperson") {
    return (
      <>
        <DefaultLayout>
          <SalesmenDashboard />
        </DefaultLayout>
      </>
    );
  }

  redirect("/no-access");
}
