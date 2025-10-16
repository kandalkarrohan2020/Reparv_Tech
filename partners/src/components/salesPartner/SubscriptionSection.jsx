import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import FormatPrice from "../FormatPrice";
import { FiArrowUpLeft } from "react-icons/fi";
import { MdDone } from "react-icons/md";

const SubscriptionSection = ({ plans }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (selectedPlan) {
    return (
      <div className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-6">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="max-w-[200px] flex gap-1 items-center justify-center mb-3 bg-[#0bb501] px-4 pl-5 py-1 rounded-full text-white cursor-pointer"
            >
              <span className="font-semibold">Go Back to Plans</span> <FiArrowUpLeft className="w-6 h-6" /> 
            </button>
            <h2 className="text:xl lg:text-3xl font-bold text-black mb-2">
              You selected the{" "}
              <span className="text-[#0bb501]">{selectedPlan.planName}</span>{" "}
              plan
            </h2>

            <p className="text-gray-600 text-sm md:text-base mb-1">
              Fill out the form below to register as a Sales Partner
            </p>
            <p className="text-center text-black font-semibold">
              Duration: {selectedPlan.planDuration} | Price:{" "}
              <FormatPrice price={selectedPlan.totalPrice} />
            </p>

            <div className="w-20 h-1 bg-[#0BB501] mx-auto mt-3 rounded" />
          </div>

          {/* Pass selected plan info if needed */}
          <RegistrationForm plan={selectedPlan} />
        </div>
      </div>
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl lg:text-3xl font-bold text-center text-black mb-10 md:mb-14 my-1">
          Choose Your{" "}
          <span className="text-2xl md:text-3xl sm:px-6 sm:py-2 rounded-2xl sm:bg-[#0bb501] text-[#0bb501] sm:text-[white] mx-1">
            Subscription
          </span>{" "}
          Plan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between bg-white hover:shadow-xl transition ${
                plan.highlight === "True" ? "border-green-500 lg:scale-105" : ""
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold text-black mb-2 text-center">
                  {plan.planName}
                </h3>
                <p className="text-sm text-gray-600 font-medium text-center mb-4">
                  {plan.planDuration}
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#0bb501]">
                    <FormatPrice price={plan.totalPrice} />
                  </span>
                  <span className="text-black text-sm font-semibold">
                    {" "}
                    / plan
                  </span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {plan.features.split(",").map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-[#0bb501] font-medium">
                        <MdDone />
                      </span>
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`mt-6 w-full py-2 rounded-lg font-medium text-white cursor-pointer ${
                  plan.highlight === "True"
                    ? "bg-[#0bb501] hover:bg-[#19b501]"
                    : "bg-gray-800 hover:bg-black"
                }`}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
