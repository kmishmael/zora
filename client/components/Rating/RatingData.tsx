"use client";

import { useState } from "react";
import api from "@/lib/axios/private";
import { Sale } from "@/types/sales";
import Link from "next/link";

export default function RatingData({ salesData }: { salesData: Sale }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");

  const handleRating = (value: number) => {
    setRating(value);
  };
  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      await api.post("/feedback", {
        sale_id: salesData.id,
        rating: rating,
        comment: comment,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Link href="/" className="text-4xl font-bold text-blue-600">
        Zora System
      </Link>
      <br />
      {!submitted ? (
        <h1 className="mb-4 text-3xl font-bold">
          Hi <span className="text-primary">{salesData.customer_name}</span>,
          Rate Your Experience
        </h1>
      ) : (
        <h1 className="mb-4 text-3xl font-bold">
          Hi <span className="text-primary">{salesData.customer_name}</span>
        </h1>
      )}

      <br />
      {!submitted ? (
        <>
          <div className="mb-4 flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-10 w-10 cursor-pointer ${rating >= star ? "text-primary" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleRating(star)}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.584 4.885a1 1 0 00.95.69h5.11c.969 0 1.372 1.24.588 1.81l-4.147 3.012a1 1 0 00-.364 1.118l1.584 4.885c.3.921-.755 1.688-1.538 1.118l-4.147-3.011a1 1 0 00-1.175 0l-4.147 3.011c-.783.57-1.838-.197-1.538-1.118l1.584-4.885a1 1 0 00-.364-1.118L.49 10.312c-.784-.57-.38-1.81.588-1.81h5.11a1 1 0 00.95-.69l1.584-4.885z" />
              </svg>
            ))}
          </div>
          <br />
          <br />

          <div className="mb-6 w-full md:w-1/3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Feedback Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              placeholder="Enter your feedback (optional)"
              className="w-full rounded-[7px] border-2 border-neutral-900 bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </>
      ) : (
        <p className="text-lg font-semibold">Thank you for your feedback!</p>
      )}
    </div>
  );
}
