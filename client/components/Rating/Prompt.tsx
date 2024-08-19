import api from "@/lib/axios/private"
import { Sale } from "@/types/sales";
import { notFound } from "next/navigation"
import PromptData from "./PromptData";

export default async function Prompt({id}: {id: number}) {
    const result = await api.get<Sale>(`/sales/${id}`)

    if (result.status != 200) {
        return notFound()
    }
    let salesData = result.data;

    return (
        <div>
            <PromptData saleData={salesData}  />
        </div>
    )
}