import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Default theme
import calender from "../assets/overview/calender.svg";

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
    getValue: () => [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)],
  },
  {
    label: "Set up",
    getValue: () => [new Date(), new Date()],
  },
];

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CustomDateRangePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [selectedShortcut, setSelectedShortcut] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleShortcutClick = (shortcut) => {
    const [startDate, endDate] = shortcut.getValue();
    setSelectedShortcut(shortcut.label);
    setRange([{ startDate, endDate, key: "selection" }]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Date Range Selector Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="date-selector min-w-[187px] h-[36px] flex items-center justify-between  border border-[#0000001A] rounded-[8px] py-2 px-3 text-sm text-black font-semibold cursor-pointer"
        >
          <p>
            {range[0].startDate && range[0].endDate
              ? `${formatDate(range[0].startDate)} - ${formatDate(range[0].endDate)}`
              : "Select Date Range"}
          </p>
          <img src={calender} alt="" />
        </button>

        {/* Dropdown Calendar */}
        {isOpen && (
          <div className="absolute top-[51px] right-[-25px] bg-white shadow-[#00000040] border-[2px] border-white rounded-lg overflow-hidden w-[800px] z-10">
            {/* Body */}
            <div className="flex">
              {/* Shortcuts Menu */}
              <div className="w-[160px] bg-gray-50 border-r p-2">
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
                      className="cursor-pointer "
                    />
                    <span className="text-sm">{shortcut.label}</span>
                  </div>
                ))}
              </div>

              {/* Date Range Picker */}
                <div className="p-4">
                  <DateRange
                    className="w-[580px] h-[300px]"
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
            <div className="flex items-center justify-end gap-6 p-3 border-t bg-white">
              <button
                className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => {setIsOpen(false),range[0].startDate=null,range[0].endDate=null}}
              >
                Cancel
              </button>
              <button
                className="px-3 mr-9 py-1 text-white text-sm bg-green-500 rounded-md hover:bg-green-600"
                onClick={() => {
                  console.log("Applied", range);
                  setIsOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDateRangePicker;
