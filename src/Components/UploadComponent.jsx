import { useState } from "react";
import { useDropzone } from "react-dropzone"; // Import useDropzone
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

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages([...images, ...uploadedImages]);

    // Simulate upload progress (for demonstration)
    simulateUploadProgress(uploadedImages.length);
  };

  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200); // Adjust speed of progress here
  };

  const handleDownload = () => {
    // Logic for downloading images or processing them
  };

  const handleLocalUpload = () => {
    document.getElementById("imageUpload").click();
  };

  const handleGoogleDriveUpload = () => {
    alert("Google Drive upload clicked! Implement the logic here.");
  };

  const handlePhotosUpload = () => {
    alert("Photos upload clicked! Implement the logic here.");
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
    setImages([...images, ...droppedFiles]);
    simulateUploadProgress();
  };

  return (
    <div className="min-h-screen text-white flex flex-col pb-[280]">
      <div className="flex-grow flex flex-col p-5 items-center justify-center space-y-6 mt-[-20px]">
        <div className=" text-center">
          <div className="flex flex-row justify-center w-[1048px]">
            {/* Buttons for different upload sources */}
            <button
              onClick={handleGoogleDriveUpload}
              className="m-[0_27px_91px_0] flex items-center justify-center flex-col"
            >
              <img
                className="text-white text-2xl w-[50px] h-[30px]"
                style={{ filter: "invert(1)" }}
                src={GooglePhotos}
              />
              <span className="text-white mt-2">Google Photos</span>
            </button>
            <button
              onClick={handleLocalUpload}
              className="m-[50px_20px_0_0] w-[153px] h-[151px] flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faFolder}
                className="text-white text-4xl"
              />
              <span className="text-white mt-2">Local Upload</span>
            </button>
            <button
              onClick={handlePhotosUpload}
              className="m-[2px_0_87.4px_0] w-[119px] h-[116.6px] flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faGoogleDrive}
                className="text-white text-4xl"
              />
              <span className="text-white mt-2">Google Drive</span>
            </button>
          </div>
          <h1 className="text-6xl font-bold mb-6 p-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Upload Images
          </h1>

          {/* Drag and Drop Area */}
          <div className="flex items-center justify-center">
            <div
              className={`p-12 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center transition-all duration-300 bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer ${
                isDragging ? "scale-105 bg-gray-800/70 border-purple-500" : ""
              } sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/2`} // Responsive width
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mb-4 text-purple-500" />
              <p className="text-lg mb-2 text-center">
                Drag and drop your images here
              </p>
              <p className="text-sm text-gray-400 text-center">or</p>
              <button
                onClick={() => document.getElementById("imageUpload").click()}
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
          </div>

          {/* Display uploaded images */}
          <div className="grid grid-cols-4 gap-4 mt-10">
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

          {/* Progress Bar */}
          <div className="flex justify-center mb-10">
            <div className="w-2/3 h-2 bg-gray-800 rounded-full">
              <div
                className="h-full bg-pink-500 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Zip File Info */}
          <div className="flex justify-center mb-6 px-4">
            <div className="shadow-[0px_0px_27px_0px_rgba(173,40,40,0.48)] rounded-[16px] bg-[linear-gradient(rgba(22,4,8,0.5),rgba(22,4,8,0.5))] m-[0_0_0_3.3px] flex p-[8px_7px_8px_6px] w-full max-w-[796px] box-border">
              <div className="rounded-[12px] border-[1px_solid_rgba(255,255,255,0.1)] bg-[linear-gradient(rgba(22,4,8,0.96),rgba(22,4,8,0.96))] flex flex-col sm:flex-row justify-between p-[6.5px_20px_8px_20px] w-full h-[fit-content] box-border">
                {/* File Info Section */}
                <div className="flex flex-col mb-4 sm:mb-0 box-border">
                  <div className="mb-[8.5px] inline-block self-start break-words font-['Inter'] font-semibold text-[18px] sm:text-[20px] leading-[1.35] text-[#FFFFFF]">
                    Zip File Name
                  </div>
                  <span className="break-words font-['Inter'] font-normal text-[14px] sm:text-[16px] leading-[1.5] text-[rgba(255,238,247,0.8)]">
                    Size -- Number of images
                  </span>
                </div>

                {/* Download Section */}
                <div className="rounded-[8px] bg-[linear-gradient(92.96deg,rgba(255,91,55,0.1),rgba(171,0,82,0.1))] flex items-center justify-center sm:justify-start p-[7.5px_16.1px] w-full sm:w-[114.1px] box-border">
                  <span
                    onClick={handleDownload}
                    className="mr-2 break-words font-['Inter'] font-normal text-[14px] leading-[1.15] bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1))] text-[grey] bg-clip-text cursor-pointer"
                  >
                    Download
                  </span>
                  <div className="flex items-center justify-center w-[14px] h-[14px]">
                    <img
                      className="w-[9.2px] h-[5.7px] rotate-[-90deg]"
                      src={downloadIcon}
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
