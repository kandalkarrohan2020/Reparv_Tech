import React, { useState } from "react";
import { DateRange } from "react-date-range";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Default theme

const shortcutsItems = [
  { label: "Today", getValue: () => [new Date(), new Date()] },
  {
    label: "This week",
    getValue: () => [startOfWeek(new Date()), endOfWeek(new Date())],
  },
  {
    label: "This month",
    getValue: () => [startOfMonth(new Date()), endOfMonth(new Date())],
  },
  {
    label: "This year",
    getValue: () => [new Date(new Date().getFullYear(), 0, 1), new Date()],
  },
  {
    label: "Set up",
    getValue: () => [new Date(), new Date()],
  },
];

const CustomDateRangePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedShortcut, setSelectedShortcut] = useState(null);

  const handleShortcutClick = (shortcut) => {
    const [startDate, endDate] = shortcut.getValue();
    setSelectedShortcut(shortcut.label);
    setRange([{ startDate, endDate, key: "selection" }]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[950px]">
        {/* Header */}
        <div className="p-4 border-b bg-gray-800 text-white font-semibold text-lg">
          Calendar
        </div>

        {/* Body */}
        <div className="flex">
          {/* Shortcuts Menu */}
          <div className="w-1/4 bg-gray-50 border-r p-2">
            {shortcutsItems.map((shortcut, index) => (
              <div
                key={index}
                onClick={() => handleShortcutClick(shortcut)}
                className={`p-3 cursor-pointer flex items-center gap-2 rounded-md hover:bg-green-50 ${
                  selectedShortcut === shortcut.label
                    ? "bg-green-100 text-green-600 font-semibold"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="shortcut"
                  checked={selectedShortcut === shortcut.label}
                  readOnly
                  className="cursor-pointer"
                />
                <span className="text-sm">{shortcut.label}</span>
              </div>
            ))}
          </div>

          {/* Date Range Picker */}
          <div className="w-3/4 p-4">
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              rangeColors={["#16a34a"]}
              editableDateInputs={true}
              showDateDisplay={false}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => console.log("Cancelled")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => console.log("Applied", range)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDateRangePicker;