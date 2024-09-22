/*import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";

export function TicketForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [visibilityForm, setVisibilityForm] = useState("hidden");
  const [visibilityType, setVisibilityType] = useState("visible");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Tickets"), {
        email,
        subject,
        message,
        category,
        createdAt: new Date(),
      });

      console.log("Support ticket submitted successfully!");
      toast.success("Support Ticket Submitted Successfully", {
        position: "top-center",
      });
      window.location.href = "/support";
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(error.message);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibilityForm("visible");
    setVisibilityType("hidden");
  };

  const handleBack = () => {
    setVisibilityForm("hidden");
    setVisibilityType("visible");
  };

  return (
    <div className="py-8 font-poppins">
      <Card className="mx-16 shadow-2xl p-10 ">
        <form onSubmit={handleSubmit} className="border-2 border-black">
          <div className="flex gap-24 flex-row align-middle justify-center items-center">
            <div className="flex flex-col w-[600px] p-10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm text-slate-500 pb-6 font-extralight">
                  FlavorFetch Support
                </CardTitle>

                <div className={visibilityType}>
                  <CardDescription className="text-4xl text-black">
                    NEED HELP?
                  </CardDescription>
                  <CardDescription className="text-4xl text-red-600">
                    WE'RE HERE FOR YOU
                  </CardDescription>
                </div>
              </CardHeader>
              <div className={visibilityType}>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex justify-center">
                    <h1 className="text-[10px] font-inter pt-10 pb-4">
                      Select the type of support you need
                    </h1>
                  </div>
                  <div className="flex justify-center gap-4 pb-12">
                    <div
                      className={`flex px-4 py-2 justify-center align-middle items-center cursor-pointer border-2  border-black ${
                        category === "technical"
                          ? "bg-red-600 text-white border-none "
                          : ""
                      }`}
                      onClick={() => setCategory("technical")}
                    >
                      <h1 className="flex w-40 text-center justify-center p-2 ">
                        Technical Issue
                      </h1>
                      <Input
                        type="radio"
                        id="technical"
                        name="category"
                        value="technical"
                        className="hidden"
                        checked={category === "technical"}
                        onChange={() => setCategory("technical")}
                      />
                    </div>
                    <div
                      className={`flex px-4 py-2 justify-center align-middle items-center cursor-pointer text-center border-2  border-black ${
                        category === "billing"
                          ? "bg-red-600 text-white border-none"
                          : ""
                      }`}
                      onClick={() => setCategory("billing")}
                    >
                      <h1 className="flex w-40 text-center justify-center p-2">
                        Billing Issue
                      </h1>
                      <Input
                        type="radio"
                        id="billing"
                        name="category"
                        value="billing"
                        className="hidden"
                        checked={category === "billing"}
                        onChange={() => setCategory("billing")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-col pb-5">
                  <Button
                    onClick={(e) => handleNext(e)}
                    className="hover:bg-green-700 text-white duration-300"
                  >
                    {" "}
                    Next
                  </Button>
                </div>
              </div>
              <div className={visibilityForm}>
                <CardContent className="grid gap-6 py-1">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[12px] pl-1">
                      Email :
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="placeholder:text-[10px] border-[0.5px] border-black"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject" className="text-[12px] pl-1">
                      Subject :
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      onChange={(e) => setSubject(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message" className="text-[12px] pl-1">
                      Message :
                    </Label>
                    <Input
                      id="message"
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 py-6">
                  <Button className="w-full bg-black hover:bg-green-700">
                    Submit Ticket
                  </Button>
                  <p
                    className="bg-white text-black hover:border-b-2 px-10 py-1 hover:cursor-pointer hover:border-black duration-300"
                    onClick={handleBack}
                  >
                    {" "}
                    Back
                  </p>
                </CardFooter>
              </div>
              <div className="flex justify-end ">
                <p className="text-[13px]">
                  NEED TO LOGIN?{" "}
                  <Link to={"/signin"} className="px-[6px] text-red-500">
                    LOGIN
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end flex-row">
              <img
                src="..public/edit 2.png"
                alt="support"
                className="w-[480px] h-[430px] rounded-[60px]"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}*/