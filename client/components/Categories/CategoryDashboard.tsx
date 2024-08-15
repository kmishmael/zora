import api from "@/lib/axios/private";
import { Categories } from "@/types/category";
import { PencilIcon          } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteCategory from "./DeleteCategory";

export default async function CategoryDashboard() {
  const categoriesData = (await api.get<Categories>("/categories")).data;

  return (
    <>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Name</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {categoriesData.categories.map((category, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={""}
                className="text-body-sm font-medium text-dark dark:text-dark-6"
              >
                {category.name}
              </Link>
            </div>
          </div>

          <div className="col-span-1 flex items-center">
            <div className="flex justify-end gap-3">
              <Link
                href={`/categories/update/${category.id}`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon className="w-5" />
              </Link>
              <DeleteCategory id={category.id} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
