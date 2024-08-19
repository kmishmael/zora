"use client";

import { Sale } from "@/types/sales";
import QRCode from "react-qr-code";

export default function PromptData({ saleData }: { saleData: Sale }) {
  const handleEmailSend = async () => {
    // send email here
    // try {
    //   await axios.post("/api/send-email", {
    //     email: feedbackData.customer_email,
    //   });
    //   alert("Email sent successfully!");
    // } catch (error) {
    //   console.error("Error sending email:", error);
    // }
  };

  const handleShare = async () => {
    let shareUrl  = `https://localhost:3000/rate/sale/${saleData.id}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Feedback Request",
          text: `We'd love to hear your feedback, ${saleData.customer_name}!`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-4 text-3xl font-bold">We Value Your Feedback</h1>
      <p className="mb-6 text-lg font-medium">
        Hi{" "}
        <span className="font-bold text-primary">{saleData.customer_name}</span>
        , we&apos;d love to hear your thoughts on our service!
      </p>

      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onClick={handleEmailSend}
      >
        Send Feedback Request via Email
      </button>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Scan the QR Code to Leave Feedback
        </h2>
        <br />
    
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 180,
            width: "100%",
          }}
          className="my-5"
        >
          <QRCode
            size={512}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`https://localhost:3000/rate/sale/${saleData.id}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <br />
        
      </div>

      <button
        className="mb-4 rounded bg-green-500 px-4 py-2 font-bold text-white"
        onClick={handleShare}
      >
        Copy or Share Feedback Link
      </button>
    </div>
  );
}
