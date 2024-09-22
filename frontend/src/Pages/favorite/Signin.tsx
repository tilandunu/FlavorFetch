
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSilce";

import { RootState } from "../../redux/store";// Adjust the import path as needed

interface FormData {
  email?: string;
  password?: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({});
  const { loading, error: errorMessage } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/add");
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message || "An error occurred"));
    }
  };

  return (
    <div className="min-h-screen">
      <img
        src="https://images.pexels.com/photos/14410236/pexels-photo-14410236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full h-[700px] bg-none opacity-95 object-cover"
      />

      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div>
          <div className="mt-20 lg:ml-[450px] md:ml-[240px] ml-[4px]">
            <div className="flex justify-center items-center">
              <div>
                

                <h1 className="text-4xl font-serif opacity-70 text-gray-800">
                   Login
                </h1>
              </div>
            </div>
            <div className="bg-white  bg-opacity-50 w-[480px] md:w-[550px] lg:w-[550px] border h-96 mt-8 max-w-3xl mx-auto rounded-3xl border-opacity-50">
              <div className="flex justify-center items-center">
                <div className="mt-16">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Email
                      </h3>
                      <input
                        className="bg-slate-100 bg-opacity-40 border-white border-opacity-50 p-3 rounded-lg w-[460px] h-11"
                        type="email"
                        placeholder="name@company.com"
                        id="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 ml-1">
                        Password
                      </h3>
                      <input
                        className="bg-slate-100 bg-opacity-40 border-white p-3 border-opacity-50 rounded-lg w-[460px] h-11"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="bg-blue-800 mt-6 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                      type="submit"
                     
                    >
                      
                        <div className="flex items-center justify-center">
                          <div className="font-serif text-xl opacity-75">
                            SIGN IN
                          </div>
                        </div>
                    
                    </button>
                  </form>

                  {errorMessage && (
                    <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
