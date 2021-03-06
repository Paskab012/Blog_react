import "./settings.css";
import Sidebar from "../../sidebar/Sidebar"
import { useContext, useState } from "react";
import { Context } from "../../../context/Context"
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  // const PF = "http://127.0.0.1:3004/images/" 

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
     const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
      await axios.post("/upload", data);
      } catch (err) {}
      }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
     return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Accout</span>
                    <span className="settingsDeleteTitle">Delete Accout</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsProfilePicture">
                    <img src={user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                        <i className="settingsProfileIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
/>
                    </div>
                    <label >Username</label>
                    <input type="text" placeholder={user.username}
                    onChange={e=> setUsername(e.target.value)}
                    />
                    <label >Email</label>
                    <input type="email" placeholder={user.email}
                    onChange={e=> setEmail(e.target.value)}

                    />
                    <label >Password</label>
                    <input type="password"
                    onChange={e=> setPassword(e.target.value)}

                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                </form>
            </div>
                <Sidebar/>
            
        </div>
    )
}


// import "./settings.css"
// import Sidebar from "../../sidebar/Sidebar"
// import { Context } from "../../../context/Context"
// import {useContext, useState} from "react"
// import axios from "axios";

// export default function Settings() {
//     const [file, setFile] = useState(null);
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const { user } = useContext(Context)
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const updatedUser = {
//           userId: user._Id,
//           username, email, password,
//         };
//         if (file) {
//           const data =new FormData();
//           const filename = Date.now() + file.name;
//           data.append("name", filename);
//           data.append("file", file);
//           updatedUser.profilePic = filename;
//           try {
//             await axios.post("/upload", data);
//           } catch (err) {}
//         }
//         try {
//           await axios.put("/users/"+user._id, updatedUser);
//         } catch (err) {}
//       };



//     return (
//         <div className="settings">
//             <div className="settingsWrapper">
//                 <div className="settingsTitle">
//                     <span className="settingsUpdateTitle">Update Your Accout</span>
//                     <span className="settingsDeleteTitle">Delete Accout</span>
//                 </div>
//                 <form className="settingsForm" onSubmit={handleSubmit}>
//                 <label>Profile Picture</label>
//                 <div className="settingsProfilePicture">
//                     <img src={user.profilePic}
//                             alt=""
//                         />
//                         <label htmlFor="fileInput">
//                         <i className="settingsProfileIcon far fa-user-circle"></i>
//                         </label>
//                         <input type="file" id="fileInput" style={{ display: "none" }}
//                             onChange={(e) => setFile(e.target.files[0])}
// />
//                     </div>
//                     <label >Username</label>
//                     <input type="text" placeholder={user.username}
//                     onChange={e=> setUsername(e.target.value)}
//                     />
//                     <label >Email</label>
//                     <input type="email" placeholder={user.email}
//                     onChange={e=> setEmail(e.target.value)}

//                     />
//                     <label >Password</label>
//                     <input type="password"
//                     onChange={e=> setPassword(e.target.value)}

//                     />
//                     <button className="settingsSubmit" type="submit">Update</button>
//                 </form>
//             </div>
//                 <Sidebar/>
            
//         </div>
//     )
// }
