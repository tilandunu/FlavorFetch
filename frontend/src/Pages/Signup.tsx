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

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          uid: user.uid,
        });
      }
      console.log("Registered successfully!");
      toast.success("User Registered Successfully", { position: "top-center" });
      window.location.href = "/createBlog";
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
    <div className="bg-[#202030] py-16">
      <Card className="mx-72  p-10 shadow-2xl">
        <form onSubmit={handleRegister}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">First Name :</Label>
              <Input
                id="email"
                type="text"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Last Name :</Label>
              <Input
                id="email"
                type="text"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email :</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password :</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Re-Password :</Label>
              <Input
                id="repassword"
                type="password"
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-cyan-950">Create account</Button>
          </CardFooter>
        </form>
        <p className="px-[29px]">
          Already have an account?{" "}
          <Link to={"/login"} className="px-[6px] text-cyan-800">
            Login!
          </Link>
        </p>
      </Card>
    </div>
  );
}
