import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useAuth } from "../../store/auth";
import { IoMdClose } from "react-icons/io";
import Loader from "../Loader";

const MultiStepForm = ({
  fetchData,
  newProperty,
  setPropertyData,
  imageFiles,
  setImageFiles,
  builderData,
  states, cities,
}) => {
  const { URI, setLoading, showPropertyForm, setShowPropertyForm } = useAuth();
  const [step, setStep] = useState(1);
  const [nextButton, setNextButton] = useState(false);

  const steps = ["Property Details", "Overview Details", "Add Images"];

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Add all text fields
    Object.entries(newProperty).forEach(([key, value]) => {
      formData.append(key, value);
    });

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

    const endpoint = newProperty.propertyid
      ? `edit/${newProperty.propertyid}`
      : "add";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/properties/${endpoint}`, {
        method: newProperty.propertyid ? "PUT" : "POST",
        credentials: "include",
        body: formData, // Use FormData instead of JSON
      });

      if (response.status === 409) {
        alert("Property already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        alert(
          newProperty.propertyid
            ? "Property updated successfully!"
            : "Property added successfully!"
        );
      }

      // Clear form after successful response
      setPropertyData({
        propertyid: "",
        builderid: "",
        propertyCategory: "",
        propertyApprovedBy: "",
        propertyName: "",
        address: "",
        state:"",
        city: "",
        pincode:"",
        location: "",
        distanceFromCityCenter: "",
        totalSalesPrice: "",
        totalOfferPrice: "",
        stampDuty: "",
        registrationFee: "",
        gst: "",
        advocateFee: "",
        msebWater: "",
        maintenance: "",
        other: "",
        propertyType: "",
        builtYear: "",
        ownershipType: "",
        builtUpArea: "",
        carpetArea: "",
        parkingAvailability: "",
        totalFloors: "",
        floorNo: "",
        loanAvailability: "",
        propertyFacing: "",
        reraRegistered: "",
        furnishing: "",
        waterSupply: "",
        powerBackup: "",
        locationFeature: "",
        sizeAreaFeature: "",
        parkingFeature: "",
        terraceFeature: "",
        ageOfPropertyFeature: "",
        furnishingFeature: "",
        amenitiesFeature: "",
        propertyStatusFeature: "",
        floorNumberFeature: "",
        smartHomeFeature: "",
        securityBenefit: "",
        primeLocationBenefit: "",
        rentalIncomeBenefit: "",
        qualityBenefit: "",
        capitalAppreciationBenefit: "",
        ecofriendlyBenefit: "",
      });
      setStep(1);
      setShowPropertyForm(false);
      await fetchData();
    } catch (err) {
      console.error("Error saving property:", err);
      if (err.response?.data?.error) {
        alert("Upload failed: " + err.response.data.error);
      } else {
        alert("please check empty fields or try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkButton = () => {
    if (step === 1 && newProperty.other != "") {
      setNextButton(true);
    } else if (step === 2 && newProperty.ecofriendlyBenefit != "") {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  };

  useEffect(() => {
    checkButton();
  }, [newProperty]);

  return (
    <div
      className={`${
        showPropertyForm ? "flex" : "hidden"
      } z-[61] property-form  w-[400px] h-[80vh] md:w-[500px] lg:w-[700px] xl:w-[1000px] fixed`}
    >
      <div className="w-[330px] sm:w-[600px] md:w-[500px] lg:w-[700px] xl:w-[1000px] bg-white py-8 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Add Property</h2>

          {/* Step Indicator */}

          {steps.map((label, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <div
                className={`mx-auto w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${
                  step === index + 1
                    ? "bg-blue-600 text-white"
                    : step > index + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </div>
              <span className="hidden xl:block">{label}</span>
            </div>
          ))}

          {/* Close Button */}
          <IoMdClose
            onClick={() => {
              setShowPropertyForm(false);
            }}
            className="w-7 h-7 cursor-pointer"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleFinalSubmit}>
          <input
            type="hidden"
            value={newProperty.propertyid}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyid: e.target.value,
              })
            }
          />
          {step === 1 && (
            <StepOne
              newProperty={newProperty}
              setPropertyData={setPropertyData}
              builderData={builderData}
              states={states}
              cities={cities}
            />
          )}
          {step === 2 && (
            <StepTwo
              newProperty={newProperty}
              setPropertyData={setPropertyData}
            />
          )}
          {step === 3 && (
            <StepThree
              newProperty={newProperty}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          )}

          {/* Buttons Inside Form Container */}
          <div className="flex justify-end gap-4 p-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 text-white bg-gray-500 rounded active:scale-[0.98]"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextButton == true && nextStep}
                className={`${
                  nextButton == true
                    ? "active:scale-[0.98] bg-blue-600"
                    : "bg-blue-400"
                } px-6 py-2 text-white  rounded `}
              >
                Next
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-green-600 rounded active:scale-[0.98]"
                >
                  Save
                </button>
                <Loader></Loader>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default MultiStepForm;
