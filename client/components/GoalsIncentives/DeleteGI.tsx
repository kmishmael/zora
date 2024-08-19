"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useToast } from "../ui/use-toast";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";

export default function DeletePerformanceGoal({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handlePerformanceGoalDelete(id: number) {
    const res = await api.delete(`/performance_goals/${id}`);
    if (res.status == 204) {
      // Add a toast here
      toast({
        description: "Performance Goal deleted successfully.",
      });
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() => handlePerformanceGoalDelete(id)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
