import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import Search from "@/components/search";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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
        <Breadcrumb pageName="Products" />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search products..." />
          <Link
            href="/dashboard/invoices/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Create Product</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </div>
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
