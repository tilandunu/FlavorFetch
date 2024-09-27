// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '../redux/store'; // Adjust import according to your store setup
// import { signoutSuccess } from "../redux/user/userSilce";

// // Define the type for the user state
// interface User {
//   profilePicture: string;
// }

// // Define the type for the Redux state
// interface UserState {
//   currentUser: User | null;
// }

// export default function Header() {
//   // Use the correct type for the state and dispatch
//   const { currentUser } = useSelector((state: RootState) => state.user);
//   const dispatch: AppDispatch = useDispatch();

//   const handleSignout = async () => {
//     try {
//       const res = await fetch('/api/auth/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log((error as Error).message);
//     }
//   };

//   return (
//     <div className="bg-[#2e2e2e] border border-black shadow-sm shadow-black">
//       <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
//         <ul className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
//           {currentUser ? (
//             <>
//               <Link to="/profile" className="flex items-center lg:ml-[600px] md:ml-[400px] ml-[100px] xl:ml-[980px]">
//                 <img
//                   src={currentUser.profilePicture}
//                   alt="profile"
//                   className="h-10 w-10 rounded-full object-cover"
//                 />
//               </Link>
//               <button
//                 onClick={handleSignout}
//                 className="text-white px-3 py-1 rounded-lg text-base md:text-lg font-serif hover:bg-blue-800 transition"
//               >
//                 LogOut
//               </button>
//             </>
//           ) : (
//             <Link to="/" className="text-white hover:text-gray-200">
//               <li>Sign In</li>
//             </Link>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }
