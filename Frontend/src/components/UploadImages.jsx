import { useState } from 'react';
import axios from 'axios';

function UploadImages() {
const [file, setFile] = useState(null);
const [url, setUrl] = useState("");
const [loading, setLoading] = useState(false);
const token = localStorage.getItem("authToken");

const handleUpload = async () => {
  if (!file) return alert("يرجى اختيار صورة أولاً");

  const formData = new FormData();
  formData.append("image", file);

  try {
    setLoading(true);
    const res = await axios.post("http://localhost:5300/api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUrl(res.data.url);
  } catch (err) {
  console.error("خطأ أثناء الرفع:", err);
  if (err.response) {
    console.error("Response data:", err.response.data);
    console.error("Status:", err.response.status);
    console.error("Headers:", err.response.headers);
  } else if (err.request) {
    console.error("Request error:", err.request);
  } else {
    console.error("Message:", err.message);
  }

  alert("حدث خطأ أثناء رفع الصورة");
} finally {
    setLoading(false);
  }
};

return (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4 bg-gray-100">
    <h1 className="text-2xl font-bold">رفع صورة إلى Cloudinary</h1>

    <input
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files[0])}
      className="border p-2 rounded bg-white"
    />

    <button
      onClick={handleUpload}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      disabled={loading}
    >
      {loading ? "جاري الرفع..." : "رفع الصورة"}
    </button>

    {url && (
      <div className="mt-4">
        <p className="text-green-600 font-semibold mb-2">تم رفع الصورة:</p>
        <img src={url} alt="Uploaded" className="w-64 rounded shadow-md" />
      </div>
    )}
  </div>
);
}

export default UploadImages
