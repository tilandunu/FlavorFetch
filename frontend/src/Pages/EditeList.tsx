import { useNavigate, useParams } from "react-router-dom";
import ff from "../img/ff.jpg";
import { useEffect, useState } from "react";

interface FormData {
  id?: string;
  qunty?: string;
  name?: string;
  _id?: string;
}

export default function EditeList() {
  const [formData, setFormData] = useState<FormData>({});
  const [publishError, setPublishError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { Id } = useParams<{ Id: string }>(); // Type for the parameter

  useEffect(() => {
    const fetchE = async () => {
      try {
        const res = await fetch(`/api/product/getAll?upId=${Id}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.suplier.find((employe: FormData) => employe._id === Id);
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchE();
  }, [Id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/product/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("success");
        navigate("/manage");
      }
    } catch (error) {
      setPublishError("Something went wrong");
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
            <div>
              <div className="flex justify-center items-center">
                <div>
                  <div className="mt-9 text-3xl font-serif">Edit Supply</div>
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
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      value={formData.id}
                    />
                  </div>
                  <div>
                    <input
                      className="bg-slate-200 p-3 rounded-lg w-[400px] h-10"
                      type="text"
                      placeholder="Quantity"
                      id="qunty"
                      onChange={(e) => setFormData({ ...formData, qunty: e.target.value })}
                      value={formData.qunty}
                    />
                    <p className="mt-0 text-red-600 text-sm h-0 rounded-lg text-center">
                      Must be a number
                    </p>
                  </div>

                  <div className="mt-4">
                    <input
                      className="bg-slate-200 p-3 rounded-lg w-[400px] h-20"
                      type="text"
                      placeholder="Name"
                      id="name"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      value={formData.name}
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
    </div>
  );
}
