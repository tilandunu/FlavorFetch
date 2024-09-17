import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ff from "../../img/ff.jpg";                  
import jsPDF from "jspdf";
import "jspdf-autotable";

// Define the types for the data structure
interface Product {
  _id: string;
  img: string;
  title: string;
  name: string;
  product: string;
}

interface User {
  _id: string;
}

// Define the Redux state
interface RootState {
  user: {
    currentUser: User | null;
  };
}

export default function SupplierAdd() {
  // Use appropriate types for state
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectdata, setselectdata] = useState<Product[]>([]);
  const [DId, setformId] = useState<string>("");
  const [filter, setfilter] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(" ");

  const currentuserId = currentUser ? currentUser._id : null;

  useEffect(() => {
    const fetchcat = async () => {
      try {
        if (currentuserId) {
          const res = await fetch(`http://localhost:3000/api/product/getlist/${currentuserId}`);
          const data = await res.json();
          if (res.ok) {
            setselectdata(data);
          } else {
            console.log(data.message);
          }
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchcat();
  }, [currentuserId]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/product/delete/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setselectdata((prev) => prev.filter((item) => item._id !== DId));
        alert("Successful");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };


  //search
  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...selectdata]);
    } else {
      const filteredData = selectdata.filter(
        (data) =>
          data.title && data.title.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, selectdata]);




//pdf
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text("Report", 14, 22);

    const tableData = filter.map((item) => [
      item.title,
      item.name,
      item.product,
    ]);

    doc.autoTable({
      head: [["Title", "Allergies", "Diets"]],
      body: tableData,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [255, 0, 0] },
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
              {/** <button
                onClick={() => generatePDF()}
                className="absolute mt-8 w-32 h-10 rounded-full border-2 uppercase bg-slate-200 hover:bg-slate-900 hover:text-white"
              >
                Report
              </button> */}
              
            </div>
            <div className="ml-[580px] mt-8">
              <Link to={"/profile"}>
                <button className="uppercase text-red-600 absolute ml-[500px] mt-5 hover:text-red-600 font-sans opacity-60 hover:underline">
                  My profile
                </button>
              </Link>
              <Link to={"/add"}>
                <button className="uppercase text-red-600 absolute ml-[400px] mt-5 hover:text-red-600 font-sans opacity-60 hover:underline">
                  Home
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center mt-4">
              <div className="">
                <h1 className="font-serif text-2xl opacity-70 mt-8 uppercase">
                  My favorite list
                </h1>
                                {/**  <form>
                  <div className="opacity-50">
                    <input
                      type="text"
                      placeholder="Search... "
                      className="w-[220px] h-10 mt-4 rounded-full shadow-xl border border-white bg-opacity-10"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </form> */}
               
              </div>
            </div>
            <div>
              {selectdata.length > 0 ? (
                <div className="flex justify-center items-center">
                  <div className="scrollbar-none max-h-96 overflow-y-auto mt-5">
                    {filter.length > 0 ? (
                      filter.map((data) => (
                        <div
                          key={data._id}
                          className="w-[850px] h-[150px] bg-gray-50 mt-10 mb-10 rounded-3xl shadow-xl"
                        >
                          <div className="flex justify-center items-center gap-64">
                            <div className="flex justify-center gap-2 items-center">
                              <div className="w-28 h-28 overflow-hidden mt-4 rounded-full">
                                <img
                                  src={data.img}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="w-[180px] truncate font-serif text-xl opacity-90 text-black">
                                  {data.title}
                                </div>
                                <div className="opacity-90">
                                  Allergies: {data.name}
                                </div>
                                <div className="opacity-90">
                                  Diets: {data.product}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center items-center gap-9">
                              <Link to={`/update/${data._id}`}>
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
                      ))
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
}
