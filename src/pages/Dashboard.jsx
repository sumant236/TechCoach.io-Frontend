import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import InterviewForm from "./InterviewForm";
import QuestionCard from "./QuestionCard";
import ScoreCard from "./ScoreCard";
import { AuthContext } from "../context/AuthContext";
import InterviewHistory from "./InterviewHistory";

/**
 * Dashboard Component
 * Manages interview workflow, active sessions, questions, evaluations, and history.
 */
const Dashboard = () => {
  // Extract logout method from authentication context
  const { logout } = useContext(AuthContext);

  // State for interview metadata, active questions, loading status, and error handling
  const [interviewContext, setInterviewContext] = useState({
    role: "",
    stack: "",
    experience: "",
  });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interviewId, setInterviewId] = useState(
    localStorage.getItem("activeInterviewId") || null,
  );

  // State for managing past interview history and setup view visibility
  const [history, setHistory] = useState([]);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);
  const [showSetup, setShowSetup] = useState(false);

  // State for tracking active question index, answers, AI feedback, and completion status
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // Generates new interview questions based on user input and starts a session
  const handleGenerate = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    setCurrentQuestionIndex(0);
    setInterviewContext(data);

    if (!data.role || !data.stack || !data.experience) {
      setError("All fields are required to generate questions.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/interviews/start", {
        role: data.role,
        techStack: data.stack,
        experienceLevel: data.experience,
      });

      const interviewData = response.data.data;

      localStorage.setItem("activeInterviewId", interviewData.id);
      setInterviewId(interviewData.id);

      const extractedQuestions = interviewData.questions.map(
        (q) => q.questionText,
      );
      setQuestions(extractedQuestions);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate questions. Check backend.",
      );
    } finally {
      setError("");
      setLoading(false);
    }
  };

  // Submits the current answer for AI evaluation and feedback
  const handleSubmitAnswer = async () => {
    setIsEvaluating(true);
    const currentAnswer = answers[currentQuestionIndex];

    if (!currentAnswer) {
      setError("Please provide an answer before submitting.");
      setIsEvaluating(false);
      return;
    }

    try {
      const response = await api.post(`/api/interviews/${interviewId}/answer`, {
        questionText: questions[currentQuestionIndex],
        userAnswer: currentAnswer,
      });

      const evaluation = response.data.data;

      setEvaluations((prev) => ({
        ...prev,
        [currentQuestionIndex]: evaluation,
      }));

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to evaluate answer. Check backend.",
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  // Updates answer state as the user types in the input field
  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: e.target.value,
    }));
  };

  // Resets the active interview state and opens the setup view
  const startNewInterview = () => {
    localStorage.removeItem("activeInterviewId");
    setShowSetup(true);
    setInterviewId(null);
    setQuestions([]);
    setAnswers({});
    setEvaluations({});
    setCurrentQuestionIndex(0);
    setIsInterviewFinished(false);
  };

  // Fetches an ongoing active interview session from local storage or backend
  const fetchActiveInterview = async () => {
    if (interviewId && questions.length === 0) {
      setLoading(true);
      try {
        const response = await api.get(`/api/interviews/${interviewId}`);
        const data = response.data.data;

        setInterviewContext({
          role: data.role,
          stack: data.techStack,
          experience: data.experienceLevel || "N/A",
        });

        const fetchedQuestions = [];
        const restoredAnswers = {};
        const restoredEvaluations = {};

        data.questions.forEach((q, index) => {
          fetchedQuestions.push(q.questionText);
          if (q.userAnswer) {
            restoredAnswers[index] = q.userAnswer;
          }
          if (q.aiFeedback && q.score !== null) {
            restoredEvaluations[index] = {
              feedback: q.aiFeedback,
              score: q.score,
            };
          }
        });

        setQuestions(fetchedQuestions);
        setAnswers(restoredAnswers);
        setEvaluations(restoredEvaluations);

        const nextUnanswered = data.questions.findIndex((q) => !q.userAnswer);
        setCurrentQuestionIndex(
          nextUnanswered !== -1 ? nextUnanswered : data.questions.length - 1,
        );
      } catch (err) {
        console.error("Failed to restore interview", err);
        localStorage.removeItem("activeInterviewId");
        setInterviewId(null);
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetches past interview history records for the user dashboard
  const fetchHistory = async () => {
    setIsFetchingHistory(true);
    try {
      const response = await api.get("/api/interviews/history");
      setHistory(response.data.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setIsFetchingHistory(false);
    }
  };

  // Restore active interview state on component mount if ID exists
  useEffect(() => {
    fetchActiveInterview();
  }, [interviewId]);

  // Refresh history records when an interview session concludes
  useEffect(() => {
    fetchHistory();
  }, [isInterviewFinished]);

  return (
    // Responsive main container with fluid text sizing and layout spacing
    <div className="min-h-screen bg-gray-50 text-xs sm:text-sm md:text-base">
      {/* Global Navigation Bar */}
      <nav className="bg-white shadow-sm px-4 sm:px-8 py-3 sm:py-4 mb-6 sm:mb-8 flex justify-between items-center border-b border-gray-200">
        <div className="text-xl sm:text-2xl font-extrabold text-blue-700 tracking-tight">
          TechCoach<span className="text-gray-800">.io</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-xs sm:text-sm font-medium text-gray-500 hidden md:block bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            Interview Dashboard
          </div>
          <button
            onClick={logout}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 font-semibold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300 shadow-sm active:scale-95 text-xs sm:text-sm"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 px-4 md:px-8 pb-12">
        {/* Persistent Error Section */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 sm:p-4 rounded-xl shadow font-medium text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* View 1: Active Interview (Questions Generated & Not Finished) */}
        {questions.length > 0 && !isInterviewFinished ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Context Banner */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-sm gap-3">
              <div className="mb-2 md:mb-0 text-center md:text-left">
                <p className="text-blue-900 font-bold text-base sm:text-lg">
                  Mock Interview: {interviewContext.role}
                </p>
                <p className="text-blue-700 text-xs sm:text-sm font-medium">
                  Tech Stack: {interviewContext.stack} | Experience:{" "}
                  {interviewContext.experience}
                </p>
              </div>
              <button
                onClick={startNewInterview}
                className="bg-white text-blue-700 border border-blue-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold text-xs sm:text-sm"
              >
                Quit Interview
              </button>
            </div>

            {/* Active Question Card */}
            <QuestionCard
              question={questions[currentQuestionIndex]}
              currentAnswer={answers[currentQuestionIndex] || ""}
              onAnswerChange={handleAnswerChange}
              evaluation={evaluations[currentQuestionIndex]}
              onEvaluation={handleSubmitAnswer}
              isEvaluating={isEvaluating}
              onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
              onPrev={() => setCurrentQuestionIndex((prev) => prev - 1)}
              isFirstQuestion={currentQuestionIndex === 0}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
              onFinish={() => setIsInterviewFinished(true)}
            />
          </div>
        ) : /* View 2: Score Card (Interview is Finished) */
        isInterviewFinished ? (
          <ScoreCard
            questions={questions}
            answers={answers}
            evaluations={evaluations}
            interviewContext={interviewContext}
            onRestart={() => {
              startNewInterview();
              setShowSetup(false);
            }}
          />
        ) : /* View 3: Setup Form (User clicked "New Interview") */
        showSetup ? (
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Set Up Your Interview
              </h2>
              <button
                onClick={() => setShowSetup(false)}
                className="text-gray-500 hover:text-gray-800 font-medium transition text-xs sm:text-sm"
              >
                Cancel
              </button>
            </div>
            <InterviewForm
              interviewContext={interviewContext}
              setInterviewContext={setInterviewContext}
              handleGenerate={handleGenerate}
              loading={loading}
            />
          </div>
        ) : (
          /* View 4: Default History Dashboard */
          <InterviewHistory
            history={history}
            isFetchingHistory={isFetchingHistory}
            onStartNew={() => setShowSetup(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
