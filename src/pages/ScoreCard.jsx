import React from "react";

/**
 * ScoreCard Component
 * Renders the final performance summary, overall score, and question-by-question evaluation breakdown.
 */
const ScoreCard = ({
  questions,
  answers,
  evaluations,
  interviewContext,
  onRestart,
}) => {
  // Safe calculation of average score across valid evaluations
  const totalQuestions = questions.length;
  const validEvaluations = Object.values(evaluations).filter(
    (ev) => ev && ev.score,
  );

  const averageScore =
    validEvaluations.length > 0
      ? (
          validEvaluations.reduce((acc, curr) => acc + curr.score, 0) /
          totalQuestions
        ).toFixed(1)
      : 0;

  return (
    // Responsive card container with fluid padding and text scaling
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-xs sm:text-sm md:text-base">
      <div className="text-center mb-6 sm:mb-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Interview Complete
        </h2>
        <p className="text-gray-600 font-medium text-xs sm:text-sm">
          Role: <span className="text-blue-700 font-semibold">{interviewContext.role}</span> |{" "}
          Stack: <span className="text-blue-700 font-semibold">{interviewContext.stack}</span>
        </p>
        <div className="mt-4 sm:mt-6 inline-block bg-blue-50 border border-blue-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full">
          <span className="text-xs sm:text-sm text-blue-800 uppercase tracking-wider font-bold">
            Overall Score
          </span>
          <div className="text-3xl sm:text-4xl font-black text-blue-600 mt-1">
            {averageScore} / 10
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {questions.map((q, index) => {
          const evalData = evaluations[index];
          const scoreColor =
            evalData?.score >= 7
              ? "text-green-600 bg-green-50 border-green-200"
              : evalData?.score >= 4
              ? "text-yellow-600 bg-yellow-50 border-yellow-200"
              : "text-red-600 bg-red-50 border-red-200";

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50 shadow-sm"
            >
              <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-lg">
                Q{index + 1}: {q}
              </h3>

              <div className="mb-4">
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                  Your Answer
                </span>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap bg-white p-3 rounded-lg border border-gray-200 text-xs sm:text-sm">
                  {answers[index] || "No answer provided."}
                </p>
              </div>

              {evalData ? (
                <div className={`p-3 sm:p-4 rounded-lg border ${scoreColor}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold uppercase tracking-wider text-xs sm:text-sm">
                      AI Feedback
                    </span>
                    <span className="font-black text-base sm:text-lg">
                      Score: {evalData.score}/10
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">{evalData.feedback}</p>
                </div>
              ) : (
                <div className="p-3 sm:p-4 rounded-lg border bg-gray-200 text-gray-600 text-xs sm:text-sm font-medium">
                  Evaluation failed or was not completed.
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 sm:mt-10 text-center">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md text-xs sm:text-sm"
        >
          Start a New Interview
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;