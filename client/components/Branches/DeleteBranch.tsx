"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useToast } from "../ui/use-toast";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";

export default function DeleteBranch({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleBranchDelete(id: number) {
    const res = await api.delete(`/branches/${id}`);
    if (res.status == 204) {
      // Add a toast here
      toast({
        description: "Branch deleted successfully.",
      });
      router.refresh();
    }
    console.log(res.status);
  }

  return (
    <>
      <button
        onClick={() => handleBranchDelete(id)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
