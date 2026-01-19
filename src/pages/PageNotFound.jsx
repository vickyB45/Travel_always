import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center relative">
        {/* Soft background blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-[160px] md:text-[200px] font-bold text-gray-200 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <SearchX className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-base max-w-md mx-auto leading-relaxed">
           The page you are looking for is not available.
            The URL may be incorrect, or the page may have been removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
