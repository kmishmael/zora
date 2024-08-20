import Link from "next/link";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import Prompt from "@/components/Rating/Prompt";

export default function Page({ params }: { params: { id: number } }) {

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-10">
        <Link href="/" className="text-4xl font-bold text-blue-600">
          Zora System
        </Link>
        <Suspense fallback={<Loader />}>
          <Prompt id={params.id} />
        </Suspense>
        <br />
        <br />
        <a href="/" className="underline text-primary font-medium">Go back</a>
      </div>
    </>
  );
}
