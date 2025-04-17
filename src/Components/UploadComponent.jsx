import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import GooglePhotos from "../assets/googlephotos.svg";
import downloadIcon from "../assets/download.svg";
import { Upload } from "react-feather";


export default function UploadComponent() {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedImages = localStorage.getItem("uploadedImages");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...uploadedImages]);
    simulateUploadProgress();
  };

  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    }, 150);
  };

  const handleDownload = () => {
    alert("Download functionality here.");
  };

  const handleLocalUpload = () => {
    document.getElementById("imageUpload").click();
  };

  const handleGoogleDriveUpload = () => {
    alert("Google Drive upload clicked!");
  };

  const handlePhotosUpload = () => {
    alert("Google Photos upload clicked!");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    const imageURLs = droppedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageURLs]);
    simulateUploadProgress();
  };

  return (
    <div className="min-h-screen text-white flex flex-col pb-28 items-center">
      <div className="flex-grow flex flex-col p-5 w-full max-w-[1048px] items-center space-y-6">
        {/* Upload Options */}
        <div className="flex justify-center gap-12 mb-8">
          <button onClick={handlePhotosUpload} className="flex flex-col items-center hover:scale-105 transition">
            <img src={GooglePhotos} alt="Google Photos" className="w-[40px] h-[40px] filter invert" />
            <span className="mt-2 text-sm">Google Photos</span>
          </button>

          <button onClick={handleLocalUpload} className="flex flex-col items-center hover:scale-105 transition">
            <FontAwesomeIcon icon={faFolder} className="text-white text-4xl" />
            <span className="mt-2 text-sm">Local Upload</span>
          </button>

          <button onClick={handleGoogleDriveUpload} className="flex flex-col items-center hover:scale-105 transition">
            <FontAwesomeIcon icon={faGoogleDrive} className="text-white text-4xl" />
            <span className="mt-2 text-sm">Google Drive</span>
          </button>
        </div>

        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Upload Images
        </h1>

        {/* Drag and Drop */}
        <div
          className={`w-full max-w-[1048px] border-2 border-dashed border-gray-500 p-12 rounded-xl flex flex-col items-center justify-center transition-all duration-300 bg-transparent hover:bg-gray-800/20 cursor-pointer ${
            isDragging ? "scale-105 border-purple-500 bg-gray-800/10" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mb-4 text-purple-500" />
          <p className="text-lg mb-2">Drag and drop your images here</p>
          <p className="text-sm text-gray-400">or</p>
          <button
            onClick={handleLocalUpload}
            className="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            Browse Files
          </button>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
            accept="image/*"
          />
        </div>

        {/* Gallery */}
        {images.length > 0 && (
          <div className="w-full max-w-[1048px] mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-800 h-32 flex items-center justify-center rounded-lg"
                >
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="w-full max-w-[1048px] mt-8">
            <div className="w-full h-2 bg-gray-800 rounded-full">
              <div
                className="h-full bg-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Zip Section */}
        <div className="w-full max-w-[1048px] mt-14">
          <div className="shadow-[0px_0px_27px_0px_rgba(173,40,40,0.48)] rounded-[16px] bg-[linear-gradient(rgba(22,4,8,0.5),rgba(22,4,8,0.5))] p-[8px_7px_8px_6px] box-border">
            <div className="rounded-[12px] border border-white/10 bg-gray-900/90 flex flex-col sm:flex-row justify-between p-4 w-full">
              <div className="flex flex-col mb-4 sm:mb-0">
                <div className="text-lg font-semibold">Zip File Name</div>
                <span className="text-sm text-pink-100/80">Size -- Number of images</span>
              </div>
              <div className="rounded bg-pink-500/10 flex items-center justify-center px-4 py-2 cursor-pointer">
                <span onClick={handleDownload} className="text-gray-200 mr-2 text-sm">
                  Download
                </span>
                <img
                  className="w-[9.2px] h-[5.7px] rotate-[-90deg]"
                  src={downloadIcon}
                  alt="download"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
