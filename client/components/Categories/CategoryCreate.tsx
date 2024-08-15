"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

type FormInputs = {
  name: string;
};

export default function CategoryCreate() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let uploadData = {
      ...data,
    };

    const result = (await api.post("/categories", uploadData)).status;

    // TODO: Add a Toast here
    if (result == 201) {
      toast({
        description: "Category created successfully!",
      });
      router.push("/categories");
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
          New Category
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Category Name
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("name")}
              placeholder="Enter category name"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <br />
          <button
            type="submit"
            className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
