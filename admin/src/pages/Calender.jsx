import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import CustomDateRangePicker from "../components/CustomDateRangePicker";

const statusClasses = {
  scheduled: "bg-blue-100 text-blue-600",
  canceled: "bg-red-100 text-red-600",
  completed: "bg-green-100 text-green-600",
  reschedule: "bg-gray-200 text-gray-500",
};

const CalendarScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    {
      date: "2025-03-06",
      project: "Siddhivinayak",
      client: "Pawan",
      phone: "9876543210",
      salesPerson: "Reparv",
      status: "scheduled",
    },
    {
      date: "2025-03-23",
      project: "Siddhivinayak",
      client: "Pawan",
      phone: "9876543210",
      salesPerson: "Reparv",
      status: "canceled",
    },
    {
      date: "2025-03-21",
      project: "Siddhivinayak",
      client: "Pawan",
      phone: "9876543210",
      salesPerson: "Reparv",
      status: "completed",
    },
    {
      date: "2025-02-21",
      project: "Siddhivinayak",
      client: "Pawan",
      phone: "9876543210",
      salesPerson: "Reparv",
      status: "reschedule",
    },
  ]);

  // Add meeting status dots
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = format(date, "yyyy-MM-dd");
      const meeting = meetings.find((meeting) => meeting.date === dateString);

      if (meeting) {
        return (
          <div
            className={`w-2 h-2 rounded-full mx-auto ${
              meeting.status === "scheduled"
                ? "bg-blue-500"
                : meeting.status === "canceled"
                ? "bg-red-500"
                : meeting.status === "reschedule"
                ? "bg-gray-500"
                : meeting.status === "completed"
                ? "bg-green-500"
                : ""
            }`}
          ></div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calender overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start ">
      <div className=" calender w-full h-[578px] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="w-full flex items-end justify-end px-2">
          <CustomDateRangePicker />
        </div>
        <div className="overflow-scroll scrollbar-hide w-full flex gap-6 h-[80vh]">
          {/* Calendar Section */}
          <div>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              locale="en-US"
              tileContent={tileContent}
              showNeighboringMonth={false} // 🔥 Hides previous & next month dates
              formatShortWeekday={(locale, date) => format(date, "E").charAt(0)}
              className="min-w-[300px] rounded-lg border border-gray-300 p-4 w-full shadow-md"
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const today = new Date();
                  const isToday =
                    format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

                  if (isToday) {
                    return "border-2 border-green-500 bg-transparent font-bold text-black";
                  }
                }
                return "";
              }}
            />
          </div>

          {/* Meetings List Section */}
          <div className="w-full min-w-[761px] max-w-6xl bg-white p-4 ">
            {meetings
              .filter(
                (meeting) => meeting.date === format(selectedDate, "yyyy-MM-dd")
              )
              .map((meeting, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 border-b"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gray-500">Project Visit</span>
                    <p className="text-xl font-semibold">
                      {format(new Date(meeting.date), "MMM dd")}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gray-500">Project Name</span>
                    <p className="font-semibold">{meeting.project}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs text-gray-500 mb-2">
                      Client Name
                    </span>
                    <p className="font-semibold">{meeting.client}</p>
                    <p className="text-blue-500 cursor-pointer">
                      {meeting.phone}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gray-500">
                      Sales Person Name
                    </span>
                    <p className="font-semibold">{meeting.salesPerson}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gray-500">Remark</span>
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${
                        statusClasses[meeting.status]
                      } font-semibold`}
                    >
                      {meeting.status === "scheduled"
                        ? "Visit Schedule"
                        : meeting.status === "canceled"
                        ? "Visit Cancelled"
                        : meeting.status === "reschedule"
                        ? "Visit Reschedule"
                        : meeting.status === "completed"
                        ? "Visited"
                        : ""}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarScheduler;
