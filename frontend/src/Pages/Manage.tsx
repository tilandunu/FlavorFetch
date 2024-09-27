import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ff from "../img/ff.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";


// Define types for supplier data
interface Supplier {
  _id: string;
  id: number;
  qunty: number;
  name: string;
}

// Define component
const SupplierAdd: React.FC = () => {
  const [selectdata, setselectdata] = useState<Supplier[]>([]);
  const [DId, setformId] = useState<string>("");
  const [filter, setfilter] = useState<Supplier[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/product/getAll`);
        const data = await res.json();

        if (res.ok) {
          setselectdata(data.suplier);
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchinfo();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/product/deletes/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setselectdata((prev) => prev.filter((item) => item._id !== DId));
        alert("successful");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...selectdata]);
    } else {
      const filteredData = selectdata.filter(
        (data) =>
          data.name && data.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, selectdata]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
  
    // Add title
    doc.text("Supply", 14, 22);
  
    // Add table
    const tableData = filter.map((item) => [
      item.id,
      item.qunty,
      item.name,
    ]);
  
    doc.autoTable({
      head: [["Id", "Quantity", "Name"]],
      body: tableData,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [255, 0, 0] }, // Red header background
    });
  
    doc.save("supplier_report.pdf");
  };
  

  return (
    <div className="min-h-screen">
      <img
        src={ff}
        alt=""
        className="w-full h-[700px] opacity- blur-sm object-cover"
      />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div className="lg:mt-20 mt-[270px] md:mt-20 lg:ml-[] md:ml-[] ml-[4px]">
          <div className="w-[1200px] h-[550px] mt-12 ml-36 rounded-3xl shadow-sm bg-gray-100">
            <div className="ml-4">
              <button
                onClick={generatePDF}
                className="absolute mt-8 w-32 h-10 rounded-full border-2 uppercase bg-slate-200 hover:bg-red-600 hover:text-white"
              >
                Report
              </button>

              <Link to={`/addsup`}>
                <button className="absolute mt-8 w-32 h-10 rounded-full border-2 ml-36 uppercase bg-slate-200 hover:bg-red-600 hover:text-white">
                  Add New
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center mt-4">
              <div>
                <h1 className="font-serif ml-7 text-2xl opacity-70 mt-8 uppercase">
                  Supply List
                </h1>

                <form>
                  <div className="opacity-50">
                    <input
                      type="text"
                      placeholder="Search... "
                      className="w-[220px] h-10 mt-4 rounded-full shadow-xl border border-white bg-opacity-10"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div>
              {selectdata && selectdata.length > 0 ? (
                <div className="flex justify-center items-center">
                  <div className="scrollbar-none max-h-96 overflow-y-auto mt-5">
                    {filter && filter.length > 0 ? (
                      <>
                        {filter.map((data) => (
                          <div
                            key={data._id}
                            className="w-[850px] h-[150px] bg-gray-50 mt-10 mb-10 rounded-3xl shadow-xl"
                          >
                            <div className="flex justify-center items-center gap-64">
                              <div className="flex justify-center mt-14 gap-2 items-center">
                                <div>
                                  <div className="w-[180px] truncate font-serif text-xl opacity-90 text-black">
                                    Id: {data.id}
                                  </div>
                                  <div className="opacity-90">
                                    Quantity: {data.qunty}
                                  </div>
                                  <div className="opacity-90">
                                    Name: {data.name}
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-center items-center gap-9">
                                <Link to={`/Eupdate/${data._id}`}>
                                  <button className="uppercase hover:text-green-500 font-serif text-lg text-green-700">
                                    Edit
                                  </button>
                                </Link>
                                <button
                                  onClick={() => {
                                    setformId(data._id);
                                    handleDeleteUser();
                                  }}
                                  className="uppercase hover:text-red-400 font-serif text-lg text-red-700"
                                >
                                  delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p>You have no list yet</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center mt-28">
                  <p>You have no items yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierAdd;
