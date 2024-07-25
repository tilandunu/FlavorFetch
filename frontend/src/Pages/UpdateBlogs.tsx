import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";

export function UpdateBlogs() {
  const { id } = useParams();
  const [uid, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getBlog/` + id)
      .then((result) => {
        console.log(result);
        setUserID(result.data.uid);
        setTitle(result.data.title);
        setSubTitle(result.data.subTitle);
        setContent(result.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateBlog/" + id, {
        uid,
        title,
        subTitle,
        content,
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then((result) => {
        console.log(result);
        navigate("/viewBlog");
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-[#f1f1f1]">
        <div className="flex flex-col justify-start">
          {" "}
          <h1 className="mt-20 mb-1 mx-56 text-[50px] font-poppins text-[#4f2a11]">
            UPDATE YOUR BLOG
          </h1>
          <h1 className="mb-5 mx-56 relative -top-3 text-[#806655]">
            "Sharing Stories, Sparking Ideas."
          </h1>
        </div>
        <div className="flex flex-col items-center mb-16">
          <Separator className="w-[1000px] bg-black" />
        </div>

        <form>
          <div className="flex flex-col p-14 mx-52 shadow-lg bg-[#ffffff]">
            <Input className="flex py-1" type="hidden" value={uid}></Input>
            <Label className="flex py-5 font-poppins">Title : </Label>
            <Input
              className="flex py-1"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            <Label className="flex py-5 font-poppins">Sub-Title : </Label>
            <Input
              className="flex py-1"
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            ></Input>
            <Label className="flex py-5 font-poppins">Type your Blog : </Label>
            <Textarea
              className="min-h-screen"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></Textarea>
            <Button onClick={Update} className="mt-10 bg-[#888282]">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
