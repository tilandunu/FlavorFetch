import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";   // Update this import based on your file structure
import peanutt from "../../img/peanutt.png";
import sulfitt from "../../img/sulfitt.jpg";
import soyfree from "../../img/soyfree.png";
import dairyy from "../../img/dairyy.png";
import Wheat from "../../img/Wheat.png";
import Vegitarian from "../../img/Vegitarian.jpg";
import Paleo from "../../img/Paleo.png";
import ff from "../../img/ff.jpg";

interface Step {
  type: "fetchData" | "icons" | "textAndImage";
}

interface InfoItem {
  _id: string;
  img: string;
  title: string;
  desc: string;
}

interface SelectedDetail {
  img: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  { type: "fetchData" },
  { type: "icons" },
  { type: "textAndImage" },
];

export default function SupplierAdd() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(null);
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoItem[]>([]);
  
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
        console.log("error");
      }
    };
    fetchInfo();
  }, []);

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
      const selected = info.find((post) => post._id === value);
      if (selected) {
        setSelectedDetail({
          img: selected.img,
          title: selected.title,
          desc: selected.desc,
        });
        setSelectedDetailId(value);
      }
    } else if (type === "name") {
      setSelectedName(value);
      setSelectedDetailId(value);
    } else if (type === "product") {
      setSelectedProduct(value);
      setSelectedDetailId(value);
    }
  };

  const handleSubmit = async () => {
    const { img, title, desc } = selectedDetail || {};

    const submissionData = {
      currentuserId: currentUser._id,
      img,
      title,
      desc,
      name: selectedName,
      product: selectedProduct,
    };

    try {
      const res = await fetch("http://localhost:3000/api/product/Ocreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        alert("Data submitted successfully!");
        navigate("/favourite");
      } else {
        alert("Failed to submit data");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.type) {
      case "fetchData":
        return (
          <div className="text-center p-4">
            <Link to={"/profile"}>
              <button className="uppercase text-red-600 absolute ml-[500px] hover:text-red-600 font-sans opacity-60 hover:underline">
                My profile
              </button>
            </Link>
            <Link to={"/favourite"}>
              <button className="uppercase text-red-600 absolute ml-[400px] hover:text-red-600 font-sans opacity-60 hover:underline">
              favourite
              </button>
            </Link>
            <button className="uppercase font-sans opacity-45 hover:underline">
              back
            </button>
            <div>
              <h2 className="text-3xl mt-8 font-sans uppercase text-gray-700 opacity-90">
                What are your favorite cuisines?
              </h2>
            </div>

            <div className="scrollbar-none w-[1200px] overflow-y-auto">
              <div className="flex justify-center gap-4 mt-16 items-center">
                {info.map((post) => (
                  <div
                    key={post._id}
                    className={`border-none rounded-2xl mb-2 ${
                      selectedDetailId === post._id
                        ? "bg-gray-200 border shadow-sm shadow-black bg-opacity-80"
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
                      <div className="flex justify-center mt-2 w-20 uppercase truncate cursor-pointer">
                        {post.title}
                      </div>
                    </div>
                  </div>
                ))}
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
                onClick={() => handleSelection("name", "Peanut free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Peanut free"
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
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
                  Peanut free
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "Sulphite free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Sulphite free"
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={sulfitt}
                    alt=""
                    className="rounded-full w-36 cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Sulphite free
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "Soy free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Soy free"
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={soyfree}
                    alt=""
                    className="rounded-full w-[155px] cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Soy free
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "Dairy free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Dairy free"
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={dairyy}
                    alt=""
                    className="rounded-full w-[155px] opacity-80 cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Dairy free
                </div>
              </div>
              <div
                onClick={() => handleSelection("name", "Wheat free")}
                className={`border-none rounded-2xl cursor-pointer ${
                  selectedDetailId === "Wheat free"
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={Wheat}
                    alt=""
                    className="rounded-full w-[155px] opacity-80 cursor-pointer"
                  />
                </div>
                <div className="uppercase mt-4 font-sans text-lg text-gray-900 cursor-pointer">
                  Wheat free
                </div>
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
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
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
                    ? "bg-gray-200 border shadow-xl bg-opacity-80"
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
            <button
              onClick={handleSubmit}
              className="border rounded-full mt-20 w-52 text-gray-800 p-2 shadow-sm hover:bg-slate-900 hover:text-white"
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
        className="w-full h-[700px] opacity- blur-sm object-cover"
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
