import api from "@/lib/axios/private";
import Image from "next/image";
import { Products } from "@/types/product";
import {PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function ProductDashboard() {
  const productsData = (await api.get<Products>("/products")).data;

  return (
    <>
      
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {productsData.products.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].image_url}
                    width={60}
                    height={50}
                    alt="Product"
                  />
                ) : (
                  <Image
                    src="/images/placeholder.png"
                    width={60}
                    height={50}
                    alt="Product"
                  />
                )}
              </div>
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.category.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex justify-end gap-3">
              <Link
                href={`/dashboard/invoices/id/edit`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon className="w-5" />
              </Link>
              <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
              </button>
            </div>
          </div>
          {/* <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {product.sold}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-green">
                  ${product.profit}
                </p>
              </div> */}
        </div>
      ))}
    </>
  );
}
