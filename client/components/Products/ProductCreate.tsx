"use client";

import { Categories } from "@/types/category";
import InputGroup from "../FormElements/InputGroup";
import { useState } from "react";
import SelectOption from "../FormElements/select";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ProductCreate({
  categories,
}: {
  categories: Categories["categories"];
}) {
  let categoryOptions = categories.map((category) => {
    return {
      name: category.name,
      value: category,
    };
  });

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [images, setImages] = useState<string[]>([
    "https://utfs.io/f/0e741e2d-9d78-453c-9d6c-09fe0c824223-cv4mpx.jpg",
    "https://utfs.io/f/30a141f0-8f6f-4517-a001-747b0cc5f18c-z21x6y.jpg",
  ]);

  function removeImage(image: string) {
    let newImages = images.filter((img) => img != image);
    setImages(newImages);
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-semibold text-dark dark:text-white">New Product</h3>
      </div>
      <div className="p-6.5">
        <InputGroup
          label="Product Name"
          type="text"
          name="productName"
          placeholder="Enter product name"
          customClasses="mb-4.5"
          required
        />

        <SelectOption
          label="Category"
          options={categoryOptions}
          placeholder="Select Category"
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <div className="mb-4.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Price
            {true && <span className="text-red">*</span>}
          </label>
          <input
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
                <div className="relative rounded-lg border-2 border-blue-500 p-2">
                  <Image
                    src={image}
                    height={100}
                    width={200}
                    className="h-[200px] object-contain"
                    alt=""
                  />
                  <button
                    onClick={() => removeImage(image)}
                    className="absolute -right-3 -top-3 rounded-full border bg-white p-2 text-black transition-colors duration-150 ease-in-out hover:bg-red-600 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-4 w-4 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
              // Do something with the response
              console.log("Files: ", res);
              setImages([...images, res[0].url]);
              //alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>

        <br />
        <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Add Product
        </button>
      </div>
    </div>
  );
}
