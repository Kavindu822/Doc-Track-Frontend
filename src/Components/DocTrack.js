import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const DocTrack = () => {
  const [searchCode, setSearchCode] = useState("");
  const [documentDetails, setDocumentDetails] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when searching
    setError(null); // Reset error state
    try {
      // Replace with actual API call
      const response = await fetch(
        `https://run.mocky.io/v3/8fd55c13-f5cb-4ec7-b0f3-3fdbafe886fc`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch document details");
      }
      const data = await response.json();

      // Assuming the API returns document details and history
      setDocumentDetails(data.documentDetails); 
      setHistory(null); // Reset history when searching new document
    } catch (err) {
      setError(err.message); // Set error state if the API fails
    } finally {
      setLoading(false); // Set loading to false once the API call is complete
    }
  };

  const handleHistory = () => {
    setLoading(true);
    setError(null);
    try {
      // Simulating history data (you can fetch this from API in actual code)
      const dummyHistory = [
        { date: "March 20, 2025", action: "Uploaded by John Doe" },
        { date: "March 22, 2025", action: "Reviewed by Manager" },
        { date: "March 24, 2025", action: "Sent to Approval" },
      ];
      setHistory(dummyHistory);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-end w-full h-screen space-y-6 bg-center bg-cover"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
      <div className="relative flex flex-col items-center w-full h-1/2">
        <p className="text-3xl font-bold text-center text-white sm:text-5xl lg:text-6xl">
          Track your document here
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-1/2 sm:w-1/3 lg:w-1/4 h-auto max-w-xs text-[#00a2cd] animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
          />
        </svg>

        {/* Search Bar */}
        <div className="relative flex items-center w-2/3 mt-8 sm:w-1/3 m-10">
          <input
            className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Enter Document Code"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00a2cd] hover:text-[#0080a0]"
            onClick={handleSearch}
          >
            <AiOutlineSearch className="w-6 h-6" />
          </button>
        </div>

        {/* Loading or Error Message */}
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Document Details */}
        {documentDetails && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-3/4 sm:w-1/2">
            <h2 className="text-lg font-semibold text-gray-800">Document Details</h2>
            <p className="text-gray-600"><strong>ID:</strong> {documentDetails.id}</p>
            <p className="text-gray-600"><strong>Title:</strong> {documentDetails.title}</p>
            <p className="text-gray-600"><strong>Owner:</strong> {documentDetails.owner}</p>
            <p className="text-gray-600"><strong>Status:</strong> {documentDetails.status}</p>
            <p className="text-gray-600"><strong>Last Updated:</strong> {documentDetails.lastUpdated}</p>

            {/* History Button */}
            <button
              className="mt-4 px-4 py-2 bg-[#00a2cd] text-white rounded-lg hover:opacity-90"
              onClick={handleHistory}
            >
              View History
            </button>
          </div>
        )}

        {/* Display Document History */}
        {history && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-3/4 sm:w-1/2 mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Document History</h2>
            <ul className="text-gray-600">
              {history.map((entry, index) => (
                <li key={index} className="border-b py-2 last:border-none">
                  <strong>{entry.date}:</strong> {entry.action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocTrack;
