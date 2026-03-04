import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8f3dc] to-[#b7e4c7] pt-28 pb-16 px-6 text-[#1b4332]">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between mb-20">

          {/* Text */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Stay Consistent With Your Medicines
            </h1>

            <p className="text-lg text-[#2d6a4f] mb-8">
              MedTrack helps you manage prescriptions, track dosage schedules,
              and maintain your health routine with clarity and simplicity.
            </p>

            <div className="flex space-x-6">
              <a
                href="/login"
                className="bg-[#2d6a4f] text-white px-6 py-3 rounded-lg hover:bg-[#1b4332] transition"
              >
                Get Started
              </a>

              <a
                href="/register"
                className="border border-[#2d6a4f] text-[#1b4332] px-6 py-3 rounded-lg hover:bg-[#2d6a4f] hover:text-white transition"
              >
                Create Account
              </a>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/069/145/962/non_2x/hour-pills-treatment-time-taking-dose-medication-icon-ingestion-tablets-reminder-flat-illustration-vector.jpg"
              alt="Medicine reminder"
              className="w-80 h-80 rounded-xl shadow-lg"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow border border-[#95d5b2]">
            <h3 className="text-xl font-semibold mb-3">
              Organized Tracking
            </h3>
            <p className="text-[#2d6a4f]">
              Keep all your medicines, dosages, and schedules in one
              structured dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-[#95d5b2]">
            <h3 className="text-xl font-semibold mb-3">
              Clear Scheduling
            </h3>
            <p className="text-[#2d6a4f]">
              Manage start dates, end dates, and lifelong medicines
              without confusion.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-[#95d5b2]">
            <h3 className="text-xl font-semibold mb-3">
              Simple & Professional
            </h3>
            <p className="text-[#2d6a4f]">
              A clean, distraction-free interface designed for
              everyday usability.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
};

export default Home;