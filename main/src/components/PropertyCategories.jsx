import React from "react";

const categories = [
  {
    title: "Flat",
    description:
      "Discover ready-to-move 1, 2, and 3 BHK flats in prime locations—perfect for families, professionals, and first-time buyers.",
  },
  {
    title: "Plot",
    description:
      "Invest in residential or commercial plots across fast-developing areas, ideal for building or future resale gains.",
  },
  {
    title: "Rental",
    description:
      "Explore a range of verified rental properties—from affordable apartments to fully-furnished homes for working individuals and students.",
  },
  {
    title: "Resale",
    description:
      "Buy well-maintained pre-owned flats with clear titles and immediate possession options in popular localities.",
  },
  {
    title: "Lease",
    description:
      "Access long-term leasing options for residential or commercial use, with transparent agreements and expert support.",
  },
  {
    title: "Farm House",
    description:
      "Own a peaceful weekend retreat or luxury countryside villa, perfect for relaxation or rental income.",
  },
  {
    title: "Farm Land",
    description:
      "Purchase agricultural land with high growth potential, ideal for farming, second homes, or land banking.",
  },
  {
    title: "Commercial Flat",
    description:
      "Ready-to-use flats designed for office spaces, clinics, and small businesses in high-visibility areas.",
  },
  {
    title: "Commercial Plot",
    description:
      "Strategic commercial land options to build showrooms, complexes, or business hubs in prime commercial zones.",
  },
  {
    title: "Rental Office",
    description:
      "Move into fully-equipped office spaces on rent—ideal for startups, freelancers, or growing businesses.",
  },
  {
    title: "Industrial Space",
    description:
      "Browse verified spaces for factories, warehouses, and logistics operations with good road connectivity.",
  },
  {
    title: "Rental Shop",
    description:
      "Secure high-footfall rental shops in market areas, malls, or residential localities—great for retail and service businesses.",
  },
];

const PropertyCategories = () => {
  return (
    <section className="px-2 sm:px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
        Discover Verified Properties with Reparv
      </h2>
      <p className=" text-gray-600 mb-6 sm:mb-8">
        Whether you're planning to buy, sell, rent, or invest, Reparv brings you
        end-to-end real estate solutions across Nagpur, Wardha, Amravati, and
        beyond. From verified listings to legal support, we make property
        decisions transparent and hassle-free.
      </p>
      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
        Property Categories We Offer
      </h2>
      <p className=" text-gray-600 mb-6 sm:mb-8">
        Explore a wide range of verified property types across Nagpur, Wardha,
        Amravati, and nearby cities.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-semibold text-[#076300] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
      <p className=" text-black mt-6 sm:mt-8">
        At <b>Reparv</b>, we’re redefining property experiences with
        transparency, expert support, and complete services—right from site
        visits to registry.
      </p>
      <p className="text-center font-bold text-lg text-black mt-4 sm:mt-6" >
        Verified Properties | Full Legal Support | Digital Process | 100% Transparency
      </p>
    </section>
  );
};

export default PropertyCategories;
