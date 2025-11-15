import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useAuth } from "../store/auth";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Loader from "../components/Loader";

const statusClasses = {
  scheduled: "bg-blue-100 text-blue-600",
  canceled: "bg-red-100 text-red-600",
  completed: "bg-green-100 text-green-600",
  reschedule: "bg-gray-200 text-gray-500",
};

const CalendarScheduler = () => {
  const { URI } = useAuth();

  // Tabs
  const [tab, setTab] = useState("meetings");

  // Calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Meetings
  const [meetings, setMeetings] = useState([]);

  // Notes
  const [notes, setNotes] = useState([]);

  // Add / Edit Notes
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  // ---------------- Fetch Meetings ----------------
  const fetchMeetings = async () => {
    try {
      const response = await fetch(URI + "/sales/calender/meetings", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setMeetings(data);
    } catch (err) {
      console.error("Error fetching Meetings:", err);
    }
  };

  // ---------------- Fetch Notes ----------------
  const fetchNotes = async (selectedDate = null) => {
    try {
      let url = `${URI}/project-partner/calender/notes`;

      if (selectedDate) {
        url += `?date=${format(selectedDate, "yyyy-MM-dd")}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching Notes:", err);
    }
  };

  useEffect(() => {
    fetchMeetings();
    fetchNotes(selectedDate);
  }, []);

  // ---------------- Add / Update Note ----------------
  const saveNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const payload = {
      date: format(selectedDate, "yyyy-MM-dd"),
      note: newNote,
    };

    try {
      if (isEditing) {
        // UPDATE
        await fetch(
          `${URI}/project-partner/calender/note/update/${editNoteId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          }
        );
      } else {
        // ADD
        await fetch(URI + "/project-partner/calender/note/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }

      setNewNote("");
      setIsEditing(false);
      setEditNoteId(null);
      setShowNotePopup(false);
      fetchNotes(selectedDate);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // ---------------- Delete Note ----------------
  const deleteNote = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await fetch(
        `${URI}/project-partner/calender/note/delete/${noteId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      setNotes(notes.filter((n) => n.id !== noteId));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // ---------------- Edit Note ----------------
  const startEditNote = (note) => {
    setIsEditing(true);
    setEditNoteId(note.id);
    setNewNote(note.note);
    setShowNotePopup(true);
  };

  // ---------------- Meeting Status Logic ----------------
  const changeStatus = async (id, label) => {
    try {
      await fetch(`${URI}/sales/calender/meeting/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: label }),
      });

      fetchMeetings();
    } catch (err) {
      console.error("Error status change:", err);
    }
  };

  const ActionDropdown = ({ meeting }) => {
    return (
      <div className="relative inline-block">
        <button
          className={`px-3 py-1 rounded-full text-sm ${statusClasses[meeting.status]}`}
        >
          {meeting.status}
        </button>

        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => changeStatus(meeting.followupid, e.target.value)}
        >
          <option value="">Change</option>
          <option value="scheduled">Visit Scheduled</option>
          <option value="canceled">Visit Cancelled</option>
          <option value="completed">Visited</option>
        </select>
      </div>
    );
  };

  // ---------------- Calendar Dot Logic ----------------
  const tileContent = ({ date, view }) => {
    const dateStr = format(date, "yyyy-MM-dd");

    if (view === "month") {
      const hasMeeting = meetings.some(
        (m) =>
          format(new Date(m.visitdate), "yyyy-MM-dd") === dateStr
      );

      const hasNotes = notes.some((n) => n.date === dateStr);

      if (!hasMeeting && !hasNotes) return null;

      return (
        <div className="flex justify-center gap-1 mt-1">
          {hasMeeting && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
          {hasNotes && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
        </div>
      );
    }
  };

  const dailyMeetings = meetings.filter(
    (m) =>
      format(new Date(m.visitdate), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  const dailyNotes = notes.filter(
    (n) => n.date === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex w-full border-b bg-white">
        <button
          className={`w-1/2 p-3 font-semibold ${
            tab === "meetings" && "border-b-2 border-green-600 text-green-600"
          }`}
          onClick={() => setTab("meetings")}
        >
          Meetings
        </button>

        <button
          className={`w-1/2 p-3 font-semibold ${
            tab === "notes" && "border-b-2 border-green-600 text-green-600"
          }`}
          onClick={() => setTab("notes")}
        >
          Notes
        </button>
      </div>

      <div className="flex-1 flex gap-4 p-4">
        {/* Calendar */}
        <Calendar
          onChange={(d) => {
            setSelectedDate(d);
            fetchNotes(d);
          }}
          value={selectedDate}
          tileContent={tileContent}
          className="min-w-[300px] p-4 border rounded shadow"
        />

        {/* -------- NOTES TAB -------- */}
        {tab === "notes" && (
          <div className="w-full bg-white p-4 rounded shadow overflow-y-auto">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold">Notes</h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewNote("");
                  setShowNotePopup(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add Note +
              </button>
            </div>

            {dailyNotes.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">No notes today</p>
            ) : (
              dailyNotes.map((n) => (
                <div key={n.id} className="flex justify-between p-3 border-b">
                  <div>
                    <p className="text-sm text-gray-500">{n.date}</p>
                    <p>{n.note}</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      className="text-blue-600 font-semibold"
                      onClick={() => startEditNote(n)}
                    >
                      Edit
                    </button>

                    <MdDelete
                      className="text-red-500 w-6 h-6 cursor-pointer"
                      onClick={() => deleteNote(n.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* -------- MEETINGS TAB -------- */}
        {tab === "meetings" && (
          <div className="w-full bg-white p-4 rounded shadow overflow-y-auto">
            {dailyMeetings.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">No meetings today</p>
            ) : (
              dailyMeetings.map((meeting) => (
                <div
                  key={meeting.followupid}
                  className="flex justify-between p-4 border-b"
                >
                  <div>
                    <p className="text-sm text-gray-500">Project Visit</p>
                    <p className="font-semibold">
                      {format(new Date(meeting.visitdate), "MMM dd")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p>{meeting.customer}</p>
                    <p className="text-blue-500">{meeting.contact}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Remark</p>
                    <p>{meeting.remark}</p>
                  </div>

                  <ActionDropdown meeting={meeting} />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* -------- ADD / EDIT NOTE POPUP -------- */}
      {showNotePopup && (
        <div className="fixed bottom-0 w-full bg-white p-6 border rounded-t-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">
              {isEditing ? "Edit Note" : "Add Note"} –{" "}
              {format(selectedDate, "dd MMM yyyy")}
            </h2>

            <IoMdClose
              onClick={() => setShowNotePopup(false)}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <form onSubmit={saveNote}>
            <textarea
              rows={4}
              className="w-full p-3 border rounded"
              placeholder="Write note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={() => setShowNotePopup(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CalendarScheduler;