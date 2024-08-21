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
  const type = "driver";
  const [phoneNumber, setphoneNumber] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fname, setFname] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lname, setLname] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const [vehicleNumber, setvehicleNumber] = useState("");

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
          vehicleType: vehicleType,
          vehicleNumber: vehicleNumber,
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

                <CardDescription className="text-4xl text-black">
                  JOIN OUR TEAM
                </CardDescription>
                <CardDescription className="text-4xl text-red-600">
                  OF DELIVERY EXPERTS
                </CardDescription>
              </CardHeader>
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
                  <Label htmlFor="vehicleType" className="text-[12px] pl-1">
                    Vehicle Type :
                  </Label>
                  <select
                    name="vehicleType"
                    id="cars"
                    className="border-[0.5px] border-black py-2 px-2 text-sm rounded-md"
                    onChange={(e) => setvehicleType(e.target.value)}
                  >
                    <option value="Scooter">Scooter</option>
                    <option value="Threewheel">Threewheel</option>
                    <option value="Bike">Bike</option>
                    <option value="Car">Car</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="VehicleNumber" className="text-[12px] pl-1">
                    Vehicle Number :
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    onChange={(e) => setvehicleNumber(e.target.value)}
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
              <CardFooter className="flex flex-col gap-6 py-16">
                <Button className="w-full bg-black hover:bg-green-700">
                  Create account
                </Button>
              </CardFooter>
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
                src="../R.jpeg"
                alt="chef"
                className="w-[480px] h-[360px] rounded-[60px]"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
