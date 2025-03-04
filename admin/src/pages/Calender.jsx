import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const visitData = [
  { date: "2025-01-21", project: "Siddhivinayak", client: "Pawan", phone: "9876543210", salesPerson: "Reparv", status: "visited" },
  { date: "2025-02-21", project: "Siddhivinayak", client: "Pawan", phone: "9876543210", salesPerson: "Reparv", status: "cancelled" },
  { date: "2025-01-28", project: "Siddhivinayak", client: "Pawan", phone: "9876543210", salesPerson: "Reparv", status: "scheduled" },
];

const statusColors = {
  visited: "bg-green-500 text-white",
  cancelled: "bg-red-500 text-white",
  scheduled: "bg-yellow-500 text-white",
};

const CalendarScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = format(new Date(), "yyyy-MM-dd");

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = format(date, "yyyy-MM-dd");
      const visit = visitData.find((v) => v.date === dateString);
      if (dateString === today) {
        return <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white">{date.getDate()}</div>;
      }
      if (visit) {
        return <div className={`w-2 h-2 rounded-full mx-auto ${statusColors[visit.status]}`}></div>;
      }
    }
    return null;
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Calendar Section */}
      <div className="w-1/3 p-4 bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <FaChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">{format(selectedDate, "yyyy MMM")}</h2>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          className="border-none w-full"
        />
      </div>

      {/* Visit Schedule Section */}
      <div className="w-2/3 bg-white p-4 rounded-2xl shadow-md overflow-y-auto">
        {visitData.map((visit, index) => (
          <div key={index} className="flex justify-between items-center p-3 border-b">
            <div>
              <p className="text-lg font-semibold">{format(new Date(visit.date), "MMM dd")}</p>
              <p className="text-sm text-gray-600">{visit.project}</p>
            </div>
            <div>
              <p className="font-semibold">{visit.client}</p>
              <p className="text-blue-500 cursor-pointer">{visit.phone}</p>
            </div>
            <p className="font-semibold">{visit.salesPerson}</p>
            <button
              className={`px-3 py-1 rounded-full text-sm ${statusColors[visit.status]} opacity-90`}
            >
              {visit.status === "visited" ? "Visited" : visit.status === "cancelled" ? "Visit Cancelled" : "Visit Scheduled"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarScheduler;
