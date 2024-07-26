import Auctions from "@/components/Dashboard/auctions";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Murphy auctioneers",
  description: "",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Auctions />
      </DefaultLayout>
    </>
  );
}
