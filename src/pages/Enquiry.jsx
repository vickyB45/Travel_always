"use client";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EnquiryForm from "../components/EnquiryForm";

const Enquiry = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="
          fixed
          top-4
          left-4
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          bg-black/60
          text-white
          text-sm
          font-semibold
          backdrop-blur
          hover:bg-[#ff8400]
          cursor-pointer
          transition
        "
        aria-label="Go back"
      >
        <ArrowLeft size={16} />
        Home
      </button>

      {/* FORM */}
      <EnquiryForm />
    </div>
  );
};

export default Enquiry;
