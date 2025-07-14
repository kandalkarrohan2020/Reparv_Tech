import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/ActionSelect";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import Loader from "../components/Loader";
import { MdOutlineWidthFull } from "react-icons/md";

const ApkUpload = () => {
  const { showApkUploadForm, setShowApkUploadForm, action, URI, setLoading } =
    useAuth();
  const [apks, setApks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newApk, setNewApk] = useState({
    apkName: "",
    apkFile: null,
  });

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/apk", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch apps.");
      const data = await response.json();
      setApks(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Add or update record
  const addOrUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("apkName", newApk.apkName);
      if (newApk.apkFile) {
        formData.append("apkFile", newApk.apkFile);
      }

      const method = newApk.id ? "PUT" : "POST";
      const endpoint = newApk.id ? `edit/${newApk.id}` : "add";

      const response = await fetch(URI + `/admin/apk/${endpoint}`, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save apk.");

      if (newApk.id) {
        alert(`APK updated successfully!`);
      } else if (response.status === 202) {
        alert(`APK already exists!`);
      } else {
        alert(`APK added successfully!`);
      }

      setNewApk({
        apkName: "",
        apkFile: null,
      });
      setShowApkUploadForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/apk/${id}`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch apk.");
      const data = await response.json();
      setNewApk(data);
      setShowApkUploadForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this apk ?")) return;
    try {
      const response = await fetch(URI + `/admin/apk/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Apk deleted successfully!");

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
    if (!window.confirm("Are you sure you want to change this apk status?"))
      return;

    try {
      const response = await fetch(URI + `/admin/apk/status/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await response.json();
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

  const filteredData = apks.filter(
    (item) =>
      item.apkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    {
      name: "Apk Name",
      selector: (row) => row.apkName,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Apk File Name",
      selector: (row) => row.fileName,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Apk URL",
      selector: (row) => row.filePath,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.status === "Active"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FBE9E9] text-[#FF0000]"
          }`}
        >
          {row.status}
        </span>
      ),
      width: "120px",
    },
    {
      name: "",
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
  // const handleMethod = () => {
  //   console.log("add");
  // };

  return (
    <div
      className={`overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="role-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        {/* <p className="block md:hidden text-lg font-semibold">Role</p> */}
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Apk"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <AddButton label={"Add"} func={setShowApkUploadForm} />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Apk List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable columns={columns} data={filteredData} pagination />
        </div>
      </div>
      <div
        className={`${
          showApkUploadForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full fixed  bottom-0 md:bottom-auto`}
      >
        <div className="w-full md:w-[500px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Apk Upload</h2>
            <IoMdClose
              onClick={() => {
                setShowApkUploadForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <form onSubmit={addOrUpdate}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 ">
              <input
                type="hidden"
                value={newApk.id || ""}
                onChange={(e) => setNewApk({ ...newApk, id: e.target.value })}
              />

              {/* Apk Name Select */}
              <select
                required
                disabled={!!newApk.id} // disables during update
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none disabled:bg-[#f5f5f5] disabled:cursor-not-allowed"
                value={newApk.apkName}
                onChange={(e) =>
                  setNewApk({ ...newApk, apkName: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Apk Name
                </option>
                <option value="Customer">Customer</option>
                <option value="Sales Partner">Sales Partner</option>
                <option value="Project Partner">Project Partner</option>
                <option value="Territory Partner">Territory Partner</option>
                <option value="Onboarding Partner">Onboarding Partner</option>
              </select>

              {/* Apk File Upload */}
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Upload APK File
                </label>
                <input
                  type="file"
                  accept=".apk"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600"
                  onChange={(e) =>
                    setNewApk({ ...newApk, apkFile: e.target.files[0] })
                  }
                />
              </div>
            </div>

            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                onClick={() => {
                  setShowApkUploadForm(false);
                }}
                type="button"
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Upload Apk
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApkUpload;
