import React from "react";
import playStore from "../assets/google-play-store-logo.png"; 

function DownloadApk() {

  return (
    <div className="max-h-[100vh] mt-5 bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col items-center justify-center px-6 py-16 rounded-2xl">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#076506] text-center mb-4">
        Reparv Territory Partner App
      </h1>
      <p className="text-gray-700 text-lg md:text-xl text-center max-w-2xl mb-8">
        Manage property leads, visits, and clients seamlessly with{" "}
        <span className="font-semibold text-[#00b501]">Reparv</span>.  
        Stay updated, organized, and grow your territory sales efficiently!
      </p>

      {/* Play Store Redirect */}
      <div className="relative">
        <img
          src={playStore}
          onClick={()=>{
            window.open("https://play.google.com/store/apps/details?id=com.newreparvterritory_app","_blank")
          }}
          alt="Reparv App Preview"
          className="w-40 md:w-50 drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-200 cursor-pointer"
        />
      </div>

      {/* Tagline */}
      <p className="mt-4 text-gray-600 text-base text-center">
        “Organize Your Territory. Close Deals Faster. Partner with{" "}
        <span className="font-semibold text-[#00b501]">Reparv</span>.”
      </p>

      {/* Footer */}
      <p className="mt-6 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} Reparv Technologies — All Rights Reserved
      </p>
    </div>
  );
}

export default DownloadApk;