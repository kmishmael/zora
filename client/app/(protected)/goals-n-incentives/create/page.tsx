import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import GICreate from "@/components/GoalsIncentives/GICreate";
import { Users } from "@/types/user";
import api from "@/lib/axios/private";

export default async function Page() {
  const usersData = (await api.get<Users>("/users")).data;
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Create New Goal & incentive" />
        <br />
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Suspense
            fallback={
              <div className="">
                <Loader />
              </div>
            }
          >
            <GICreate users={usersData.users} />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
