import Auctions from "@/components/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import MainDashboard from "@/components/Dashboard";
import React from "react";
import SalesmenDashboard from "@/components/Dashboard/SalemenDashboard";

export const metadata: Metadata = {
  title:
    "Zora System",
  description: "",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <SalesmenDashboard />
      </DefaultLayout>
    </>
  );
}
