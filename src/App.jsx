import { Link } from "react-router-dom";
import bg1 from "./assets/bg1.png";
import note1 from "./assets/note1.png";
import bg2 from "./assets/bg2.png";
import bg3 from "./assets/bg3.png";
import note2 from "./assets/note2.png";
import note3 from "./assets/note3.png";
import note4 from "./assets/note4.png";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [referModel, setReferModel] = useState(false);
  const [referrerName, setReferrerName] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [refereeName, setRefereeName] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [courseName, setCourseName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRefer = () => {
    setReferModel(true);
  };

  const closePanel = () => {
    setReferModel(false);
    setReferrerName("");
    setReferrerEmail("");
    setRefereeEmail("");
    setRefereeName("");
    setCourseName("");
    setMessage("");
    setLoading(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(referrerEmail)) {
      toast.error("Invalid referrer email format");
      return;
    }
    if (!emailRegex.test(refereeEmail)) {
      toast.error("Invalid referee email format");
      return;
    }
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/refer`,
      {
        referrerName: referrerName,
        referrerEmail: referrerEmail,
        refereeName: refereeName,
        refereeEmail: refereeEmail,
        courseName: courseName,
        message: message,
      }
    );
    if (response.data.status == 200) {
      toast.success("Referral sent successfully...");
      setReferrerName("");
      setReferrerEmail("");
      setRefereeEmail("");
      setRefereeName("");
      setCourseName("");
      setMessage("");
      setReferModel(false);
    } else if (response.data.status == 400) {
      toast.error("User has already been referred");
    } else if (response.data.status == 401) {
      toast.error("Some error occured while referring");
    } else if (response.data.status == 500) {
      toast.error("Internal Server Error...");
    } else if (response.data.status == 402) {
      toast.error("Incorrect Referrer Email");
    } else if (response.data.status == 403) {
      toast.error("Incorrect Referee Email");
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        {/* Top Bar */}
        <div className="flex flex-wrap gap-2 items-center bg-blue-100 w-full justify-center py-2 font-medium mx-auto">
          <p className="lg:text-sm md:text-sm text-xs text-center">
            Navigate your ideal career path with tailored expert advice
          </p>
          <a href="#" className="text-blue-500 lg:text-sm text-[13px]">
            Contact Expert
          </a>
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-between shadow-lg md:shadow-none items-center px-6 md:px-10 lg:px-40 py-5">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <h1 className="text-blue-500 text-3xl font-bold mb-0">
                accredian
              </h1>
              <p className="text-xs text-gray-600">credentials that matter</p>
            </div>
            <button className="text-white md:flex items-center md:visible hidden  bg-blue-500 px-4 py-2 rounded-lg">
              Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex gap-4">
            <div className="hidden md:flex items-center gap-6">
              <Link to="/refer&earn">Refer & Earn</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/aboutUs">About Us</Link>
            </div>
            <button className="bg-gray-200 px-4 py-2 rounded-lg">Login</button>
            <button className="text-white bg-blue-500 px-4 py-2 rounded-lg">
              Try for free
            </button>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden flex justify center gap-3 items-center">
            <button className="bg-blue-500 flex items-center gap-2 text-white px-3 py-2">
              Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white font-extrabold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg md:hidden">
              <Link to="/refer&earn" className="block py-2">
                Refer & Earn
              </Link>
              <Link to="/resources" className="block py-2">
                Resources
              </Link>
              <Link to="/aboutUs" className="block py-2">
                About Us
              </Link>
              <button className="bg-gray-200 w-full px-4 py-2 rounded-lg mt-2">
                Login
              </button>
              <button className="text-white bg-blue-500 w-full px-4 py-2 rounded-lg mt-2">
                Try for free
              </button>
            </div>
          )}
        </nav>

        <div className="flex justify-center items-center mt-5">
          <div className="flex gap-2 text-sm bg-blue-100 w-[30%] min-w-[400px] text-gray-800 rounded-full justify-between py-2 px-8">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center group">
                <button
                  onClick={() => {
                    handleScroll("refer");
                  }}
                  className="hover:text-blue-500 hover:font-semibold cursor-pointer"
                >
                  Refer
                </button>
                <p className="invisible -translate-y-5 text-blue-500 font-semibold text-xl group-hover:visible h-0 mt-0">
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center group">
                <button
                  onClick={() => {
                    handleScroll("benefits");
                  }}
                  className="hover:text-blue-500 hover:font-semibold cursor-pointer"
                >
                  Benefits
                </button>
                <p className="invisible -translate-y-5 text-blue-500 font-semibold text-xl group-hover:visible h-0 mt-0">
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center group">
                <button
                  onClick={() => {
                    handleScroll("faqs");
                  }}
                  className="hover:text-blue-500 hover:font-semibold cursor-pointer"
                >
                  FAQs
                </button>
                <p className="invisible -translate-y-5 text-blue-500 font-semibold text-xl group-hover:visible h-0 mt-0">
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center group">
                <button
                  onClick={() => {
                    handleScroll("support");
                  }}
                  className="hover:text-blue-500 hover:font-semibold cursor-pointer"
                >
                  Support
                </button>
                <p className="invisible -translate-y-5 text-blue-500 font-semibold text-xl group-hover:visible h-0 mt-0">
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="mt-5 relative px-3">
          {/* Mobile version (for small devices) */}
          <div className="block lg:hidden w-full bg-blue-50 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] p-6 relative overflow-hidden">
            {/* Money decorations */}
            <img
              src={note1}
              alt="Money"
              className="w-16 h-16 absolute top-0 left-0"
            />
            <img
              src={note3}
              alt="Money"
              className="w-16 h-16 absolute top-0 right-0"
            />
            <img
              src={note4}
              alt="Money"
              className="w-16 h-16 absolute bottom-0 left-0"
            />
            <img
              src={note2}
              alt="Money"
              className="w-16 h-16 absolute -bottom-1 right-0"
            />

            {/* Content */}
            <div className="text-center py-6 z-10 relative">
              <h1 className="font-bold text-3xl leading-tight mb-3">
                Let&apos;s Learn & Earn
              </h1>
              <p className="text-black-600 mb-4">
                Get a chance to win up-to{" "}
                <span className="text-blue-500 font-bold">Rs. 15,000</span>
              </p>
              <button
                onClick={() => setReferModel(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition"
              >
                Refer Now
              </button>
            </div>
          </div>

          {/* Desktop version (your original code) */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Floating money decorations */}
            <img
              src={note1}
              alt="Money"
              className="w-18 h-18 z-20 absolute top-1/20000 left-1/5 translate-x-2"
            />

            <div className="flex justify-center items-center shadow-[0_0_15px_rgba(0,0,0,0.2)] relative z-10 w-[60%] bg-blue-50 rounded-2xl px-4">
              <div className="w-[35%] flex flex-col justify-between py-6">
                <div>
                  {/* This div is intentionally empty to match spacing */}
                </div>
                <div>
                  <div className="pr-5 mb-10">
                    <h1 className="font-bold text-5xl leading-tight mb-6">
                      Let&apos;s Learn <br />
                      &amp; Earn
                    </h1>
                    <p className="text-black-600 text-2xl">
                      Get a chance to win <br />
                      up-to{" "}
                      <span className="text-blue-500 font-bold text-3xl">
                        Rs. 15,000
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => setReferModel(true)}
                    className="bg-blue-500 w-[50%] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition"
                  >
                    Refer Now
                  </button>
                </div>
              </div>

              {/* Right Content */}
              <div className="w-[65%]">
                <img
                  src={bg1}
                  alt="Main Content"
                  className="w-full object-contain z-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-blue-100 w-full flex flex-col justify-center items-center mt-10 mb-10 py-6 px-4"
          id="refer"
        >
          <div>
            <p className="font-medium text-center text-lg md:text-xl">
              How Do I <span className="text-blue-500">Refer?</span>
            </p>
          </div>

          {/* Show bg3 on small screens */}
          <img src={bg3} alt="Money" className="z-20 py-0 w-3/4 md:hidden" />

          {/* Show bg2 on medium and larger screens */}
          <img
            src={bg2}
            alt="Money"
            className="z-20 hidden w-3/4 md:block translate-x-2 py-10 "
          />

          <button
            className="bg-blue-500 px-6 md:px-10 py-2 rounded-md text-lg md:text-sm hover:bg-blue-600 transition cursor-pointer text-white"
            onClick={handleRefer}
          >
            Refer now
          </button>
        </div>

        <div
          className="bg-white hidden  w-full md:flex flex-col justify-center items-center mt-10 mb-30 py-6"
          id="benefits"
        >
          <div className="mb-8">
            <p className="font-medium text-xl">
              What Are The{" "}
              <span className="text-blue-500">Referral Benefits?</span>
            </p>
          </div>

          {/* Referral Benefits Table */}
          <div className="w-full max-w-5xl mb-10">
            <div className="flex justify-end items-center mb-2">
              <span className="mr-2">Enrolled</span>
              <div className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out rounded-full bg-blue-500">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out"></span>
              </div>
            </div>

            <div>
              {/* Sidebar Navigation and Main Content */}
              <div className="flex gap-10">
                {/* Sidebar Navigation */}
                <div className="w-1/4 bg-white rounded-2xl shadow-2xl">
                  <div className="bg-blue-500 text-white p-3 flex items-center justify-between font-bold rounded-t-2xl">
                    <span>ALL PROGRAMS</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white font-extrabold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                  {/* Navigation Items */}
                  {[
                    "PRODUCT MANAGEMENT",
                    "STRATEGY & LEADERSHIP",
                    "BUSINESS MANAGEMENT",
                    "FINTECH",
                    "SENIOR MANAGEMENT",
                    "DATA SCIENCE",
                    "DIGITAL TRANSFORMATION",
                    "BUSINESS ANALYTICS",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-3 flex justify-between items-center hover:bg-gray-50 ${
                        (index === 7 ? "rounded-b-2xl" : "",
                        index === 7 ? "border-none" : "border-b")
                      }`}
                    >
                      <span className="text-sm font-bold text-gray-700 py-2">
                        {item}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Table Content */}
                <div className="w-3/4 border rounded-xl shadow-xl border-gray-300 overflow-hidden">
                  {/* Table Header */}
                  <div className="flex bg-blue-300 text-blue-900 font-medium">
                    <div className="w-1/2 p-4 border-r ">Programs</div>
                    <div className="w-1/4 p-4 text-center border-r">
                      Referrer Bonus
                    </div>
                    <div className="w-1/4 p-4 text-center">Referee Bonus</div>
                  </div>

                  {/* Table Rows */}
                  {[
                    {
                      name: "Professional Certificate Program in Product Management",
                      referrer: "₹ 7,000",
                      referee: "₹ 9,000",
                    },
                    {
                      name: "PG Certificate Program in Strategic Product Management",
                      referrer: "₹ 9,000",
                      referee: "₹ 11,000",
                    },
                    {
                      name: "Executive Program in Data Driven Product Management",
                      referrer: "₹ 10,000",
                      referee: "₹ 10,000",
                    },
                    {
                      name: "Executive Program in Product Management and Digital Transformation",
                      referrer: "₹ 10,000",
                      referee: "₹ 10,000",
                    },
                    {
                      name: "Executive Program in Product Management",
                      referrer: "₹ 10,000",
                      referee: "₹ 10,000",
                    },
                    {
                      name: "Advanced Certification in Product Management",
                      referrer: "₹ 10,000",
                      referee: "₹ 10,000",
                    },
                    {
                      name: "Executive Program in Product Management and Project Management",
                      referrer: "₹ 10,000",
                      referee: "₹ 10,000",
                    },
                  ].map((program, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center bg-blue-50 last:border-b-0"
                    >
                      <div className="w-1/2 flex items-start p-4 border-r">
                        <div className="mr-2 text-blue-500 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div className="pr-3">
                          <div className="text-sm text-gray-800">
                            {program.name}
                          </div>
                        </div>
                      </div>

                      {/* Referrer Bonus with continuous border */}
                      <div
                        className={`w-1/4 h-full p-4 border-r vertical-line ${
                          index === 8 ? "translate-y-5" : ""
                        }`}
                      >
                        <div className="w-full text-center text-sm text-gray-700">
                          {program.referrer}
                        </div>
                      </div>

                      {/* Referee Bonus */}
                      <div className="w-1/4 p-4 text-center text-sm text-gray-700">
                        {program.referee}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="border border-gray-300 rounded-md px-4 py-2 text-gray-600 flex items-center">
                Show More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={() => setReferModel(true)}
              className="bg-blue-500 px-12 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer text-white font-medium"
            >
              Refer Now
            </button>
          </div>
        </div>

        <p
          className="text-2xl hidden md:flex justify-center items-center text-center font-bold mb-4"
          id="faqs"
        >
          Frequently Asked{" "}
          <span className="text-blue-500 ml-2"> Questions</span>
        </p>

        <div className="md:flex justify-center hidden items-start">
          <div className="bg-white w-[80%] flex mt-10 mb-10 py-6">
            <div className="flex flex-col gap-4 w-[20%]">
              <button className="px-4 py-3 bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-lg font-medium text-blue-500">
                Eligibility
              </button>
              <button className="px-4 py-3 border-2 text-gray-600 rounded-lg font-medium">
                How To Use?
              </button>
              <button className="px-4 py-3 border-2 text-gray-600 rounded-lg font-medium">
                Terms & Conditions
              </button>
            </div>

            <div className="w-[80%] pl-10">
              <div className="text-sm">
                <p className="text-blue-500 text-sm font-bold mb-6">
                  Do I need to have prior Product Management and Project
                  Management experience to enroll in the program?
                </p>
                <p className="text-gray-700 mb-6">
                  No, the program is designed to be inclusive of all levels of
                  experience. All topics will be covered from the basics, making
                  it suitable for individuals from any field of work.
                </p>

                <p className="text-black text-sm font-bold">
                  What is the minimum system configuration required?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="justify-center mb-30 hidden md:flex" id="support">
          <div className="w-[80%] h-[210px] flex justify-between items-center bg-blue-600 rounded-lg px-14 py-6 relative overflow-hidden">
            {/* Background circle waves */}
            <div className="absolute inset-0 z-0">
              <div className="absolute rounded-full bg-blue-500 opacity-20 w-[550px] h-[550px] top-[10px] right-20"></div>
              <div className="absolute rounded-full bg-blue-400 opacity-30 w-[450px] h-[450px] top-[90px] right-30"></div>
              <div className="absolute rounded-full bg-blue-300 opacity-40 w-[350px] h-[350px] top-[150px] right-40"></div>
            </div>

            {/* Content */}
            <div className="flex items-center z-10">
              <RiCustomerService2Fill className="text-6xl text-blue-500 border-4 border-gray-200 bg-white rounded-lg p-2" />
              <div className="ml-6">
                <h1 className="text-white text-2xl font-semibold">
                  Want to delve deeper into the program?
                </h1>
                <p className="text-white text-sm mt-2">
                  Share your details to receive expert insights from our program
                  team!
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="z-10">
              <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                Get in touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <footer className="bg-black text-white py-10 px-6 hidden md:block">
          <div className="flex flex-col">
            <div className="flex justify-between border-b-2 pb-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-0">accredian</h2>
                <p className="text-xs text-gray-400">credentials that matter</p>
              </div>
              <div className="pr-25 text-center">
                <button className="bg-blue-500 text-white px-4 border-2 border-white py-2 rounded-lg hover:bg-blue-600">
                  Schedule 1-on-1 Call Now
                </button>
                <p className="mt-2 text-sm">Speak with our Learning Advisor</p>
              </div>
            </div>

            <div className="flex justify-between pl-10 pr-30 pt-10">
              <div>
                <h3 className="text-lg mb-4">Programs</h3>
                <ul className="space-y-2 font-semibold ">
                  <li className="flex justify-between items-center">
                    <p>Data Science & AI</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Product Management</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Business Analytics</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Digital Transformation</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Business Management</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Project Management</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Strategy & Leadership</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Senior Management</p>
                    <p className="text-xl">+</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Fintech</p>
                    <p className="text-xl">+</p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg mb-4">Contact Us</h3>
                <p>Email for Data Science Queries: admissions@accredian.com</p>
                <p>Email for Product Management: queries@accredian.com</p>
                <p>
                  Data Science Admissions Helpline: +91 94992 68926 (9 AM - 7
                  PM)
                </p>
                <p>Product Management Helpline: +91 85955 80196</p>
                <p>Enrolled Student Helpline: +91 99862 20377</p>
                <p>
                  Office Address: 4th Floor, 264, Phase IV, Udyog Vihar, Sector
                  18, Gurugram, Haryana 122015
                </p>
                <h3 className="font-semibold ">Why Accredian</h3>
                <h2 className="font-light">Follow Us</h2>
                <div className="flex text-lg gap-3 mt-2">
                  <FaFacebookSquare />
                  <FaLinkedin />
                  <FaTwitter />
                  <FaInstagram />
                  <FaYoutube />
                </div>
              </div>
              <div>
                <div>
                  <h3 className="text-lg mb-4">Accredian</h3>
                  <ul className="space-y-2">
                    <li>About</li>
                    <li>Career</li>
                    <li>Blog</li>
                    <li>Admission Policy</li>
                    <li>Referral Policy</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Master FAQs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center mt-10 text-gray-400 text-xs">
              © 2024 Accredian. A Brand of FullStack Education Pvt Ltd. All
              Rights Reserved
            </div>
          </div>
        </footer>
      </div>

      {referModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-[150]">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 py-5 px-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="mb-5 text-center">
              <h1 className="text-3xl font-extrabold text-white  transform hover:scale-105 transition-all duration-300 ">
                accredian
              </h1>
              <p className="text-xs text-gray-700">credentials that matter</p>
            </div>

            <div className="bg-white/95 rounded-xl shadow-2xl p-4 w-full relative transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
              <button
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closePanel}
                aria-label="Close"
              >
                ✕
              </button>

              <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-3">
                  {/* Left Column - Referrer */}
                  <div>
                    <h2 className="text-sm font-semibold text-blue-600 mb-1">
                      Referrer Details
                    </h2>
                    <div className="mb-2">
                      <label
                        htmlFor="referrerName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="referrerName"
                        name="referrerName"
                        placeholder="Your full name"
                        value={referrerName}
                        onChange={(e) => setReferrerName(e.target.value)}
                        className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="referrerEmail"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="referrerEmail"
                        name="referrerEmail"
                        placeholder="Your email"
                        value={referrerEmail}
                        onChange={(e) => setReferrerEmail(e.target.value)}
                        className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column - Referee */}
                  <div>
                    <h2 className="text-sm font-semibold text-blue-600 mb-1">
                      Referee Details
                    </h2>
                    <div className="mb-2">
                      <label
                        htmlFor="refereeName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="refereeName"
                        name="refereeName"
                        placeholder="Referee's full name"
                        value={refereeName}
                        onChange={(e) => setRefereeName(e.target.value)}
                        className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="refereeEmail"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="refereeEmail"
                        name="refereeEmail"
                        placeholder="Referee's email"
                        value={refereeEmail}
                        onChange={(e) => setRefereeEmail(e.target.value)}
                        className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Program Selection - Full Width */}
                <div className="mb-2 mt-1">
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Program
                  </label>
                  <select
                    id="courseName"
                    name="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full px-2 py-1 mt-1 text-sm border cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="Professional Certificate Program in Product Management">
                      Professional Certificate Program in Product Management
                    </option>
                    <option value="PG Certificate Program in Strategic Product Management">
                      PG Certificate Program in Strategic Product Management
                    </option>
                    <option value="Executive Program in Data Driven Product Management">
                      Executive Program in Data Driven Product Management
                    </option>
                    <option value="Executive Program in Product Management and Digital Transformation">
                      Executive Program in Product Management and Digital
                      Transformation
                    </option>
                    <option value="Advanced Certification in Product Management">
                      Executive Program in Product Management
                    </option>
                    <option value="Advanced Certification in Product Management">
                      Advanced Certification in Product Management
                    </option>
                    <option value="Executive Program in Product Management and Project Management">
                      Executive Program in Product Management and Project
                      Management
                    </option>
                  </select>
                </div>

                {/* Message Field - Full Width */}
                <div className="mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Personal Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Add a personal message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    rows="4"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-3">
                  <button
                    type="submit"
                    className="w-full px-3 py-2 bg-blue-500 cursor-pointer text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center text-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <span>Send Referral</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
