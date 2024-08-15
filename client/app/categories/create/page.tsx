import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import ProductCreate from "@/components/Products/ProductCreate";
import api from "@/lib/axios/private";
import { Categories } from "@/types/category";
import Loader from "@/components/common/Loader";

export default async function Page() {
  const categories = (await api.get<Categories>("/categories")).data;
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Create New Category" />
        <br />
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Suspense fallback={
             <div className="">
             <Loader />
           </div>
          }>
            <ProductCreate categories={categories.categories} />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
