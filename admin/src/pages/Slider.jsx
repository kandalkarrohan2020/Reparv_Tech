import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../components/Loader";

const Slider = () => {
  const { showSliderForm, setShowSliderForm, URI, setLoading } = useAuth();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/slider", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch slider Images.");
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Slider Images Uploader
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  //Add Images
  const addImages = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/slider/addimages`, {
        method: "POST",
        credentials: "include",
        body: formData, // FormData allows file uploads
      });

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        alert("Images Uploaded Successfully!");
      }

      // Reset after upload
      setImages([]);
      setShowSliderForm(false);
      await fetchData();
    } catch (err) {
      console.error("Error saving Slider Images:", err);
    }
    finally {
      setLoading(false);
    }
  };

  // Delete Image
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Slider Image?"))
      return;
  
    try {
      const response = await fetch(URI + `/admin/slider/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Slider image deleted successfully!");

        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting :", error);
    }
    finally {
      setLoading(false);
    }
  };

  // change status record
  const status = async (id) => {
    if (!window.confirm("Are you sure you want to change this image status?"))
      return;

    try {
      const response = await fetch(URI + `/admin/slider/status/${id}`, {
        method: "PUT",
        credentials: "include",
      });
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

  const filteredData = data.filter((item) =>
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, width:"50px" },
    {
      name: "Images",
      cell: (row) => (
        <div
          className={`w-[300px] h-[80px] lg:h-[120px] xl:h-[150px] overflow-hidden flex items-center justify-center`}
        >
          <img
            src={`${URI}/uploads/${row.image}`}
            alt="Image"
            className="w-[300px] h-[90%] object- cursor-pointer"
          />
        </div>
      ), minWidth:"300px"
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
      ), minWidth:"130px"
    },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />, minWidth:"120px"
    },
  ];

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "status":
          status(id);
          break;
        case "delete":
          del(id);
          break;
        default:
          console.log("Invalid action");
      }
    };

    return (
      <div className="relative inline-block w-[120px]">
        <div className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className=" text-[12px]">{selectedAction || "Action"}</span>
          <FiMoreVertical className="text-gray-500" />
        </div>
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          value={selectedAction}
          onChange={(e) => {
            const action = e.target.value;
            handleActionSelect(action, row.id);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="status">Status</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={`slider overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div
        className={`flex role-table w-full h-[80vh] flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]`}
      >
        <p className="block md:hidden text-lg font-semibold">Slider</p>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Image"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <AddButton label={"Add"} func={setShowSliderForm} />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Slider Images List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable columns={columns} data={filteredData} pagination />
        </div>
      </div>

      <div
        className={`${
          showSliderForm ? "flex" : "hidden"
        } z-[61] sliderForm overflow-scroll scrollbar-hide fixed`}
      >
        <div className="w-[330px] sm:w-[500px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Add Slider Images (1450px X 650px)</h2>
            <IoMdClose
              onClick={() => {
                setShowSliderForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form
            onSubmit={addImages}
            className="w-full grid gap-4 place-items-center grid-cols-1"
          >
            <div className="w-full">
              <div className="w-full mt-2">
                <input
                  type="file"
                  required
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                />
                <label
                  htmlFor="images"
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
                {images.map((image, index) => {
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
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                      {index === 0 && (
                        <p className="text-xs text-blue-500 text-center mt-1">
                          Main Image
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Upload Images
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Slider;
