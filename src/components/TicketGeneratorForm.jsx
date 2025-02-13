import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import SyncLoader from "react-spinners/SyncLoader";
import { validateField, validateAllFields } from "../../utils/FormValidation";
import { uploadToCloudinary } from "../../utils/handleCloudinaryUpload";
import { handleTicketDownload } from "../../utils/handleScreenShot";

import ProgressBar from "./ProgressBar";
import TicketBg from "../assets/svg/ticket-bg.svg";
import BarCode from "../assets/svg/bar_code.svg";
import TicketUser from "../assets/ticket-user.png"

// Icons
import Download from "./Icons/Download";
import Mail from "./Icons/Mail";

export const TicketGeneratorForm = () => {
  let [currentStep, setCurrentStep] = useState(() => {
    return parseInt(localStorage.getItem("currentStep")) || 1;
  });
  let [progress, setProgress] = useState(() => {
    return parseInt(localStorage.getItem("progress")) || 0;
  });
  let [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });
  let [fullName, setName] = useState(() => {
    return localStorage.getItem("fullName") || "";
  });
  let [aboutProject, setAboutProject] = useState(() => {
    return localStorage.getItem("aboutProject") || "";
  });
  let [ticketType, setTicketType] = useState(() => {
    return localStorage.getItem("ticketType") || "";
  });
  let [ticketCount, setTicketCount] = useState(() => {
    return localStorage.getItem("ticketCount") || 0;
  });

  let [ticketGen, setTicketGen] = useState(() => {
    const stored = localStorage.getItem("ticketGen");
    return stored ? JSON.parse(stored) : false;
  });
  let [file, setFile] = useState(null);
  let [cloudinaryLink, setCloudinaryLink] = useState(() => {
    return localStorage.getItem("cloudinaryLink") || "";
  });

  let ticketElement = useRef(null);
  let [errors, setErrors] = useState({});
  let [uploadError, setUploadError] = useState("");

  const override = {
    display: "flex",
    justifyContent: "center",
    borderColor: "red",
  };

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#fafafa");

  //
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
    localStorage.setItem("progress", progress);
    localStorage.setItem("email", email);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("aboutProject", aboutProject);
    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("ticketCount", ticketCount);
    localStorage.setItem("cloudinaryLink", cloudinaryLink);
    localStorage.setItem("ticketGen", JSON.stringify(ticketGen));
  }, [
    currentStep,
    progress,
    email,
    fullName,
    aboutProject,
    ticketGen,
    ticketType,
    ticketCount,
    cloudinaryLink,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    currentStep == 1
      ? setProgress(33.3)
      : currentStep == 2
      ? setProgress(66.6)
      : setProgress(100);
  }, [currentStep]);

  //
  let handleBlur = (name, value) => {
    let error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  let handleDrop = async (e) => {
    e.preventDefault();
    setLoading((l) => true);
    const uploadedFile = e.dataTransfer.files[0];
    validateField("avatar", uploadedFile);
    if (errors.avatar) {
      setLoading((l) => false);

      toast(`Please upload an avatar`, {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    const result = await uploadToCloudinary(uploadedFile);

    if (result.success) {
      setCloudinaryLink(result.url);
      setUploadError(null);
      setLoading((l) => false);
      toast("Successfully Uploaded", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      setUploadError(result.error);

      setLoading((l) => false);
      toast(`Error uploading File`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  let handleFileChange = async (e) => {
    e.preventDefault();
    setLoading((l) => true);
    const uploadedFile = e.target.files[0];
    validateField("avatar", uploadedFile);
    if (errors.avatar) {
      setLoading((l) => false);

      return;
    }

    const result = await uploadToCloudinary(uploadedFile);

    if (result.success) {
      setCloudinaryLink(result.url);
      setUploadError(null);
      setLoading((l) => false);

      toast("Successfully Uploaded", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      setUploadError(result.error);
      setLoading((l) => false);

      toast(`Error Uploading file`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  let handleFinalSteps = () => {
    const { isValid, errors } = validateAllFields(
      fullName,
      email,
      aboutProject,
      cloudinaryLink
    );
    setErrors(errors);

    if (isValid) {
      setTicketGen(true);
      setCurrentStep((s) => s + 1);
    } else {
      setCurrentStep((s) => s);
      toast("Please fill in all the fields, Thank you", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  let resetForm = () => {

    setCurrentStep((s) => (s = 1));
    setProgress((s) => (s = 33.3));
    setEmail((email) => "");
    setName((n) => "");
    setAboutProject((a) => "");
    setTicketGen((t) => false);
    setTicketType((t) => "");
    setTicketCount((t) => 0);
    setCloudinaryLink((c) => "");
  };

  return (
    <>
      <SyncLoader
        color="#fafafa"
        loading={loading}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
      />
      <div className="bg-[#041E23] border border-[#0E464F] rounded-4xl p-7 shadow-sm">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-white text-2xl font-medium">
              {currentStep == 1
                ? "Ticket Selection"
                : currentStep == 2
                ? "Attendee Details"
                : "Ready"}
            </h1>
            <span className="text-white text-sm font-roboto">{`Step ${
              currentStep == 1 ? 1 : currentStep == 2 ? 2 : 3
            }/3`}</span>
          </div>
          <ProgressBar progress={progress} />

          {currentStep == 1 && (
            <div className="bg-[#08252B] p-6 rounded-4xl border border-[#0E464F] mt-10">
              <div className="relative  p-6 mb-8 border-2 border-[#07373F] rounded-2xl bg-gradient-to-r from-[#153a45] to-[#0b242a]">
                <h2 className="text-white text-4xl lg:text-6xl font-medium mb-2 text-center font-road-rage">
                  Techember Fest ''25
                </h2>
                <p className="text-white font-light mb-4 text-center font-roboto text-base">
                  Join us for an unforgettable experience at{" "}
                  <br className="lg:flex hidden" /> [Event Name]! Secure your
                  spot now.
                </p>
                <div className="block lg:flex justify-center lg:items-center text-sm ">
                  <span className="flex justify-self-center mb-0">
                    📍
                    <span className="font-light text-white font-roboto text-base text-center lg:text-start">
                      [Event Location]
                    </span>
                  </span>

                  <span className="font-light text-white mx-4 font-roboto text-base lg:flex hidden mt-0">
                    | |
                  </span>
                  <span className="font-light text-white font-roboto text-base flex justify-self-center mt-0">
                    March 15, 2025 / 7:00 PM
                  </span>
                </div>
              </div>

              <div className="border-2 my-8 border-[#07373F]"></div>

              <div className="mb-8">
                <h3 className="text-white mb-4 font-roboto">
                  Select Ticket Type:
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 bg-[#052228] p-3 border border-[#07373F] rounded-3xl">
                  <button
                    type="button"
                    onClick={() => setTicketType((t) => "Regular")}
                    className={`hover:bg-[#197686] border-2 border-[#197686] py-2 ps-3 pb-4 rounded-xl cursor-pointer ${
                      ticketType == "Regular"
                        ? "bg-[#197686]"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="">
                      <span className="block text-start text-white font-medium font-roboto mb-3">
                        <span className=" py-1 font-roboto font-semilight text-2xl">
                          Free
                        </span>
                      </span>
                      <div>
                        <p className="text-[#fafafa] text-xl text-start font-light font-roboto">
                          REGULAR ACCESS
                        </p>
                        <p className="text-start block text-[#fafafa] font-light text-sm font-roboto mt-2">
                          20/52
                        </p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketType((t) => "VIP")}
                    className={`hover:bg-[#197686] border-2 border-[#197686] py-2 ps-3 pb-4 rounded-xl cursor-pointer ${
                      ticketType == "VIP" ? "bg-[#197686]" : "bg-transparent"
                    }`}
                  >
                    <div className="">
                      <span className="block text-start text-white font-medium font-roboto mb-3">
                        <span className=" py-1 font-roboto font-normal text-2xl">
                          $150
                        </span>
                      </span>
                      <div>
                        <p className="text-[#fafafa] block text-xl text-start font-light font-roboto">
                          VIP ACCESS
                        </p>
                        <p className=" text-start block text-[#fafafa] font-light text-sm font-roboto mt-2">
                          20 left
                        </p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketType((t) => "VVIP")}
                    className={`hover:bg-[#197686] border-2 border-[#197686] py-2 ps-3 pb-4 rounded-xl cursor-pointer ${
                      ticketType == "VVIP" ? "bg-[#197686]" : "bg-transparent"
                    }`}
                  >
                    <div className="">
                      <span className="block text-start text-white font-medium font-roboto mb-3">
                        <span className="py-1 font-roboto font-normal text-2xl">
                          $250
                        </span>
                      </span>
                      <div>
                        <p className="text-[#fafafa] block text-xl text-start font-light font-roboto">
                          VVIP ACCESS
                        </p>
                        <p className=" text-start block text-[#fafafa] font-light text-sm font-roboto mt-2">
                          20 left
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-white mb-4 font-roboto">
                  Number of Tickets
                </h3>
                <div className="p-2 rounded-lg border border-[#07373F]">
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(e.target.value)}
                    className="w-full text-white outline-none p-2 cursor-pointer font-roboto font-light"
                  >
                    <option value="0" disabled>
                      Select an option
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 md:mt-6 space-y-2 md:space-y-0 md:flex flex-row md:flex-row-reverse md:gap-4">
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  disabled={ticketType == "" || ticketCount == 0}
                  className={`w-full py-2 md:py-3 bg-[#24A0B5] text-[#fafafa] rounded-lg font-medium  transition-colors ${
                    ticketType == "" || ticketCount == 0
                      ? "cursor-not-allowed"
                      : "hover:bg-[#24A0B5]/90 cursor-pointer"
                  }`}
                >
                  Next
                </button>
                <button className="w-full py-2 md:py-3 border text-[#24A0B5] border-[#24A0B5] font-medium rounded-lg hover:bg-[#24A0B5]/10 transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {currentStep == 2 && (
            <div className="lg:bg-[#08252B] p-3 rounded-4xl lg:border lg:border-[#0E464F] mt-10">
              <div className=" bg-[#052228] p-8 border border-[#07373F] rounded-3xl">
                <p className="text-gray-300 font-roboto pb-5">
                  Upload Profile Photo
                </p>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="bg-[#07191c] flex justify-center mt-7  rounded-lg relative h-[30vh]"
                >
                  <div
                    className="flex flex-col items-center justify-center  border-4 relative bottom-[9%] border-[#24A0B5] p-6 bg-[#0E464F] text-white w-70 rounded-3xl min-h-[35vh] cursor-pointer transition "
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <Download className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-gray-300 font-roboto text-center">
                      Drag & Drop or Click to Upload
                    </p>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg"
                      required
                    />
                  </div>
                </div>
                {cloudinaryLink && (
                  <div className="flex justify-center mt-7">
                    <p className="text-white/40">{cloudinaryLink}</p>
                  </div>
                )}

                {errors?.avatar && (
                  <p className="text-red-300 text-sm">{errors?.avatar}</p>
                )}
              </div>

              <div className="border-2 my-8 border-[#07373F]"></div>

              <div>
                <div className="mb-4">
                  <label className="block font-normal text-gray-300 mb-2 font-roboto">
                    Enter Your Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setName(e.target.value)}
                    onInput={(e) => handleBlur("fullName", e.target.value)}
                    onBlur={(e) => handleBlur("fullName", e.target.value)}
                    aria-describedby="fullName"
                    placeholder="Victory . E"
                    required
                    className="w-full p-2 rounded-lg border border-[#07373F] font-roboto text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A505C]"
                  />
                  {errors?.fullName && (
                    <p className="text-red-300 text-sm">{errors?.fullName}</p>
                  )}
                </div>
                <div className="mb-4 relative">
                  <label className="block font-normal text-gray-300 mb-2 font-roboto">
                    Enter Your email *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onInput={(e) => handleBlur("email", e.target.value)}
                      onBlur={(e) => handleBlur("email", e.target.value)}
                      aria-describedby="email"
                      placeholder="hello@avioflagos.io"
                      required
                      className="w-full p-2 rounded-lg border border-[#07373F] font-roboto text-gray-300 focus:outline-none pl-9 focus:ring-2 focus:ring-[#0A505C]"
                    />
                    <Mail className="text-white size-6 absolute bottom-2 left-2" />
                  </div>
                  {errors?.email && (
                    <p className="text-red-300 text-sm">{errors?.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-normal text-gray-300 mb-2 font-roboto">
                    About the Project
                  </label>
                  <textarea
                    value={aboutProject}
                    onChange={(e) => setAboutProject(e.target.value)}
                    onInput={(e) => handleBlur("aboutProject", e.target.value)}
                    onBlur={(e) => handleBlur("aboutProject", e.target.value)}
                    placeholder="Textarea"
                    required
                    className="w-full h-32 p-3 rounded-lg border border-[#07373F] font-roboto text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A505C] bg-transparent"
                  ></textarea>
                  {errors?.aboutProject && (
                    <p className="text-red-300 text-sm">
                      {errors?.aboutProject}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 md:mt-6 space-y-2 md:space-y-0 md:flex flex-row md:flex-row-reverse md:gap-4">
                <button
                  onClick={() => handleFinalSteps()}
                  className={`w-full py-2 md:py-3 bg-[#24A0B5] text-[#fafafa] rounded-lg font-medium hover:bg-[#24A0B5]/90 transition-colors cursor-pointer`}
                >
                  Get My Free Ticket
                </button>
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="w-full py-2 md:py-3 border text-[#24A0B5] border-[#24A0B5] font-medium rounded-lg hover:bg-[#24A0B5]/10 transition-colors cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {currentStep == 3 && (
            <div className=" md:p-6 lg:p-8 rounded-2xl md:rounded-4xl mt-4 md:mt-8 lg:mt-10 max-w-xs lg:max-w-7xl mx-auto">
              <h3 className="font-alatsi text-center text-[#fafafa] text-2xl md:text-3xl lg:text-4xl">
                Your Ticket is Booked
              </h3>
              <p className="font-roboto text-center text-[#fafafa] font-normal mt-2 md:mt-3 text-sm md:text-base">
                Check your email for a copy or you can download
              </p>

              <div
                className="mt-4 md:mt-8 flex justify-center relative"
                ref={ticketElement}
              >
                <img
                  src={TicketBg}
                  alt=""
                  className="min-h-[50vh] min-w-xs lg:min-w-md"
                />
                <div className="w-full sm:aspect-auto aspect-[0.6/1] md:aspect-[2/4] lg:aspect-[5/6] absolute">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-[18rem] md:max-w-md lg:max-w-sm p-4 md:p-6 lg:p-8 border-2 border-[#07373F] rounded-xl md:rounded-2xl bg-gradient-to-r from-[#153a45] to-[#0b242a]">
                      <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mb-2 text-center font-road-rage">
                        Techember Fest '25
                      </h2>

                      <div className="space-y-2 md:space-y-3">
                        <p className="flex justify-center items-center">
                          <span className="text-white font-roboto text-xs md:text-sm lg:text-base">
                            📍 04 Rumens road, Ikoyi, Lagos
                          </span>
                        </p>

                        <p className="flex justify-center items-center">
                          <span className="text-white font-roboto  text-xs md:text-sm lg:text-base">
                            📅 March 15, 2025 | 7:00 PM
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 md:mt-6 flex justify-center">
                        <img
                          src={cloudinaryLink}
                          alt=""
                          className="size-15 md-size-40 lg:size-50"
                        />

                        {!cloudinaryLink && (
                          <img
                            src={TicketUser}
                            alt=""
                            className="size-15 md-size-40 lg:size-50"
                          />
                        )}
                      </div>

                      <div className="bg-[#08343C] p-2 md:p-2 rounded-xl mt-2 md:mt-6">
                        <div className="grid grid-cols-2">
                          <div className="border border-thin border-white/10 border-s-0 border-t-0 p-1 md:p-1">
                            <p className="text-xs text-white/30 font-roboto">
                              Name
                            </p>
                            <p className="text-white text-xs mt-1 md:text-base font-roboto truncate">
                              {fullName}
                            </p>
                          </div>
                          <div className="border border-white/10 border-e-0 border-t-0 p-2 md:p-1">
                            <p className="text-xs text-white/30 font-roboto">
                              Email
                            </p>
                            <p className="text-white text-xs mt-1 md:text-sm font-roboto font-light truncate">
                              {email}
                            </p>
                          </div>
                          <div className="border border-white/10 p-2 border-s-0 border-t-0">
                            <p className="text-xs text-white/30 font-roboto">
                              Ticket Type
                            </p>
                            <p className="text-white mt-1 text-xs md:text-base font-roboto font-light">
                              {ticketType}
                            </p>
                          </div>
                          <div className="border border-white/10 p-2 border-e-0 border-t-0">
                            <p className="text-xs text-white/30 font-roboto">
                              Ticket For
                            </p>
                            <p className="text-white text-sm md:text-base font-roboto font-light truncate">
                              {ticketCount}
                            </p>
                          </div>
                        </div>
                        <div className="p-2 mt-2">
                          <p className="text-xs text-white/30 font-roboto">
                            Special Request
                          </p>
                          <p className="text-white text-xs md:text-base font-roboto font-light line-clamp-3">
                            {aboutProject}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src={BarCode}
                  alt=""
                  className="absolute bottom-2 lg:bottom-10"
                />
              </div>

              <div className="mt-4 md:mt-6 space-y-2 lg:space-y-0 md:flex flex-row md:flex-row-reverse lg:gap-4">
                <button
                  onClick={() => handleTicketDownload(ticketElement.current)}
                  className="w-full py-2 md:py-3 bg-[#24A0B5] text-[#fafafa] rounded-lg font-medium hover:bg-[#24A0B5]/90 transition-colors cursor-pointer"
                >
                  Download Ticket
                </button>
                <button
                  onClick={() => resetForm()}
                  className="w-full py-2 md:py-3 border text-[#24A0B5] border-[#24A0B5] font-medium rounded-lg hover:bg-[#24A0B5]/10 transition-colors cursor-pointer"
                >
                  Book another Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
