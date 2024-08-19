import RatingData from "@/components/Rating/RatingData";
import api from "@/lib/axios/private";
import { Sale } from "@/types/sales";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: number } }) {
  const result = await api.get<Sale>(`/sales/${params.id}`);

  if (result.status != 200) {
    return notFound();
  }
  let salesData = result.data;

  return (
    <>
      <RatingData salesData={salesData} />
    </>
  );
}
