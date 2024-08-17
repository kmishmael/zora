import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import api from "@/lib/axios/private";
import BranchUpdate from "@/components/Branches/BranchUpdate";
import { Branch } from "@/types/branch";

export default async function Page({ params }: { params: { id: number } }) {
  const branch = (await api.get<Branch>(`/branches/${params.id}`)).data;
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Branches" />
        <br />
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Suspense
            fallback={
              <div className="">
                <Loader />
              </div>
            }
          >
            <BranchUpdate branch={branch} />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
