import React from "react";

/**
 * QuestionCard Component
 * Displays the current interview question, answer input area, AI evaluation feedback, and navigation controls.
 */
const QuestionCard = ({
  question,
  currentAnswer,
  onAnswerChange,
  evaluation,
  onEvaluation,
  isEvaluating,
  onNext,
  onPrev,
  isFirstQuestion,
  isLastQuestion,
  onFinish,
}) => {
  return (
    // Responsive card container with padding, shadow, and mobile-optimized text sizing
    <div className="w-full text-xs sm:text-sm md:text-base">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
          Your Question:
        </h2>
        <div className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-xs sm:text-sm md:text-base">
          {question}
        </div>

        <textarea
          rows="5"
          value={currentAnswer}
          onChange={onAnswerChange}
          className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-4 text-xs sm:text-sm md:text-base"
          placeholder="Type your answer here..."
        />

        <button
          onClick={onEvaluation}
          disabled={isEvaluating}
          className={`w-full sm:w-auto bg-green-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex justify-center items-center ${
            isEvaluating ? "cursor-wait" : ""
          }`}
        >
          {isEvaluating ? "Evaluating..." : "Submit Answer"}
        </button>

        {evaluation && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs sm:text-sm">
            <h3 className="font-bold text-gray-800 mb-2">Evaluation:</h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Feedback:</span>{" "}
              {evaluation.feedback}
            </p>
            <p
              className={`mt-2 font-semibold ${
                evaluation.score >= 7
                  ? "text-green-600"
                  : evaluation.score >= 4
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              Score: {evaluation.score} / 10
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={onPrev}
            disabled={isFirstQuestion}
            className={`w-full sm:w-auto bg-gray-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-semibold transition text-xs sm:text-sm ${
              isFirstQuestion
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-700"
            }`}
          >
            Previous Question
          </button>

          {isLastQuestion ? (
            <button
              onClick={onFinish}
              disabled={!evaluation}
              className={`w-full sm:w-auto bg-blue-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-semibold transition text-xs sm:text-sm ${
                !evaluation
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              Finish Interview
            </button>
          ) : (
            <button
              onClick={onNext}
              className="w-full sm:w-auto bg-gray-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition text-xs sm:text-sm"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
