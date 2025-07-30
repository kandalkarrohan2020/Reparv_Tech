import React from "react";
import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../store/auth";
import CustomDateRangePicker from "../CustomDateRangePicker";
import AddButton from "../AddButton";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../Loader";
import DownloadCSV from "../DownloadCSV";
import FormatPrice from "../FormatPrice";
import TableFilter from "./tableFilter";
import { BsBagCheckFill } from "react-icons/bs";
import { BsBagPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const Products = ({ selectedTable, setSelectedTable }) => {
  const {
    URI,
    user,
    setLoading,
    showProduct,
    setShowProduct,
    showProductForm,
    setShowProductForm,
    showOrders,
    setShowOrders,
    showOrderForm,
    setShowOrderForm,
  } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState({});
  const [productSizeList, setProductSizeList] = useState([]);
  const [productId, setProductId] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [newOrder, setNewOrder] = useState({
    role: "Project Partner",
    productSize: "",
    sellingPrice: "",
    orderQuantity: "",
  });

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/brand-accessories/products", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch product.");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Fetch Orders from API by Using Id
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        URI + "/admin/brand-accessories/partner/orders",
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch product.");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const fetchProduct = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/brand-accessories/product/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch product.");
      const data = await response.json();

      setProduct(data);
      setShowOrderForm(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // Fetch Product Size
  const fetchProductSize = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/brand-accessories/product/size/list/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch product sizes.");
      const data = await response.json();
      console.log(data);
      setProductSizeList(data);
    } catch (err) {
      console.error("Error fetching Product Sizes:", err);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${URI}/admin/brand-accessories/product/buy/${productId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (response.status === 409) {
        alert("Order already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to place order. Status: ${response.status}`);
      } else {
        alert("Order Placed Successfully");

        setNewOrder({});

        setShowOrderForm(false);
        await fetchData();
      }
    } catch (err) {
      console.error("Error Placing Order:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Order
  const cancelOrder = async (id) => {
    if (!window.confirm("Are You Sure to Cancel this Order ?")) return;

    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/brand-accessories/product/order/cancel/${id}`,
        {
          method: "DELETE",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Order Canceled successfully!");
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error Cancelling Order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      setNewOrder((prev) => ({
        ...prev,
        role: "Project Partner",
        sellingPrice: product?.sellingPrice || "",
        gstPercentage: product?.gstPercentage || "",
        productId: product?.productId || "",
      }));
    }
  }, [product]);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = products.filter((item) => {
    const matchesSearch = item.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    const itemDate = parse(
      item.created_at,
      "dd MMM yyyy | hh:mm a",
      new Date()
    );

    const matchesDate =
      (!startDate && !endDate) ||
      (startDate && endDate && itemDate >= startDate && itemDate <= endDate);

    return matchesSearch && matchesDate;
  });

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
            className={`min-w-6 flex items-center justify-center px-2 py-1 border rounded-md cursor-pointer ${
              row.productQuantity > 0
                ? "bg-[#EAFBF1] text-[#0BB501]"
                : "bg-[#FFEAEA] text-[#ff2323]"
            }`}
          >
            {index + 1}
          </span>

          {/* Tooltip */}
          <div className="absolute w-[65px] text-center -top-12 left-[30px] -translate-x-1/2 px-2 py-2 rounded bg-black text-white text-xs hidden group-hover:block transition">
            {row.totalQuantity > 0 ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      ),
      width: "70px",
    },
    {
      name: "Buy Now",
      cell: (row) => (
        <div
          onClick={() => {
            setProductId(row.productId);
            fetchProductSize(row.productId);
            fetchProduct(row.productId);
          }}
          className="orderButton z-10 px-2 lg:px-4 py-1 cursor-pointer flex items-center justify-center gap-1 border rounded-md bg-[#EAFBF1] text-green-600 font-semibold text-[12px] leading-5 active:scale-[0.98]"
        >
          {" "}
          <p>{"Buy"}</p>
          <BsBagPlusFill className="text-[13px]" />
        </div>
      ),
      width: "120px",
    },
    {
      name: "Image",
      cell: (row) => {
        let imageSrc =
          URI + row.productImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
        return (
          <div className="w-[110px] h-[62px] overflow-hidden flex items-center justify-center rounded-xl border">
            <img
              src={imageSrc}
              alt="productImage"
              onClick={() => {
                window.open(`${URI}${row.productImage}`, "_blank");
              }}
              className="w-full h-[100%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "150px",
    },

    {
      name: "Product",
      selector: (row) => row.productName,
      sortable: true,
      minWidth: "180px",
      maxWidth: "200px",
    },

    {
      name: "GST %",
      selector: (row) => row.gstPercentage + "%",
      width: "100px",
    },

    {
      name: "Unit Price",
      selector: (row) => <FormatPrice price={row.sellingPrice} />,
      minWidth: "100px",
      maxWidth: "150px",
    },

    {
      name: "Total Price",
      selector: (row) => <FormatPrice price={row.totalPrice} />,
      minWidth: "100px",
      maxWidth: "150px",
    },

    {
      name: "Available",
      selector: (row) => <p>{row.totalQuantity} Units</p>,
      minWidth: "150px",
    },
  ];

  return (
    <div
      className={`overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between gap-1 sm:gap-3">
          <TableFilter
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
            <div
              onClick={() => {
                //fetchOrders();
                //setShowOrders(true);
              }}
              className="orderButton z-10 px-2 lg:px-4 py-[6px] cursor-pointer flex items-center justify-center gap-2 border border-[#00000033] rounded-md bg-[#076300] font-semibold text-4 leading-5 text-[#FFFFFF] active:scale-[0.98]"
            >
              {" "}
              <p className="hidden lg:block">{"Cart"}</p>
              <BsCartCheckFill />
            </div>
          </div>
        </div>

        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] border rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Product"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <div className="block">
                <CustomDateRangePicker range={range} setRange={setRange} />
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Product List</h2>
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

      {/* View Product and Stock List */}
      <div
        className={`${
          showProduct ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[550px] max-h-[80vh] bg-white py-8 pb-10 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Product & Stock List</h2>

            <IoMdClose
              onClick={() => {
                setShowProduct(false);
                setProduct({});
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          {/* Product Image and Info */}

          <div className="w-full flex gap-4 items-center">
            <div>
              <img
                src={`${URI}${product?.productImage}`}
                alt="Product"
                className="w-[140px] h-[90px] object-cover rounded-md border"
              />
            </div>

            <div className="w-[250px] flex flex-col space-y-2">
              <h2 className="ml-2 text-base font-semibold text-gray-800">
                {product?.productName || "T-shirts"}
              </h2>

              <p className="bg-gray-100 px-2 py-[2px] text-xs text-gray-700 font-semibold rounded break-words whitespace-pre-wrap">
                {product?.productDescription?.slice(0, 50) +
                  (product?.productDescription?.length > 50 ? "..." : "")}
              </p>
            </div>
          </div>

          {/* Stock List View */}
          <div className="w-full flex items-center justify-between">
            <h1 className="my-3 text-base font-semibold ">Stock List</h1>
            <h1 className="my-3 text-base font-semibold ">
              {product?.availableQuantity + " Units"}
            </h1>
          </div>
        </div>
      </div>

      <div
        className={`${
          showOrderForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[500px] lg:w-[750px] max-h-[85vh] bg-white py-8 pb-10 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Place Order</h2>

            <IoMdClose
              onClick={() => {
                setShowOrderForm(false);
                setNewOrder({
                  productId: "",
                  orderQuantity: "",
                });
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          {/* Product View */}
          <div className="grid gap-2 lg:gap-3 grid-cols-1 lg:grid-cols-2">
            <div className={`w-full `}>
              <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                Product Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={product?.productName || ""}
                readOnly
              />
            </div>

            <div className={`w-full `}>
              <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                GST Percentage
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={product?.gstPercentage + "%"}
                readOnly
              />
            </div>

            <div className={`w-full `}>
              <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                Price per Unit
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={product?.sellingPrice + " Rs"}
                readOnly
              />
            </div>

            <div className={`w-full `}>
              <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                Available Quantity
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={product?.totalQuantity + " Units"}
                readOnly
              />
            </div>
          </div>

          <form onSubmit={placeOrder}>
            <div className="mt-4 grid gap-2 lg:gap-3 grid-cols-1 lg:grid-cols-2">
              <input type="hidden" value={product?.productId || ""} readOnly />

              <div className="w-full">
                <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                  Product Size
                </label>
                <select
                  name="productSize"
                  required
                  className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-700 appearance-none"
                  value={newOrder?.productSize || ""}
                  onChange={(e) => {
                    setNewOrder({ ...newOrder, productSize: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    Select Product Size
                  </option>
                  {productSizeList?.map((item, index) => (
                    <option key={index} value={item.productSize}>
                      {item.productSize}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`w-full `}>
                <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                  Product Quantity
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter Product Quantity"
                  className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-700"
                  value={newOrder?.orderQuantity || ""}
                  onChange={(e) => {
                    setNewOrder({ ...newOrder, orderQuantity: e.target.value });
                  }}
                />
              </div>

              <div className={`w-full `}>
                <label className="block ml-1 text-sm leading-4 text-[#00000066] font-medium">
                  Total Price with GST
                </label>
                <input
                  type="text"
                  disabled
                  className="w-full mt-[8px] mb-1 text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    (newOrder?.orderQuantity *
                      product?.sellingPrice *
                      product?.gstPercentage) /
                      100 +
                    newOrder?.orderQuantity * product?.sellingPrice +
                    " Rs"
                  }
                  viewOnly
                />
              </div>
            </div>
            <div className="flex h-10 mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowProductForm(false);
                  setNewOrder({
                    productId: "",
                    orderQuantity: "",
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
                Place Order
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`${
          showOrders ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[550px] max-h-[80vh] bg-white py-8 pb-10 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Order List</h2>

            <IoMdClose
              onClick={() => {
                setShowOrders(false);
                setNewOrder({
                  productId: "",
                  orderQuantity: "",
                });
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          {/* orderList View */}
          <div className="grid grid-cols-1 gap-4">
            {orders?.length > 0 ? (
              orders?.map((order) => (
                <div className="w-full max-w-[500px] p-4 border rounded-xl bg-white shadow-sm space-y-2">
                  {/* Product Image and Info */}
                  <div className="flex h-[90px] gap-4 justify-between">
                    <div className="flex gap-4 items-center">
                      <img
                        src={`${URI}${order?.productImage}`}
                        alt="Product"
                        className="w-[120px] h-[80px] object-cover rounded-md border"
                      />

                      <div className="flex flex-col space-y-1">
                        <h2 className="text-base font-semibold text-gray-800">
                          {order?.productName || "T-Shirt"}
                        </h2>
                        <p className="text-xs font-medium text-gray-700">
                          Order ID :{" "}
                          <span className="bg-[#EAFBF1] text-[#0BB501] font-semibold px-1 py-0.5 rounded">
                            {order?.orderId || 142}
                          </span>
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="bg-gray-100 font-semibold rounded">
                            {order?.created_at}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="p-1">
                      <MdCancel
                        onClick={cancelOrder}
                        className="w-5 h-5 md:w-6 mdLh-6 text-red-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-start gap-2 px-4 py-1 border rounded-md">
                    <h2 className="text-sm font-semibold ">Order Status : </h2>
                    <span className="bg-[#EAFBF1] text-[#0BB501] text-[12px] font-semibold px-1 py-0.5 rounded">
                      {order?.status || "New"}
                    </span>
                  </div>

                  {/* Order Details */}
                  <div className="grid p-2 grid-cols-2 md:grid-cols-3 gap-4 text-sm font-semibold text-gray-700">
                    <div>
                      <p className="font-medium text-xs text-gray-400">
                        Quantity
                      </p>
                      <p className="font-semibold ">
                        {order?.orderQuantity || 0} Units
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-xs text-gray-400">GST</p>
                      <p className="font-semibold ">
                        {order?.gstPercentage || "18%"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-xs text-gray-400">
                        Total Price
                      </p>
                      <p className="font-semibold ">
                        <FormatPrice
                          price={
                            parseInt(
                              order?.totalPrice * order?.orderQuantity
                            ) || 0
                          }
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-semibold">{"Orders Not Found"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
