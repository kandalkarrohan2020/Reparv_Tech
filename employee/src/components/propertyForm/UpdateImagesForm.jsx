import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { IoMdClose } from "react-icons/io";
import Loader from "../Loader";

const UpdateImagesForm = ({
  fetchData,
  propertyId,
  setPropertyId,
  newProperty,
  setPropertyData,
  imageFiles,
  setImageFiles,
}) => {
  const { URI, setLoading, showUpdateImagesForm, setShowUpdateImagesForm } =
    useAuth();

  const parseImageField = (field) => {
    try {
      return JSON.parse(newProperty?.[field] || "[]");
    } catch {
      return [];
    }
  };

  const imageFields = [
    "frontView",
    "sideView",
    "hallView",
    "kitchenView",
    "bedroomView",
    "bathroomView",
    "balconyView",
    "nearestLandmark",
    "developedAmenities",
  ];

  const parsedImages = imageFields.reduce((acc, field) => {
    acc[`${field}Images`] = parseImageField(field);
    return acc;
  }, {});

  const {
    frontViewImages,
    sideViewImages,
    hallViewImages,
    kitchenViewImages,
    bedroomViewImages,
    bathroomViewImages,
    balconyViewImages,
    nearestLandmarkImages,
    developedAmenitiesImages,
  } = parsedImages;

  const [selectedImageType, setselectedImageType] = useState("");

  //Property Image Selector And Remove Methods
  const handleImageChange = (event, category) => {
    const files = Array.from(event.target.files);

    setImageFiles((prev) => ({
      ...prev,
      [category]: [...prev[category], ...files],
    }));
  };
  //Property Image Remove Methods
  const removeImage = (category, index) => {
    setImageFiles((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const updateImages = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Add multiple image files for each field
    const imageFields = [
      "frontView",
      "sideView",
      "kitchenView",
      "hallView",
      "bedroomView",
      "bathroomView",
      "balconyView",
      "nearestLandmark",
      "developedAmenities",
    ];

    imageFields.forEach((field) => {
      if (imageFiles[field]) {
        imageFiles[field].forEach((file) => {
          formData.append(field, file);
        });
      }
    });

    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/admin/properties/images/edit/${
          newProperty.propertyid || propertyId
        }`,
        {
          method: "PUT",
          credentials: "include",
          body: formData, // Use FormData instead of JSON
        }
      );

      if (response.status === 409) {
        alert("Property already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        alert("Property images updated successfully!");
      }

      // Clear form after successful response
      setImageFiles({
        frontView: [],
        sideView: [],
        kitchenView: [],
        hallView: [],
        bedroomView: [],
        bathroomView: [],
        balconyView: [],
        nearestLandmark: [],
        developedAmenities: [],
      });
      await fetchData();
      setShowUpdateImagesForm(false);
    } catch (err) {
      console.error("Error saving property images:", err);
      if (err.response?.data?.error) {
        alert("Upload failed: " + err.response.data.error);
      } else {
        alert("please check empty fields or try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchImages(propertyId);
  }, []);

  return (
    <div
      className={` ${
        showUpdateImagesForm ? "flex" : "hidden"
      } z-[61] overflow-scroll scrollbar-hide w-full md:w-[500px] fixed bottom-0 md:bottom-auto `}
    >
      <div className="overflow-scroll scrollbar-hide w-full md:w-[500px] lg:w-[700px] xl:w-[1000px] max-h-[80vh] bg-white py-8 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Update Images</h2>
          <IoMdClose
            onClick={() => {
              setShowUpdateImagesForm(false);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <form onSubmit={updateImages}>
          <div className="grid gap-6 md:gap-4 grid-cols-1">
            <input
              type="hidden"
              value={propertyId || ""}
              onChange={(e) => {
                setPropertyId(e.target.value);
              }}
            />
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Select Image Type <span className="text-red-600">*</span>
              </label>
              <select
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                style={{ backgroundImage: "none" }}
                value={selectedImageType}
                onChange={(e) => setselectedImageType(e.target.value)}
              >
                <option value="" disabled>
                  {" "}
                  Select Image Type{" "}
                </option>
                <option value="Front View">Front View</option>
                <option value="Side View">Side View</option>
                <option value="Hall View">Hall View</option>
                <option value="Kitchen View">Kitchen View</option>
                <option value="Bedroom View">Bedroom View</option>
                <option value="Bathroom View">Bathroom View</option>
                <option value="Balcony View">Balcony View</option>
                <option value="Nearest Landmark">Nearest Landmark</option>
                <option value="Developed Amenities">Developed Amenities</option>
              </select>
            </div>

            <div
              className={`${
                selectedImageType === "Front View" ? "block" : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Front View <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {frontViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "frontView")}
                  className="hidden"
                  id="frontViewImages"
                />
                <label
                  htmlFor="frontViewImages"
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
                {imageFiles.frontView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);
                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("frontView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                selectedImageType === "Nearest Landmark" ? "block" : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Nearest Landmark <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {nearestLandmarkImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "nearestLandmark")}
                  className="hidden"
                  id="nearestLandmarkImages"
                />
                <label
                  htmlFor="nearestLandmarkImages"
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
                {imageFiles.nearestLandmark.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);
                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("nearestLandmark", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                selectedImageType === "Developed Amenities" ? "block" : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Developed Amenities <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {developedAmenitiesImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "developedAmenities")}
                  className="hidden"
                  id="developedAmenitiesImages"
                />
                <label
                  htmlFor="developedAmenitiesImages"
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
                {imageFiles.developedAmenities.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);
                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("developedAmenities", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                newProperty.propertyCategory === "CommercialPlot" ||
                newProperty.propertyCategory === "NewPlot" ||
                newProperty.propertyCategory === "FarmLand"
                  ? "hidden"
                  : selectedImageType === "Side View"
                  ? "block"
                  : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Side View
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {sideViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "sideView")}
                  className="hidden"
                  id="sideViewImages"
                />
                <label
                  htmlFor="sideViewImages"
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
                {imageFiles.sideView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("sideView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                newProperty.propertyCategory === "CommercialPlot" ||
                newProperty.propertyCategory === "NewPlot" ||
                newProperty.propertyCategory === "FarmLand"
                  ? "hidden"
                  : selectedImageType === "Hall View"
                  ? "block"
                  : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Hall View
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {hallViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "hallView")}
                  className="hidden"
                  id="hallViewImages"
                />
                <label
                  htmlFor="hallViewImages"
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
                {imageFiles.hallView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("hallView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                newProperty.propertyCategory === "CommercialPlot" ||
                newProperty.propertyCategory === "NewPlot" ||
                newProperty.propertyCategory === "FarmLand" ||
                newProperty.propertyCategory === "IndustrialSpace" ||
                newProperty.propertyCategory === "RentalShop"
                  ? "hidden"
                  : selectedImageType === "Kitchen View"
                  ? "block"
                  : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Kitchen View
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {kitchenViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "kitchenView")}
                  className="hidden"
                  id="kitchenViewImages"
                />
                <label
                  htmlFor="kitchenViewImages"
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
                {imageFiles.kitchenView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("kitchenView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                newProperty.propertyCategory === "CommercialPlot" ||
                newProperty.propertyCategory === "NewPlot" ||
                newProperty.propertyCategory === "FarmLand" ||
                newProperty.propertyCategory === "IndustrialSpace" ||
                newProperty.propertyCategory === "RentalShop"
                  ? "hidden"
                  : selectedImageType === "Bedroom View"
                  ? "block"
                  : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Bedroom View
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {bedroomViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "bedroomView")}
                  className="hidden"
                  id="bedroomViewImages"
                />
                <label
                  htmlFor="bedroomViewImages"
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
                {imageFiles.bedroomView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("bedroomView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                newProperty.propertyCategory === "CommercialPlot" ||
                newProperty.propertyCategory === "NewPlot" ||
                newProperty.propertyCategory === "FarmLand" ||
                newProperty.propertyCategory === "IndustrialSpace" ||
                newProperty.propertyCategory === "RentalShop"
                  ? "hidden"
                  : selectedImageType === "Bathroom View"
                  ? "block"
                  : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Bathroom View
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {bathroomViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "bathroomView")}
                  className="hidden"
                  id="bathroomViewImages"
                />
                <label
                  htmlFor="bathroomViewImages"
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
                {imageFiles.bathroomView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("bathroomView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${
                newProperty.propertyCategory === "CommercialPlot" ||
                newProperty.propertyCategory === "NewPlot" ||
                newProperty.propertyCategory === "FarmLand"
                  ? "hidden"
                  : selectedImageType === "Balcony View"
                  ? "block"
                  : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Balcony View
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {balconyViewImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(`${URI}${image}`, "_blank");
                      }}
                      className="relative"
                    >
                      <img
                        src={`${URI}${image}`}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, "balconyView")}
                  className="hidden"
                  id="balconyViewImages"
                />
                <label
                  htmlFor="balconyViewImages"
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
                {imageFiles.balconyView.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);

                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage("balconyView", index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
            >
              Update Images
            </button>
            <Loader />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateImagesForm;
