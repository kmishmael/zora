import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import SalesCreate from "@/components/sales/SalesCreate";
import api from "@/lib/axios/private";
import { Products } from "@/types/product";

export default async function RegisterForm() {
  const products = (await api.get<Products>("/products")).data;

  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Register New Sale" />
          <br />
          <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <Suspense
              fallback={
                <div className="">
                  <Loader />
                </div>
              }
            >
              <SalesCreate products={products.products} />
            </Suspense>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
