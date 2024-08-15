"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useToast } from "../ui/use-toast";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";

export default function DeleteCategory({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleCategoryDelete(id: number) {
    const res = await api.delete(`/categories/${id}`);
    if (res.status == 204) {
      // Add a toast here
      toast({
        description: "Product deleted successfully.",
      });
      router.refresh();
    }
    console.log(res.status)
  }

  return (
    <>
      <button
        onClick={() => handleCategoryDelete(id)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
