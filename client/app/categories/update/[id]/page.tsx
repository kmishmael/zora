import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import { Categories } from "@/types/category";
import api from "@/lib/axios/private";
import ProductUpdate from "@/components/Products/ProductUpdate";
import { Product } from "@/types/product";

export default async function Page({ params }: { params: { id: number } }) {
  const categories = (await api.get<Categories>("/categories")).data;
  const product = (await api.get<Product>(`/products/${params.id}`)).data
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
            <ProductUpdate categories={categories.categories} product={product} />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
