import React from "react";

const IncomeDetails = ({ formData, setFormData }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">
        Let’s get started with your EMI offer
      </h2>
      <p className="text-gray-500 mb-6">Enter details</p>

      {/* Employment Sector */}
      <div className="mb-4">
        <label className="font-medium block mb-2">Employment Sector:</label>
        <div className="flex gap-6">
          {["Private", "Government", "Proprietorship"].map((sector) => (
            <label key={sector} className="flex items-center gap-2">
              <input
                type="radio"
                name="employmentSector"
                value={sector}
                checked={formData.employmentSector === sector}
                onChange={(e) =>
                  setFormData({ ...formData, employmentSector: e.target.value })
                }
              />
              {sector}
            </label>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Years"
          className="border px-4 py-2 w-full rounded"
          value={formData.workExpYears}
          onChange={(e) =>
            setFormData({ ...formData, workExpYears: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Months"
          className="border px-4 py-2 w-full rounded"
          value={formData.workExpMonths}
          onChange={(e) =>
            setFormData({ ...formData, workExpMonths: e.target.value })
          }
        />
      </div>

      {/* Salary Type */}
      <div className="mb-4">
        <label className="font-medium block mb-2">Salary Type:</label>
        <div className="flex gap-6">
          {["Account Transfer", "Cash"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="salaryType"
                value={type}
                checked={formData.salaryType === type}
                onChange={(e) =>
                  setFormData({ ...formData, salaryType: e.target.value })
                }
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Details */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Gross Pay"
          className="border px-4 py-2 w-full rounded"
          value={formData.grossPay}
          onChange={(e) =>
            setFormData({ ...formData, grossPay: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Net Pay"
          className="border px-4 py-2 w-full rounded"
          value={formData.netPay}
          onChange={(e) =>
            setFormData({ ...formData, netPay: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="PF Deduction"
          className="border px-4 py-2 w-full rounded"
          value={formData.pfDeduction}
          onChange={(e) =>
            setFormData({ ...formData, pfDeduction: e.target.value })
          }
        />
      </div>

      {/* Other Income */}
      <div className="mb-4">
        <label className="font-medium block mb-2">Other Income (if any):</label>
        <div className="flex flex-wrap gap-6">
          {["Co-applicant", "Rental Income"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="otherIncome"
                value={option}
                checked={formData.otherIncome === option}
                onChange={(e) =>
                  setFormData({ ...formData, otherIncome: e.target.value })
                }
              />
              {option}
            </label>
          ))}

          {/* Specify Option */}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="otherIncome"
              value="Specify"
              checked={formData.otherIncome === "Specify"}
              onChange={(e) =>
                setFormData({ ...formData, otherIncome: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Specify: __________"
              className="border-b px-2 outline-none w-40"
              disabled={formData.otherIncome !== "Specify"}
              value={formData.specifyText}
              onChange={(e) =>
                setFormData({ ...formData, specifyText: e.target.value })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;