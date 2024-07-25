import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { auth } from "@/firebase";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const uid = Cookies.get("userID");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createBlog", {
        uid,
        title,
        subTitle,
        content,
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then((result) => console.log(result))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .catch((err) => console.log(err));
    window.location.href = "/createBlog";
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <div className="bg-[#202030]">
        <div className="flex align-middle items-center justify-between">
          <div className="flex flex-col justify-start">
            {" "}
            <h1 className="mt-20 mb-1 mx-56 text-[50px] font-poppins text-[#B0A990]">
              CREATE A BLOG
            </h1>
            <h1 className="mb-5 mx-56 relative -top-3 text-[#7D7461]">
              "Sharing Stories, Sparking Ideas."
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            className="mr-64 relative top-5 text-[#B0A990]"
          >
            Sign-Out
          </Button>
        </div>
        <div className="flex flex-col items-center ">
          <Separator className="w-[1000px] bg-[#B0A990]" />
        </div>

        <div className="flex justify-start gap-4 ml-56">
          {" "}
          <Link to={"/viewBlog"}>
            <Button className="text-[#B0A990] flex items-center align-middle p-6 mt-10 px-10 bg-[#39304A]">
              {" "}
              VIEW VLOGS{" "}
            </Button>
          </Link>{" "}
          <Link to={"/profile"}>
            {" "}
            <Button className="flex text-[#B0A990] items-center align-middle p-6 mt-10 px-10 bg-[#39304A]">
              {" "}
              VIEW PROFILE{" "}
            </Button>
          </Link>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-56 my-10 p-10 font-poppins text-[#B0A990]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a blog website?</AccordionTrigger>
            <AccordionContent className="text-[#cacaca]">
              A blog website is an online platform where individuals or
              organizations post written content, typically in a journal-style
              format, on various topics.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the primary purpose of a blog?
            </AccordionTrigger>
            <AccordionContent className="text-[#cacaca]">
              The primary purpose of a blog is to share information, insights,
              and opinions on specific subjects with an audience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is the role of comments on a blog?
            </AccordionTrigger>
            <AccordionContent className="text-[#cacaca]">
              New content should be posted regularly, with many successful blogs
              updating at least once a week to keep readers engaged and improve
              SEO.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <form>
          <div className="flex flex-col p-14 mx-52 shadow-lg bg-[#ffffff]">
            <Label className="flex py-5 font-poppins">Title : </Label>
            <Input
              className="flex py-1"
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            ></Input>
            <Label className="flex py-5 font-poppins">Sub-Title : </Label>
            <Input
              className="flex py-1"
              type="text"
              name="subTitle"
              onChange={(e) => setSubTitle(e.target.value)}
              required
            ></Input>
            <Label className="flex py-5 font-poppins">Type your Blog : </Label>
            <Textarea
              className="min-h-screen"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              required
            ></Textarea>
            <Button
              onClick={handleSubmit}
              className="mt-10 text-[#B0A990] bg-[#534e63]"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
