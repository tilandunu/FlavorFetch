import { Button } from "@/components/ui/button";
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
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import axios from "axios";

export function SignupDriver() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [type, setType] = useState("driver");
  const [phoneNumber, setphoneNumber] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fname, setFname] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lname, setLname] = useState("");

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error("Passwords do not match", { position: "bottom-center" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          uid: user.uid,
          userType: type,
          phoneNumber: phoneNumber,
        });

        await axios.post("http://localhost:3001/api/users/", {
          uid: user.uid,
          email: user.email,
          firstName: fname,
          lastName: lname,
          userType: type,
          phoneNumber: phoneNumber,
        });
      }

      console.log("Registered successfully!");
      toast.success("User Registered Successfully", { position: "top-center" });
      window.location.href = "/signin";
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(error.message);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className=" py-8 font-poppins">
      <Card className="mx-16 shadow-2xl p-10 ">
        <form onSubmit={handleRegister} className="border-2 border-black">
          <div className="flex gap-24 flex-row align-middle justify-center items-center">
            <div className="flex flex-col w-[600px] p-10">
              {" "}
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm text-slate-500 pb-6 font-extralight">
                  FlavorFetch
                </CardTitle>

                <div className={visibilityType}>
                  <CardDescription className="text-4xl text-black">
                    YOUR CULINARY
                  </CardDescription>
                  <CardDescription className="text-4xl text-red-600">
                    ADVENTURE AWAITS
                  </CardDescription>
                </div>
              </CardHeader>
              <div className={visibilityType}>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex justify-center">
                    <h1 className="text-[10px] font-inter pt-10 pb-4">
                      {" "}
                      Choose your cooking journey
                    </h1>
                  </div>
                  <div className="flex justify-center gap-4 pb-12">
                    <div
                      className={`flex px-4 py-2 justify-center align-middle items-center cursor-pointer border-2  border-black ${
                        type === "chef"
                          ? "bg-red-600 text-white border-none "
                          : ""
                      }`}
                      onClick={() => setType("chef")}
                    >
                      <h1 className="flex w-40 text-center justify-center p-2 ">
                        {" "}
                        I AM A CHEF
                      </h1>
                      <Input
                        type="radio"
                        id="chef"
                        name="type"
                        value="chef"
                        className="hidden"
                        checked={type === "chef"}
                        onChange={() => setType("chef")}
                      />
                    </div>
                    <div
                      className={`flex px-4 py-2 justify-center align-middle items-center cursor-pointer text-center border-2  border-black ${
                        type === "customer"
                          ? "bg-red-600 text-white border-none"
                          : ""
                      }`}
                      onClick={() => setType("customer")}
                    >
                      <h1 className="flex w-40 text-center justify-center p-2">
                        {" "}
                        I AM A CUSTOMER
                      </h1>{" "}
                      <Input
                        type="radio"
                        id="customer"
                        name="type"
                        value="customer"
                        className="hidden"
                        checked={type === "customer"}
                        onChange={() => setType("customer")}
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
                      First Name :
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      onChange={(e) => setFname(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[12px] pl-1">
                      Last Name :
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      onChange={(e) => setLname(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
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
                  </div>{" "}
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber" className="text-[12px] pl-1">
                      Phone Number :
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      onChange={(e) => setphoneNumber(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-[12px] pl-1">
                      Password :
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-[12px] pl-1">
                      Re-Password :
                    </Label>
                    <Input
                      id="repassword"
                      type="password"
                      onChange={(e) => setRePassword(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 py-6">
                  <Button className="w-full bg-black hover:bg-green-700">
                    Create account
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
                {" "}
                <p className="text-[13px]">
                  ALREADY HAVE AN ACCOUNT?{" "}
                  <Link to={"/signin"} className="px-[6px] text-red-500">
                    LOGIN
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end flex-row">
              {" "}
              <img
                src="../edit 2.png"
                alt="chef"
                className="w-[480px] h-[430px] rounded-[60px]"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
