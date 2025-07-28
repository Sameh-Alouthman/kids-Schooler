import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaUser,
  FaMedal,
  FaUserGraduate,
  FaEdit,
} from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

const ProfilePage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Please login to view your profile");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5300/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudent(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    setError("");
    setSuccess("");

    axios
      .patch("http://localhost:5300/api/users/editProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSuccess("Profile updated successfully!");
        setEditOpen(false);
        setStudent((prev) => ({ ...prev, ...formData }));
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Update failed.");
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await axios.post(
        "http://localhost:5300/api/upload",
        formData
      );
      const imageUrl = res.data.url;
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImage(imageUrl); // لتحديث الصورة في الصفحة مباشرة
      setUploading(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Image upload failed");
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] font-sans">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center mb-16 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-[#bb4fa9] mx-auto">
            {student.image ? (
              <img
                src={student.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#bb4fa9] text-white flex items-center justify-center text-4xl">
                <FaUserGraduate />
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-[#bb4fa9] mb-1">
            {student.name}
          </h2>
          {/* <p className="text-gray-600 flex items-center justify-center gap-2">
            <FaUser /> ID: {student._id}
          </p> */}
          <p className="text-gray-600 flex items-center justify-center gap-2 mt-1">
            <FaEnvelope /> {student.email}
          </p>
          <p className="text-gray-600 mt-1">Age: {student.age || "N/A"}</p>

          <button
            onClick={() => setEditOpen(true)}
            className="absolute top-6 right-6 bg-[#f0c96a] hover:bg-[#e7b94f] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow"
          >
            <FaEdit /> Edit
          </button>
        </div>

        {/* Badges */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#bb4fa9] mb-8  text-center">
            🎖️ Badges
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {
              // student.badges || []
              ["Math Master", "Grammar Star", "Fast Learner"].map(
                (badge, index) => (
                  <div
                    key={index}
                    className="bg-[#f0c96a] text-white px-4 py-2 rounded-full shadow-md font-semibold flex items-center gap-2"
                  >
                    <FaMedal className="text-white" />
                    {badge}
                  </div>
                )
              )
            }
          </div>
        </div>

        {/* Progress */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#bb4fa9] mb-8">
            📈 Progress
          </h3>
          <div className="relative w-full bg-gray-200 rounded-full h-8 max-w-xl mx-auto shadow-inner">
            <div
              className="bg-[#bb4fa9] h-8 rounded-full text-white flex items-center justify-center text-sm font-semibold transition-all duration-500"
              style={{ width: `${student.progress || 45}%` }}
            >
              {student.progress || 45}%
            </div>
          </div>
        </div>

        {/* Success message */}
        {success && (
          <p className="text-center text-green-600 mt-6 font-semibold">
            {success}
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-white/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#bb4fa9] mb-4 text-center">
              Edit Profile
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="cursor-pointer text-[#bb4fa9] font-semibold">
                  <FaCamera className="inline mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>

              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border-2 border-[#bb4fa9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0c96a] text-[#bb4fa9]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border-2 border-[#bb4fa9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0c96a] text-[#bb4fa9]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-3 border-2 border-[#bb4fa9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0c96a] text-[#bb4fa9]"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#bb4fa9] text-white hover:bg-[#a23c90]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

// import React from "react";
// import { FaEnvelope, FaUser, FaMedal, FaUserGraduate } from "react-icons/fa";

// const student = {
//   name: "Lina Youssef",
//   id: "STU12345",
//   email: "lina@example.com",
//   badges: ["Math Master", "Grammar Star", "Fast Learner"],
//   progress: 75, // out of 100
// };

// const ProfilePage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fff3f9] to-[#dbeffe] font-sans">
//       {/* <Navbar /> */}
//       <div className="max-w-4xl mx-auto px-6 py-32">
//         {/* Profile Header */}
//         <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center mb-10">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-24 h-24 bg-[#bb4fa9] text-white flex items-center justify-center rounded-full shadow-lg text-4xl">
//               <FaUserGraduate />
//             </div>
//           </div>
//           <h2 className="text-3xl font-bold text-[#bb4fa9] mb-1">
//             {student.name}
//           </h2>
//           <p className="text-gray-600 flex items-center justify-center gap-2">
//             <FaUser /> ID: {student.id}
//           </p>
//           <p className="text-gray-600 flex items-center justify-center gap-2 mt-1">
//             <FaEnvelope /> {student.email}
//           </p>
//         </div>

//         {/* Badges Section */}
//         <div className="mb-10">
//           <h3 className="text-2xl font-bold text-[#bb4fa9] mb-4 text-center">
//             🎖️ Badges
//           </h3>
//           <div className="flex flex-wrap justify-center gap-4">
//             {student.badges.map((badge, index) => (
//               <div
//                 key={index}
//                 className="bg-[#f0c96a] text-white px-4 py-2 rounded-full shadow-md font-semibold flex items-center gap-2"
//               >
//                 <FaMedal className="text-white" />
//                 {badge}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Progress Section */}
//         <div className="text-center">
//           <h3 className="text-2xl font-bold text-[#bb4fa9] mb-4">
//             📈 Progress
//           </h3>
//           <div className="relative w-full bg-gray-200 rounded-full h-8 max-w-xl mx-auto shadow-inner">
//             <div
//               className="bg-[#bb4fa9] h-8 rounded-full text-white flex items-center justify-center text-sm font-semibold transition-all duration-500"
//               style={{ width: ${student.progress}% }}
//             >
//               {student.progress}%
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default ProfilePage;
