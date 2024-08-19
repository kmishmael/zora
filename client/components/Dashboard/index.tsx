import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import Link from "next/link";
import GlanceData from "./Glance";
import SalesmenPerformance from "./SalesmenPerformance";
import BranchPerformance from "./BranchPerformance";
import LeaderBoardPerformance from "./LeaderBoard";
import BranchStats from "./BranchStats";
import api from "@/lib/axios/private";
import { DashboardData } from "@/types/dashboard";

const MainDashboard = async () => {
  const response = await api.get<DashboardData>("/sales/dashbored");
  if (response.status != 201) {
    return <>Something went terribly wrong! {response.status}</>;
  }
  let dashboardData = response.data;
  return (
    <>
      <GlanceData data={dashboardData} />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12">
          <SalesmenPerformance data={dashboardData} />
        </div>
        <div className="col-span-12">
          <BranchPerformance data={dashboardData} />
        </div>
        <div className="col-span-12">
          <LeaderBoardPerformance data={dashboardData} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 2xl:mt-9 2xl:gap-7.5">
        <BranchStats data={dashboardData} />
      </div>
    </>
  );
};

export default MainDashboard;

