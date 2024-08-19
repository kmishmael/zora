"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import SelectSalesman from "./SelectSalesman";
import { useState } from "react";
import { User } from "@/types/user";

type FormInputs = {
  targetSales: number;
  startDate: string;
  endDate: string;
  description: string;
  incentiveAmount: number;
};

export default function GICreate({ users }: { users: User[] }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const { toast } = useToast();

  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [sError, setSError] = useState(false);

  let salesPeople = users.filter((user) => user.role == "salesperson");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let uploadData = {
      user_id: salesPeople.filter((user) => user.id == selectedOption)[0].id,
      target_sales: data.targetSales,
      start_date: data.startDate,
      end_date: data.endDate,
      incentive_amount: data.incentiveAmount,
    };
    console.log(uploadData)
    const result = (await api.post("/performance_goals", uploadData)).status;

    // TODO: Add a Toast here
    if (result == 201) {
      toast({
        description: "Performance Goal created successfully!",
      });
      router.push("/goals-n-incentives");
      router.refresh();
    } else {
      toast({
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-semibold text-dark dark:text-white">
          New Goal & Incentive
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <br />
          <SelectSalesman
            label="SalesPerson"
            sError={setSError}
            options={salesPeople}
            placeholder="Select Salesperson"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <br />

          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Target Sales
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("targetSales", { required: true })}
              type="number"
              placeholder="Target Sales Amount"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.targetSales && <>{errors.targetSales.message}</>}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Start Date
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("startDate", { required: true })}
              type="date"
              placeholder="Start date"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.startDate && <>{errors.startDate.message}</>}
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              End Date
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("endDate", { required: true })}
              type="date"
              placeholder="End date"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.endDate && <>{errors.endDate.message}</>}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Incentive Amount
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("incentiveAmount", { required: true })}
              type="number"
              defaultValue={0}
              placeholder="Incentive Amount"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.targetSales && <>{errors.targetSales.message}</>}
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={6}
              placeholder="Description"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            ></textarea>
            {errors.description && <>{errors.description.message}</>}
          </div>
          <br />
          <br />

          <button
            type="submit"
            className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            Add Performance goal & Incentive
          </button>
        </div>
      </form>
    </div>
  );
}
