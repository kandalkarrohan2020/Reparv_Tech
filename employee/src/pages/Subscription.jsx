import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/ActionSelect";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import EmployeeFilter from "../components/employee/EmployeeFilter";
import DataTable from "react-data-table-component";
import Loader from "../components/Loader";
import FormatPrice from "../components/FormatPrice";

const Subscription = () => {
  const {
    showSubscriptionForm,
    setShowSubscriptionForm,
    action,
    URI,
    setLoading,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSubscription, setNewSubscription] = useState({
    id: "",
    role: "",
    oneMonthPrice: "",
    threeMonthPrice: "",
    sixMonthPrice: "",
    oneYearPrice: "",
  });

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/subscription/pricing", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Subscriptions.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Add or update record
  const addOrUpdate = async (e) => {
    e.preventDefault();

    const endpoint = newSubscription.id ? `edit/${newSubscription.id}` : "add";
    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/subscription/pricing/${endpoint}`,
        {
          method: newSubscription.id ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSubscription),
        }
      );

      if (!response.ok) throw new Error("Failed to save Subscription.");

      if (newSubscription.id) {
        alert(`Subscription updated successfully!`);
      } else if (response.status === 202) {
        alert(`Subscription already Exit!!`);
      } else {
        alert(`Subscription added successfully!`);
      }

      setNewSubscription({
        id: "",
        role: "",
        oneMonthPrice: "",
        threeMonthPrice: "",
        sixMonthPrice: "",
        oneYearPrice: "",
      });

      setShowSubscriptionForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving :", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/subscription/pricing/${id}`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Subscriptions.");
      const data = await response.json();
      setNewSubscription(data);
      setShowSubscriptionForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Subscription?"))
      return;
    try {
      const response = await fetch(
        URI + `/admin/subscription/pricing/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Subscription deleted successfully!");

        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  // change status record
  const status = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to change this Subscription status?"
      )
    )
      return;

    try {
      const response = await fetch(
        URI + `/admin/subscription/pricing/status/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customStyles = {
    rows: {
      style: {
        padding: "5px 0px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#111827",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "#F9FAFB",
        backgroundColor: "#00000007",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#1F2937",
      },
    },
  };

  const columns = [
    {
      name: "SN",
      cell: (row, index) => (
        <div className="relative group flex items-center w-full">
          {/* Serial Number Box */}
          <span
            className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md cursor-pointer ${
              row.status === "Active"
                ? "bg-[#EAFBF1] text-[#0BB501]"
                : "bg-[#FFEAEA] text-[#ff2323]"
            }`}
          >
            {index + 1}
          </span>

          {/* Tooltip */}
          <div className="absolute w-[65px] text-center -top-12 left-[30px] -translate-x-1/2 px-2 py-2 rounded bg-black text-white text-xs hidden group-hover:block transition">
            {row.status === "Active" ? "Active" : "Inactive"}
          </div>
        </div>
      ),
      width: "70px",
    },
    {
      name: "Partner Role",
      selector: (row) => row.role,
      sortable: true,
      width: "180px",
    },
    {
      name: "Monthly Pricing",
      selector: (row) => <FormatPrice price={parseInt(row.oneMonthPrice)} />,
      minWidth: "150px",
    },
    {
      name: "3 Month Pricing",
      selector: (row) => <FormatPrice price={parseInt(row.threeMonthPrice)} />,
      minWidth: "150px",
    },
    {
      name: "6 Month Pricing",
      selector: (row) => <FormatPrice price={parseInt(row.sixMonthPrice)} />,
      minWidth: "150px",
    },
    {
      name: "Yearly Pricing",
      selector: (row) => <FormatPrice price={parseInt(row.oneYearPrice)} />,
      minWidth: "150px",
    },

    {
      name: "Action",
      cell: (row) => (
        <ActionSelect
          statusAction={() => status(row.id)}
          editAction={() => edit(row.id)} // Dynamic edit route
          deleteAction={() => del(row.id)} // Delete function
        />
      ),
      width: "120px",
    },
  ];

  return (
    <div
      className={`Subscription overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="Subscription-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
        {/* <p className="block md:hidden text-lg font-semibold">Subscription</p> */}
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Subscription"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <AddButton label={"Add"} func={setShowSubscriptionForm} />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Subscription Pricing List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            customStyles={customStyles}
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={15}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
          />
        </div>
      </div>

      <div
        className={`${
          showSubscriptionForm ? "flex" : "hidden"
        } z-[61] SubscriptionForm overflow-scroll scrollbar-hide w-full fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full md:w-[500px] lg:w-[750px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Subscription Pricing</h2>
            <IoMdClose
              onClick={() => {
                setShowSubscriptionForm(false);
                setNewSubscription({
                  id: "",
                  role: "",
                  oneMonthPrice: "",
                  threeMonthPrice: "",
                  sixMonthPrice: "",
                  oneYearPrice: "",
                });
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addOrUpdate}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
              <input
                type="hidden"
                value={newSubscription.id || ""}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, id: e.target.value })
                }
              />
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Partner Role
                </label>
                <select
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none "
                  value={newSubscription.role}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Partner Role
                  </option>
                  <option value="Sales Partner">Sales Partner</option>
                  <option value="Project Partner">Project Partner</option>
                  <option value="Territory Partner">Territory Partner</option>
                  <option value="Onboarding Partner">Onboarding Partner</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Month Price
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="Enter One Month Pricing"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSubscription.oneMonthPrice}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      oneMonthPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Three Month Price
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="Enter Three Month Pricing"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSubscription.threeMonthPrice}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      threeMonthPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Six Month Price
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="Enter Six Month Pricing"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSubscription.sixMonthPrice}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      sixMonthPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Year Price
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="Enter One Year Pricing"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSubscription.oneYearPrice}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      oneYearPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowSubscriptionForm(false);
                  setNewSubscription({
                    id: "",
                    role: "",
                    oneMonthPrice: "",
                    threeMonthPrice: "",
                    sixMonthPrice: "",
                    oneYearPrice: "",
                  });
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                {action}
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
