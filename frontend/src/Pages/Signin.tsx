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
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", { position: "top-center" });

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUserDetails(userData);
        Cookies.set("userID", userData.uid, { expires: 7 });

        console.log(userData.userType);

        if (userData.userType === "chef") {
          navigate("/chefDashboard");
        } else if (userData.userType === "customer") {
          navigate("/home");
        } else if (userData.userType === "driver") {
          navigate("/driverdashboard");
        } else if (userData.userType === "supplier") {
          navigate("/manageSupplies");
        } else if (userData.userType === "admin") {
          navigate("/admin");
        } else {
          console.log("No such document!");
          navigate("/");
        }
      } else {
        console.log("No such document idiot!");
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(error.message);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUserDetails(userData);
          Cookies.set("userID", userData.uid, { expires: 7 });
        }
      } else {
        console.log("User is not logged in!");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="py-8 font-poppins">
      <div
        className="absolute inset-0 bg-white opacity-5 z-0"
        style={{
          backgroundImage: `url("/signinbackground.png")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></div>
      <Card className="mx-16 shadow-2xl p-10 relative">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 border-2 border-black"
        >
          <div className="flex gap-24 flex-row align-middle justify-center items-center">
            <div className="flex flex-col w-[600px] p-10">
              <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-sm text-slate-500 pb-6 font-extralight">
                  FlavorFetch
                </CardTitle>

                <CardDescription className="text-4xl text-black">
                  HELLO,
                </CardDescription>
                <CardDescription className="text-4xl text-red-600">
                  WELCOME BACK!
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 py-1">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[12px] pl-1">
                    Email :
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-[12px] pl-1">
                    Password :
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6 py-6">
                <Button className="w-full bg-black hover:bg-green-700">
                  LOGIN
                </Button>
              </CardFooter>
              <div className="flex justify-end relative right-5">
                <p className="text-[13px]">
                  NO ACCOUNT?{" "}
                  <Link to={"/signup"} className="px-[6px] text-red-500">
                    REGISTER
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
