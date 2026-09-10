import React from "react";

/**
 * InterviewHistory Component
 * Displays a historical table of past user mock interviews with scores and metadata.
 */
const InterviewHistory = ({ history, isFetchingHistory, onStartNew }) => {
  return (
    // Responsive layout container with fluid spacing and text scaling
    <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm md:text-base">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Your Past Interviews
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Review your performance history
          </p>
        </div>
        <button
          onClick={onStartNew}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md text-xs sm:text-sm"
        >
          + New Interview
        </button>
      </div>

      {isFetchingHistory ? (
        <div className="text-center py-10 text-gray-500 font-medium text-xs sm:text-sm">
          Loading history...
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow border border-gray-100 p-6">
          <p className="text-gray-500 mb-4 text-xs sm:text-sm">
            You haven't taken any mock interviews yet.
          </p>
          <button
            onClick={onStartNew}
            className="text-blue-600 font-semibold hover:underline text-xs sm:text-sm"
          >
            Start your first interview now
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto border border-gray-100">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                <th className="p-3 sm:p-4 font-semibold">Date</th>
                <th className="p-3 sm:p-4 font-semibold">Role</th>
                <th className="p-3 sm:p-4 font-semibold">Tech Stack</th>
                <th className="p-3 sm:p-4 font-semibold text-center">
                  Avg Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-800 font-medium text-xs sm:text-sm">
                    {item.role}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">
                    {item.techStack}
                  </td>
                  <td className="p-3 sm:p-4 text-center">
                    <span
                      className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                        item.averageScore >= 7
                          ? "bg-green-100 text-green-700"
                          : item.averageScore >= 4
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.averageScore > 0
                        ? `${item.averageScore} / 10`
                        : "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterviewHistory;
