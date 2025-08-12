import { useState, useRef } from "react";
import axios from "axios";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.endsWith(".zip")) {
      setFile(selected);
      setStatus("");
    } else {
      setFile(null);
      setStatus("Please upload a valid .zip file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(` Upload successful: ${res.data.message}`);

      // Clear input after success
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Upload .zip File</h2>

      <input
        type="file"
        accept=".zip"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-2"
      />

      {file && <p className="text-sm text-gray-600">Selected file: {file.name}</p>}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}

