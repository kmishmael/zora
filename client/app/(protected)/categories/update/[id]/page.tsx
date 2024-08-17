import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import { Category } from "@/types/category";
import api from "@/lib/axios/private";
import CategoryUpdate from "@/components/Categories/CategoryUpdate";

export default async function Page({ params }: { params: { id: number } }) {
  const category = (await api.get<Category>(`/categories/${params.id}`)).data;

  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Categories" />
        <br />
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Suspense
            fallback={
              <div className="">
                <Loader />
              </div>
            }
          >
            <CategoryUpdate category={category} />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
