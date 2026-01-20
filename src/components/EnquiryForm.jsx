"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { enquirySchema } from "../schemas/admin.schema";
import { useCreateEnquiry } from "../hooks/public/publicQuery";


export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
  });

  const { mutate, isPending } = useCreateEnquiry();

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        setSubmitted(true);
        reset();
      },
    });
  };

  return (
    <section
      className=" min-h-screen relative md:py-20 py-14 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="max-w-3xl mx-auto p-2">
        {!submitted ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/95 backdrop-blur rounded-2xl py-6 px-4 md:p-10 shadow-2xl"
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
                {...register("name")}
                className="w-full rounded-lg border px-3 py-2 text-[16px]"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border px-3 py-2 text-[16px]"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-lg border px-3 py-2 text-[16px]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* DESTINATION (INPUT + DATALIST) */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase mb-1">
                Destination / Package
              </label>
              <input
                {...register("destination")}
                list="destinations"
                placeholder="Type or select destination"
                className="w-full rounded-lg border px-3 py-2 text-[16px]"
              />
              <datalist id="destinations">
                <option value="Dubai Tours" />
                <option value="Vietnam Package" />
                <option value="Thailand Tour" />
                <option value="Goa Tours" />
                <option value="Manali Customized Tours" />
                <option value="Shimla Package" />
                <option value="Dalhousie Tour" />
                <option value="Special Honeymoon Package" />
              </datalist>
              {errors.destination && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.destination.message}
                </p>
              )}
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
                  {...register("arrival_date")}
                  className="w-full rounded-lg border px-3 py-2 text-[16px]"
                />
                {errors.arrival_date && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.arrival_date.message}
                  </p>
                )}
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

            {/* SPECIAL REQUESTS */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase mb-1">
                Special Requests
              </label>
              <textarea
                rows="2"
                {...register("special_requests")}
                className="w-full rounded-lg border px-3 py-2 text-[16px]"
                placeholder="Tell us more about your needs..."
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#b38f4d] disabled:opacity-60 text-white font-bold uppercase py-3 rounded-lg"
            >
              <Send size={18} />
              {isPending ? "Submitting..." : "Send My Quote Request"}
            </button>
          </form>
        ) : (
          /* SUCCESS */
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
            <CheckCircle2 size={56} className="mx-auto text-green-600 mb-4" />
            <h2 className="text-2xl font-extrabold mb-2">
              Request Received!
            </h2>
            <p className="text-slate-600 mb-6">
              Our team will contact you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold"
            >
              Submit Another Request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
