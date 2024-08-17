import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UsersDashboard from "@/components/Users/UsersDashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Users" />
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Suspense fallback={<>Loading...</>}>
            <UsersDashboard />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
