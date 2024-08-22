import api from "@/lib/axios/private";
import { PerformanceGoals } from "@/types/performance";
import PerformanceTable from "./GITable";

export default async function GIDashboard() {
  const performanceGoals = (await api.get<PerformanceGoals>("/performance_goals")).data;

  return (
    <>
      {/* <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">SalesPerson</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Target Sales</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Achieved Sales</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Incentive Amount</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Start Date</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">End Date</p>
        </div>
      </div> */}
      <PerformanceTable performanceData={performanceGoals} />
      {/* {performanceGoals.performance_goals.map((goal, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={""}
                className="text-body-sm font-medium text-dark dark:text-dark-6"
              >
                {goal.user_id}
              </Link>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {goal.target_sales}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {goal.achieved_sales}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {goal.incentive_amount}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {goal.start_date}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {goal.end_date}
            </p>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="flex justify-end gap-3">
              <Link
                href={`#`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon className="w-5" />
              </Link>
              <DeleteGI id={goal.id} />
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
}
