import { Separator } from "@/components/ui/separator";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "./blogModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const uid = Cookies.get("userID");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/viewBlog?userID=${uid}`)
      .then((result) => setBlogs(result.data))
      .catch((err) => console.log(err));
  }, [uid]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteBlog/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="bg-[#202030] min-h-screen pb-32">
      <div className="font-poppins">
        <div className="flex items-center justify-between mx-16 pt-16 text-[35px]">
          <p className="text-[#B0A990]">YOUR BLOGS</p>

          <Link to={"/createBlog"}>
            <Button className="text-[#B0A990] w-24">Home </Button>
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center align-middle mx-16">
          <Separator className="my-10 mx-10 bg-[#B0A990]"></Separator>
        </div>
        {blogs.map((blog) => {
          return (
            <section
              key={blog._id}
              className="flex flex-col bg-slate-100 my-10 mx-16 rounded-lg hover:shadow-2xl hover:cursor-pointer duration-300 z-0"
              onClick={() => handleOpenModal(blog)}
            >
              <div className="flex justify-evenly align-middle items-center mx-16 my-9 gap-6">
                <p className="text-[20px] text-[#273469]  rounded-2xl min-w-3">
                  {blog.title}
                </p>
                <Separator
                  className="bg-slate-500 py-6"
                  orientation="vertical"
                />
                <p className="text-[20px] text-[#273469] min-w-1">
                  {blog.subTitle}
                </p>
                <div className="flex gap-4 relative left-6">
                  <Button className="bg-slate-500 z-1">
                    <Link to={`/updateBlog/${blog._id}`}>Update</Link>
                  </Button>
                  <Button
                    className="bg-slate-500 z-8"
                    onClick={(e) => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <Modal show={showModal} onClose={handleCloseModal} blog={selectedBlog} />
    </div>
  );
};

export default YourBlogs;
