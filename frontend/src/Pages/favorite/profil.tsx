import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.jpg";
import ff from "../../img/ff.jpg";
import { signoutSuccess } from "../../redux/user/userSilce";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store"; // Adjust this import based on your project structure

// Define types for the currentUser object
interface CurrentUser {
  _id: string;
  email: string;
  profilePicture: string;
}

// Define types for the actions
interface DeleteUserStartAction {
  type: 'DELETE_USER_START';
}
interface DeleteUserSuccessAction {
  type: 'DELETE_USER_SUCCESS';
  payload: any;
}
interface DeleteUserFailureAction {
  type: 'DELETE_USER_FAILURE';
  payload: string;
}

// Add types for the deleteUser actions (assuming these are defined in your slice)
type DeleteUserActions = DeleteUserStartAction | DeleteUserSuccessAction | DeleteUserFailureAction;

const steps = [
  { type: "fetchData" },
  { type: "icons" },
  { type: "textAndImage" },
];

export default function SupplierAdd() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleDeleteUser = async () => {
   
    try {
      dispatch({ type: 'DELETE_USER_START' }); // Update based on your action creators
      const res = await fetch(`http://localhost:3000/api/auth/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch({ type: 'DELETE_USER_FAILURE', payload: data.message });
      } else {
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: data });
        alert("User deleted");
      }
    } catch (error) {
      dispatch({ type: 'DELETE_USER_FAILURE', payload: "error" });
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
            <div className="">
            <div className="ml-[700px] mt-8">
            
            <Link to={"/add"}>
              <button className="uppercase text-red-600 absolute ml-[400px] mt-5 hover:text-red-600 font-sans opacity-60 hover:underline">
              Home
              </button>
            </Link>
            </div>
              <div className="flex justify-center items-center">
                <img src="" alt="" />

                <div className="bg-opacity-10 flex justify-center items-center w-[300px] shadow-sm h-10 rounded-full bg-gray-700 mt-6">
                  <div>
                    <h1 className="uppercase font-sans text-lg opacity-90">
                      User Profile
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-9 gap-52 items-center">
                <div>
                  <div className="flex justify-center items-center">
                    <div>
                      <img
                        //src={currentUser.profilePicture}
                        alt=""
                        className="w-32 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="mt-10">
                      <h1 className="text-xl font-serif opacity-80">
                       {/**{currentUser.email} */} 
                      </h1>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-center items-center">
                    <div>
                      <button
                        onClick={handleSignout}
                        className="w-32 hover:bg-slate-900 hover:text-white shadow-sm text-opacity-60 h-10 border font-serif bg-slate-200 rounded-full uppercase"
                      >
                        Logout
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div>
                      <button
                        onClick={handleDeleteUser}
                        className="mt-8 uppercase text-red-600 opacity-85 hover:underline font-serif"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div>
                      <Link to={"/favourite"}>
                        <button className="w-56 h-10 rounded-full ng-opacity-60 text-slate-300 font-serif shadow-sm bg-red-700 bg-opacity-80 hover:bg-red-600 mt-8 uppercase whitespace-nowrap">
                          My Favorite List
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-12">
                <img
                  src={logo}
                  alt=""
                  className="rounded-3xl w-48 h-48 shadow-xl opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
