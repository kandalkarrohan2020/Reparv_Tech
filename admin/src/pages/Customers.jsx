
import { useState, useEffect} from "react";
import { CiSearch } from "react-icons/ci";
import ActionSelect from "../components/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import DataTable from "react-data-table-component";
import { useAuth } from "../store/auth";
const Customers = () => {
 
  const {URI} = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDatas = async () => {
      try {
        const response = await fetch(URI+"/customers", {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch customers.");
        const data = await response.json();
        const itemsPerPage = 10;
        // Calculate total pages
        const totalPages = Math.ceil(data.length / itemsPerPage);
        //Get data for the current page
        const currentData = data.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
        const emptyRows = itemsPerPage - currentData.length;
        setDatas(data);
      } catch (err) {
        console.error("Error fetching builders:", err);
      }
    };

    const filteredData = datas.filter((item) =>
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.budget.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) 
    
    );
    const columns = [
      { name: "SN", selector: (row, index) => index + 1, sortable: true },
      { name: "Customer", selector: (row) => row.customer, sortable: true },
      { name: "Contact", selector: (row) => row.contact, sortable: true },
      { name: "Email", selector: (row) => row.email,sortable: true },
      { name: "Property Type", selector: (row) => row.property_type,sortable: true },
      { name: "Location", selector: (row) => row.location,sortable: true },
      { name: "Budget", selector: (row) => row.budget,sortable: true },
      { name: "Status", 
        cell: (row) => (
          <span className={`px-2 py-1 rounded-md ${row.status === "Active" ? "bg-[#EAFBF1] text-[#0BB501]" : "bg-[#FBE9E9] text-[#FF0000]"}`}>
            {row.status}
          </span>
        )},
      { 
        name: "", 
        cell: (row) => 
          <ActionSelect 
            // statusAction={() =>status(row.salespersonsid)}
            editAction={() =>edit(row.salespersonsid)}  // Dynamic edit route
            deleteAction={() => del(row.salespersonsid)} // Delete function
          />
        
        
      }
    ];

    useEffect(() => {
        fetchDatas();
      }, []);
    const handleMethod = () => {
      console.log("add");
    };
  

  return (
    <div className="customers overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="customers-table w-full h-[578px] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
      <p className="block md:hidden text-lg font-semibold">Customers</p>
        <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full sm:w-1/2 min-w-[307px] sm:h-[36px] flex justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <FilterData />
              <CustomDateRangePicker />
            </div>
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Customers List</h2>
        <div className="overflow-scroll scrollbar-hide">
        <DataTable columns={columns} data={filteredData} pagination />
        </div>
      </div>

    </div>
  );
};

export default Customers;
