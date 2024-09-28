import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ManageSupplies = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const supplierID = Cookies.get("userID");

  const navigate = useNavigate();

  const navigateAddSupplies = () => {
    navigate("/addSupplies");
  };

  const navigateProfile = () => {
    navigate("/profileOther");
  };

  // Fetch supply orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/supplyOrder/orders/${supplierID}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching supply orders", error);
      }
    };
    fetchOrders();
  }, [supplierID]);

  // Delete order
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/supplyOrder/orders/${orderId}`
      );
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting order", error);
    }
  };

  // Generate PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.text("Supply Orders Report", 14, 20);

    // Prepare the data for the table
    const tableData = orders.map((order) => [
      order.ingredientName,
      order.quantity,
      order.status,
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    // Add table with autoTable plugin
    autoTable(doc, {
      head: [["Ingredient Name", "Quantity", "Status", "Date"]],
      body: tableData,
      startY: 30,
    });

    // Save the PDF
    doc.save("supply_orders_report.pdf");
  };

  return (
    <div className="relative min-h-screen font-poppins">
      {/* Background Image */}
      <img
        src={"../sup.jpg"}
        alt=""
        className="w-full h-[700px] opacity-100 blur-sm object-cover absolute top-0 left-0 z-0"
      />

      {/* Content Container - Positioned in the center of the image */}
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="lg:mt-0 mt-0">
          <div className="w-[1400px] h-[600px] rounded-3xl shadow-sm bg-gray-100 p-4">
            <div className="flex gap-6 ml-10">
              <button
                className="mt-8 w-32 h-10 rounded-full border-2 uppercase bg-slate-200 hover:bg-red-600 hover:text-white duration-300 z-10"
                onClick={generatePDFReport} // Add the report function here
              >
                Report
              </button>

              <button
                className="mt-8 w-32 h-10 rounded-full border-2 uppercase bg-slate-200 hover:bg-red-600 hover:text-white duration-300 z-10"
                onClick={navigateProfile}
                // Add the report function here
              >
                Profile
              </button>

              <button
                className="mt-8 w-32 h-10 rounded-full border-2  uppercase bg-slate-200 hover:bg-red-600 hover:text-white duration-300 z-10"
                onClick={navigateAddSupplies}
              >
                Add New
              </button>
            </div>
            <div className="flex justify-center items-center relative bottom-8">
              <div className="flex flex-col items-center">
                <h1 className="font-serif text-2xl opacity-70 mt-8 uppercase">
                  Supply List
                </h1>

                <form>
                  <div className="opacity-50">
                    <input
                      type="text"
                      placeholder="Search... "
                      className="w-[320px] h-10 mt-4 rounded-full shadow-xl border border-white bg-opacity-10 px-10 text-sm"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Scrollable section for supply list */}
            <div className="mt-8 ml-4 max-h-[300px] overflow-y-auto px-4">
              <section>
                {orders
                  .filter((order) =>
                    order.ingredientName
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  )
                  .map((order) => (
                    <div
                      key={order._id}
                      className="p-4 border-b-2 flex justify-between"
                    >
                      <div>
                        <p className="font-bold">{order.ingredientName}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Status: {order.status}</p>
                      </div>
                      <div>
                        <Link to={`/editSupplies/${order._id}`}>
                          <button className="mr-2 bg-blue-500 text-white p-2 rounded w-20 duration-300 hover:bg-black hover:text-gray-300">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="bg-red-500 text-white p-2 rounded w-20 duration-300  hover:bg-black hover:text-gray-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSupplies;
