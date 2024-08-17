"use client";
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

const MainDashboard: React.FC = () => {
  return (
    <>
      <div className="flex justify-end py-2">
        <Link href={"#"}>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            Sell
          </button>
        </Link>
      </div>
      {/* <DataStatsOne /> */}
      <GlanceData />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12">
          {/* xl:col-span-8 */}
          <SalesmenPerformance />
        </div>
        <div className="col-span-12">
          {/* xl:col-span-8 */}
          <BranchPerformance />
        </div>
        <div className="col-span-12">
          {/* xl:col-span-8 */}
          <LeaderBoardPerformance />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 2xl:mt-9 2xl:gap-7.5">
        <BranchStats />
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />

        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default MainDashboard;
