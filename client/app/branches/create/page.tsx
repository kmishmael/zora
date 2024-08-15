import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import BranchCreate from "@/components/Branches/BranchCreate";
import Loader from "@/components/common/Loader";

export default async function Page() {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Create New Branch" />
        <br />
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Suspense
            fallback={
              <div className="">
                <Loader />
              </div>
            }
          >
            <BranchCreate />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
