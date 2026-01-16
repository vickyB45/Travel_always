"use client";

import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function EnquiryForm() {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("ENQUIRY FORM DATA 👉", data);
    setSubmitted(true);
    reset();
  };

  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80')",
        contentVisibility: "auto",
        containIntrinsicSize: "1px 900px",
      }}
    >
      <div className="max-w-3xl mx-auto px-4">

        {!submitted ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-10 shadow-2xl"
          >
            {/* HEADER */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Plan Your Luxury Escape
              </h2>
              <p className="text-slate-500">
                Experience the world in unparalleled comfort
              </p>
            </div>

            {/* NAME */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase mb-1">
                Full Name
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="w-full rounded-lg border px-3 py-2 text-[16px] focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border px-3 py-2 text-[16px] focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="Phone Number"
                  className="w-full rounded-lg border px-3 py-2 text-[16px] focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
            </div>

            {/* DESTINATION */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase mb-1">
                Select Tour Destination
              </label>
              <select
                {...register("destination", { required: true })}
                defaultValue=""
                className="w-full rounded-lg border px-3 py-2 text-[16px] focus:ring-2 focus:ring-[#c5a059]"
              >
                <option value="" disabled>
                  Choose Destination...
                </option>
                <option>Other Destination</option>
                <option>Dubai Tours</option>
                <option>Vietnam Package</option>
                <option>Thailand Tour</option>
                <option>Goa Tours</option>
                <option>Combodia Tour</option>
                <option>Special Honeymoon Package</option>
                <option>Hill Stations Value</option>
                <option>Manali Customized Tours</option>
                <option>Shimla Package</option>
                <option>Dalhousie Tour</option>
              </select>
            </div>

            {/* DATE + GUESTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Arrival Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("arrival_date", { required: true })}
                  className="w-full rounded-lg border px-3 py-2 text-[16px] focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="2"
                  {...register("guests")}
                  className="w-full rounded-lg border px-3 py-2 text-[16px]"
                />
              </div>
            </div>

            {/* REQUESTS */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase mb-1">
                Special Requests
              </label>
              <textarea
                rows="2"
                {...register("special_requests")}
                placeholder="Tell us more about your needs..."
                className="w-full rounded-lg border px-3 py-2 text-[16px] resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#b38f4d] text-white font-bold uppercase py-3 rounded-lg transition"
            >
              <Send size={18} />
              Send My Quote Request
            </button>
          </form>
        ) : (
          /* THANK YOU */
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto text-green-600 mb-4" size={56} />
            <h2 className="text-2xl font-extrabold mb-2">
              Request Received!
            </h2>
            <p className="text-slate-600 mb-6">
              Check console for submitted form data.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:scale-105 transition"
            >
              Submit Another Request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
