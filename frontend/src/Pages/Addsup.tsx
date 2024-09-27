import { Link, useNavigate } from "react-router-dom";
import ff from "../img/ff.jpg";
import { useState } from "react";

interface FormData {
  id?: string;
  qunty?: string;
  name?: string;
}
export default function SupplierAdd() {
  const [formData, setFormData] = useState<FormData>({});
  const [publishError, setPublishError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [validation, setValidation] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/product/Pcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      console.log("successful");
      alert("successful");
      navigate("");
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qunty = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (qunty === "") {
      setValidation(null);
    } else if (!quantityPattern.test(qunty)) {
      if (isNaN(Number(qunty))) {
        setValidation("Quantity must be a number");
      } else {
        setValidation("Quantity must be a positive integer");
      }
    } else {
      setFormData({ ...formData, qunty });
      setValidation(null);
    }
  };

  return (
    <div className="min-h-screen">
      <img
        src={ff}
        alt=""
        className="w-full h-[700px] opacity-  blur-sm  object-cover"
      />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div className="lg:mt-20 mt-[270px] md:mt-20 lg:ml-[] md:ml-[] ml-[4px]">
          <div className="w-[1200px] h-[550px] mt-12 ml-36 rounded-3xl shadow-sm bg-gray-100">
            <Link to={`/`}>
              <button className="absolute mt-8 w-32 h-10 rounded-full border-2 ml-36 uppercase bg-slate-200 hover:bg-red-600 hover:text-white">
                Back
              </button>
            </Link>
            <div className="flex justify-center items-center m">
              <div>
                <div className="mt-9 text-3xl font-serif">New Supply</div>
              </div>
            </div>
            <div className="flex justify-center mt-10 items-center">
              <form className="flex flex-col mt-10 gap-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    className="bg-slate-200 p-3 rounded-lg w-[400px] h-10"
                    type="text"
                    placeholder="Id"
                    id="id"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="bg-slate-200 p-3 rounded-lg w-[400px] h-10"
                    type="text"
                    placeholder="Quantity"
                    id="qunty"
                    onChange={handleQuantityChange}
                  />
                  {validation && (
                    <p className="mt-0 text-red-600 text-sm h-0 rounded-lg text-center ">
                      {validation}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <input
                    className="bg-slate-200 p-3 rounded-lg w-[400px] h-20"
                    type="text"
                    placeholder="Name"
                    id="name"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="bg-[#ee4603] hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
