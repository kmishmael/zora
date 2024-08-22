"use client";

import { Categories } from "@/types/category";
import { useState } from "react";
import SelectOption from "../FormElements/select";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios/private";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { ProductImage } from "@/types/productImage";
import { useToast } from "../ui/use-toast";

type FormInputs = {
  name: string;
  price: number;
  description: string;
};

type IFormInputs = {
  name: string;
  price: number;
  description: string;
  category: number;
  images: string[];
};

export default function ProductUpdate({
  categories,
  product,
}: {
  product: Product;
  categories: Categories["categories"];
}) {
  let categoryOptions = categories.map((category) => {
    return {
      name: category.name,
      value: category.id,
    };
  });

  const [selectedOption, setSelectedOption] = useState<number>(
    product.category?.id ? product.category.id : 0,
  );
  const [sError, setSError] = useState(false);
  const [images, setImages] = useState<ProductImage[]>(product.images);

  const router = useRouter();

  const { toast } = useToast();

  async function removeImage(image: ProductImage) {
    //let newImages = images.filter((img) => img != image);
    const res = (await api.delete(`/product-images/${image.id}`)).status;
    if (res == 200) {
      let newImages = images.filter((img) => img != img);
      setImages(newImages);
    }
    //setImages(newImages);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (sError) {
      alert("Category cannot be empty");
      return;
    }
    let uploadData = {
      ...data,
      category: selectedOption === 0 ? null : selectedOption,
    };
    console.log(uploadData);
    const result = await api.put(`/products/${product.id}`, uploadData);

    // TODO: Add a toast here
    if (result.status == 204) {
      toast({
        description: "Product updated successfully!",
      });
      router.push("/products");
    } else {
      console.log(result.data);
      toast({
        description: "Something went wrong.",
      });
    }
  };

  async function handleImageUpload(image: string) {
    const res = await api.post(`/product-images`, {
      product_id: product.id,
      url: image,
    });

    if (res.status == 201) {
      let newImage = res.data;
      setImages([...images, newImage]);
    }
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-semibold text-dark dark:text-white">New Product</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Product Name
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("name")}
              defaultValue={product.name}
              placeholder="Enter product name"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <SelectOption
            label="Category"
            sError={setSError}
            options={categoryOptions}
            placeholder="Select Category"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <div className="mb-4.5">
            {sError && (
              <span className="pl-4 text-sm text-red-600">
                category is required
              </span>
            )}
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Price
              {true && <span className="text-red">*</span>}
            </label>
            <input
              {...register("price", { required: true })}
              defaultValue={product.price}
              type="number"
              name="price"
              placeholder="Enter the price"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Product Description
            </label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={product.description}
              rows={6}
              placeholder="Product Description"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <br />
          <div className="mb-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Product Images
            </label>
            {images && (
              <div className="flex flex-wrap sm:gap-8">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative rounded-lg border-2 border-blue-500 p-2"
                  >
                    <Image
                      src={image.url}
                      height={100}
                      width={200}
                      className="h-[200px] object-contain"
                      alt=""
                    />
                    <button
                      onClick={(e: any) => {
                        e.stopPropagation();
                        removeImage(image);
                      }}
                      className="absolute -right-3 -top-3 rounded-full border bg-white p-2 text-black transition-colors duration-150 ease-in-out hover:bg-red-600 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                handleImageUpload(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <br />
          <button
            type="submit"
            className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
