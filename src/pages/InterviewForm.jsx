import React, { useState } from "react";

/**
 * InterviewForm Component
 * Renders form inputs for job role, tech stack, and experience level to generate interview questions.
 */
const InterviewForm = ({ handleGenerate, loading }) => {
  // Local state for interview setup fields
  const [role, setRole] = useState("");
  const [stack, setStack] = useState("");
  const [experience, setExperience] = useState("");

  return (
    // Responsive grid form layout with mobile-optimized spacing and scaling
    <form
      onSubmit={(e) => handleGenerate(e, { role, stack, experience })}
      className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm md:text-base"
    >
      <input
        type="text"
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs sm:text-sm"
        placeholder="Job Role (e.g., Frontend Developer)"
      />
      <input
        type="text"
        required
        value={stack}
        onChange={(e) => setStack(e.target.value)}
        className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs sm:text-sm"
        placeholder="Tech Stack (e.g., React, Tailwind)"
      />
      <input
        type="text"
        required
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs sm:text-sm"
        placeholder="Experience Level (e.g., Junior, Mid)"
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full md:col-span-3 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition duration-300 flex justify-center items-center text-xs sm:text-sm ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </form>
  );
};

export default InterviewForm;
