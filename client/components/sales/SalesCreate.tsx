"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import SelectProduct from "./SelectProduct";
import { useState } from "react";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { Sale } from "@/types/sales";

type FormInputs = {
  name: string;
  email: string;
  quantity: number;
};

export default function SalesCreate({ products }: { products: Product[] }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [productError, setProductError] = useState<boolean>(false);

  const { data: session, status } = useSession();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let selectedProduct = products.filter(
      (product: Product) => product.id == selectedOption,
    )[0];
    let uploadData = {
      customer_name: data.name,
      user_id: session?.user.id,
      customer_email: data.email,
      quantity: data.quantity,
      product_id: selectedProduct.id,
      unit_price: selectedProduct.price,
      total_price: selectedProduct.price * data.quantity,
    };

    const result = (await api.post<Sale>("/sales", uploadData));

    // TODO: Add a Toast here
    if (result.status == 201) {
      toast({
        description: "Sales created successfully!",
      });
      router.push(`/rate/prompt/${result.data.id}`);
      // router.refresh();
    } else {
      toast({
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-semibold text-dark dark:text-white">
          Register New Sale
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Name
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="customer name"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Email
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Customer Email address"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <SelectProduct
            label="Product"
            sError={setProductError}
            options={products}
            placeholder="Select Product"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <div className="mb-4.5">
            {productError && (
              <span className="pl-4 text-sm text-red-600">
                product is required
              </span>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Quantity
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("quantity", { required: true })}
              type="number"
              name="quantity"
              defaultValue={1}
              placeholder=""
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Price
            </label>
            <input
              name="price"
              value={
                selectedOption != 0
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "KES",
                    }).format(
                      products.filter(
                        (product) => product.id == selectedOption,
                      )[0].price * watch("quantity"),
                    )
                  : undefined
              }
              disabled
              placeholder="Not Selected"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <br />
          <br />
          <button
            type="submit"
            className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            Register a sale
          </button>
        </div>
      </form>
    </div>
  );
}
