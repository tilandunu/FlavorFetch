import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import peanutt from "../../img/peanutt.png";
import sulfitt from "../../img/sulfitt.jpg";
import soyfree from "../../img/soyfree.png";
import dairyy from "../../img/dairyy.png";
import Wheat from "../../img/Wheat.png";
import Vegitarian from "../../img/Vegitarian.jpg";
import Paleo from "../../img/Paleo.png";
import ff from "../../img/ff.jpg";

// Define types for your data
interface Product {
  _id: string;
  img: string;
  title: string;
  desc: string;
  name?: string;
  product?: string;
}

interface FormData {
  _id?: string;
  img: string;
  title: string;
  desc: string;
  name: string;
  product: string;
}

interface PreviousData {
  title?: string;
  name?: string;
  product?: string;
}

const steps = [
  { type: "fetchData" },
  { type: "icons" },
  { type: "textAndImage" },
];

export default function SupplierAdd() {
  const { currentUser } = useSelector((state: any) => state.user);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [selectedDetail, setSelectedDetail] = useState<Product | null>(null);
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  console.log(selectedDetail);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  console.log(selectedName);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [info, setInfo] = useState<Product[]>([]);
  const [previousdata, setPreviousData] = useState<Product | null>(null);
  console.log("girs", previousdata);

  const [formData, setFormData] = useState<FormData>({
    img: "",
    title: "",
    desc: "",
    name: "",
    product: "",
  });
  const [publishError, setPublishError] = useState<string | null>(null);
  const currentuserId = currentUser ? currentUser._id : null;

  console.log("Submitting formData:", formData);

  const { upId } = useParams<{ upId: string | undefined }>();
  console.log("idd", upId);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/product/getAll`);
        const data = await res.json();

        if (res.ok) {
          setInfo(data.suplier);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchInfo();
  }, []);


  // After click edit button it include details get
  useEffect(() => {
    if (upId && currentuserId) {
      const fetchE = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/product/getlist/${currentuserId}/?upjId=${upId}`);
          const data = await res.json();
          
          if (res.ok) {
            const selectedE = data.find((item: Product) => item._id === upId);
            console.log("fuc",selectedE)
            setPreviousData(selectedE || {});
            if (selectedE) {
              setFormData({
                _id: upId,
                img: selectedE.img,
                title: selectedE.title,
                desc: selectedE.desc,
                name: selectedE.name || "", // Default to empty string if undefined
                product: selectedE.product || "", // Default to empty string if undefined
              });
              setSelectedDetailId(upId);
              setSelectedName(selectedE.name || null); // Default to null if undefined
              setSelectedProduct(selectedE.product || null); // Default to null if undefined
            }
          } else {
            setPublishError(data.message);
          }
        } catch (error) {
          console.log("error");
        }
      };
      fetchE();
    }
  }, [upId, currentuserId]);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelection = (type: "detail" | "name" | "product", value: string) => {
    if (type === "detail") {
      // Storing only the selected details
      const selected = info.find((post) => post._id === value);
      if (selected) {
        setFormData({
          ...formData,
          img: selected.img,
          title: selected.title,
          desc: selected.desc,
          _id: upId || "",
        });
        setSelectedDetailId(value);
      }
    } else if (type === "name") {
      setSelectedName(value);
      setFormData((prevData) => ({
        ...prevData,
        name: value,
      }));
      setSelectedDetailId(value);
    } else if (type === "product") {
      setSelectedProduct(value);
      setSelectedDetailId(value);
      setFormData((prevData) => ({
        ...prevData,
        product: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/product/details/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("pkaya", formData._id);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);

        alert("Success!");
        navigate("/favourite");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].type) {
      case "fetchData":
        return (
          <div className="text-center p-4">
            <button className="uppercase font-sans opacity-45 hover:underline">
              back
            </button>
            <div>
              <h2 className="text-3xl mt-8 font-sans uppercase text-gray-700 opacity-90">
                What are your favorite cuisines?
              </h2>
            </div>
               
           
            <div className="scrollbar-none   overflow-y-auto">
              <div className="flex justify-center gap-4 mt-16 items-center w-[800px] ">
                {info.map((post) => (
                  <div
                    key={post._id}
                    className={`border-none rounded-2xl  ${
                      selectedDetailId === post._id
                        ? "bg-gray-200 border shadow-sm shadow-black  bg-opacity-80"
                        : ""
                    } cursor-pointer`}
                    onClick={() => handleSelection("detail", post._id)}
                  >
                    <div className="flex justify-center mt-2 w-36 h-36 overflow-hidden rounded-full">
                      <img
                        src={post.img}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center mt-2 w-20 truncate cursor-pointer">
                        {post.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           

              <div className="mt-2 ">
                <div className="flex justify-center items-center gap-28">
                  <div className="uppercase text-red-600 opacity-85">
                    previous details
                  </div>
                </div>
                <div className="text-sm opacity-50">{previousdata?.title}</div>
              </div>
            </div>
          </div>
        );
      case "icons":
        return (
          <div className="text-center p-4">
            <h2 className="text-3xl mt-16 font-sans uppercase text-gray-700 opacity-90">
              Do you have any food allergies?
            </h2>
            <div className="flex justify-center gap-4 mt-8 items-center">
              <div
                onClick={() => handleSelection("name", "Penanut free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Penanut free"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={peanutt}
                    alt=""
                    className="rounded-full w-36 opacity-80 cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Penanut free
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "sulfite free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "sulfite free"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div className="">
                  <div>
                    <img
                      src={sulfitt}
                      alt=""
                      className="rounded-full w-36 cursor-pointer"
                    />
                  </div>
                  <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                    sulfite free
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "soy free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "soy free"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div className="">
                  <div>
                    <img
                      src={soyfree}
                      alt=""
                      className="rounded-full w-[155px] cursor-pointer"
                    />
                  </div>
                  <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                    soy free
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "dairy free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "dairy free"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div className="">
                  <div>
                    <img
                      src={dairyy}
                      alt=""
                      className="rounded-full w-[155px] opacity-80  cursor-pointer"
                    />
                  </div>
                  <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                    dairy free
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "wheat free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "wheat free"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div className="">
                  <div>
                    <img
                      src={Wheat}
                      alt=""
                      className="rounded-full w-[155px] opacity-80  cursor-pointer"
                    />
                  </div>
                  <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                    wheat free
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 ">
              <div className="flex justify-center items-center gap-28">
                <div className="uppercase text-red-600 opacity-85">
                  previous details
                </div>
              </div>
              <div className="text-sm opacity-50 uppercase">
                {previousdata?.name}
              </div>
            </div>
          </div>
        );
      case "textAndImage":
        return (
          <div className="text-center p-4">
            <h2 className="uppercase mt-10 font-sans text-lg text-gray-900 cursor-pointer">
              Do you follow any of these diets?
            </h2>
            <div className="flex justify-center gap-4 items-center mt-10">
              <div
                onClick={() => handleSelection("product", "Vegetarian")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Vegetarian"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={Vegitarian}
                    alt=""
                    className="rounded-full w-36 opacity-80 cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Vegetarian
                </div>
              </div>
              <div
                onClick={() => handleSelection("product", "Paleo")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Paleo"
                    ? "bg-gray-200 border shadow-xl  bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={Paleo}
                    alt=""
                    className="rounded-full w-36 opacity-80 cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Paleo
                </div>
              </div>
            </div>
            <div className="mt-2 ">
              <div className="flex justify-center items-center gap-28">
                <div className="uppercase text-red-600 opacity-85">
                  previous details
                </div>
              </div>
              <div className="text-sm opacity-50 uppercase">
                {previousdata?.product}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="border rounded-full mt-8 w-52 text-gray-800 p-2 shadow-sm hover:bg-slate-900 hover:text-white"
            >
              Submit
            </button>
          </div>
        );

      default:
        return <div className="text-center p-4">Unknown step type</div>;
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
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-center items-center">
                {renderStepContent()}
              </div>
              <div className="flex justify-center gap-8 items-center mb-8">
                <button
                  onClick={goToPreviousStep}
                  className={`bg-black bg-opacity-85 hover:opacity-80 text-white p-2 px-16 py-2 rounded-full ${
                    currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={currentStep === 0}
                >
                  Back
                </button>
                <button
                  onClick={goToNextStep}
                  className={`bg-black bg-opacity-85 hover:opacity-80 text-white p-2 px-16 py-2 rounded-full ${
                    currentStep === steps.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={currentStep === steps.length - 1}
                >
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
