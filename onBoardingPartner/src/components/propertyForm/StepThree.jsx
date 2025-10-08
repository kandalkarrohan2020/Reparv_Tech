import { useState } from "react";

const StepThree = ({
  newProperty,
  setPropertyData,
  imageFiles,
  setImageFiles,
}) => {
  const handleImageChange = (event, category) => {
    const files = Array.from(event.target.files);
    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 500 * 1024; // 500KB

    const validFiles = [];
    for (const file of files) {
      if (!validFormats.includes(file.type)) {
        alert(`❌ Invalid file type: ${file.name}. Only JPEG, JPG, or PNG allowed.`);
        continue;
      }
      if (file.size > maxSize) {
        alert(`⚠️ File too large: ${file.name}. Must be under 500KB.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      event.target.value = "";
      return;
    }

    setImageFiles((prev) => {
      const existing = prev[category] || [];
      const newFiles = [...existing, ...validFiles];

      if (newFiles.length > 3) {
        alert("⚠️ You can only upload up to 3 images per category.");
        return { ...prev, [category]: newFiles.slice(0, 3) };
      }

      return { ...prev, [category]: newFiles };
    });

    // reset input so same file can be selected again
    event.target.value = "";
  };

  const removeImage = (category, index) => {
    setImageFiles((prev) => {
      const updated = [...prev[category]];
      updated.splice(index, 1);
      return { ...prev, [category]: updated };
    });
  };

  return (
    <div className="bg-white h-[55vh] overflow-scroll scrollbar-x-hidden p-2">
      <div className="flex items-center justify-between text-base font-semibold mb-4">
        Step 3: Upload Property Images{" "}
        <span className="text-red-600 text-xs">(Maximum Image Size 500KB)</span>
      </div>

      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {[
          { key: "frontView", label: "Front View", required: true },
          { key: "nearestLandmark", label: "Nearest Landmark", required: true },
          { key: "developedAmenities", label: "Developed Amenities", required: true },
          { key: "sideView", label: "Side View" },
          { key: "hallView", label: "Hall View" },
          { key: "kitchenView", label: "Kitchen View" },
          { key: "bedroomView", label: "Bedroom View" },
          { key: "bathroomView", label: "Bathroom View" },
          { key: "balconyView", label: "Balcony View" },
        ]
          .filter((item) => {
            const cat = newProperty.propertyCategory;
            if (
              ["CommercialPlot", "NewPlot", "FarmLand"].includes(cat) &&
              ["sideView", "hallView", "balconyView", "bathroomView", "bedroomView", "kitchenView"].includes(item.key)
            ) {
              return false;
            }
            if (
              ["IndustrialSpace", "RentalShop"].includes(cat) &&
              ["kitchenView", "bedroomView", "bathroomView"].includes(item.key)
            ) {
              return false;
            }
            return true;
          })
          .map(({ key, label, required }) => (
            <div key={key} className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                {label} {required && <span className="text-red-600">*</span>}
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  onChange={(e) => handleImageChange(e, key)}
                  className="hidden"
                  id={`${key}Images`}
                />
                <label
                  htmlFor={`${key}Images`}
                  className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                >
                  <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                    Upload Images
                  </span>
                  <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                    Browse
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                {(imageFiles[key] || []).map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);
                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0 ? "border-4 border-blue-500" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(key, index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StepThree;