import React, { useState } from "react";
import '../components/AttendanceCalculator.css';

const AttendanceCalculator = () => {
  const [requiredPercentage, setRequiredPercentage] = useState("80");
  const [classesAttended, setClassesAttended] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [result, setResult] = useState(null);

  const calculateAttendance = () => {
    const attended = parseInt(classesAttended);
    const total = parseInt(totalClasses);
    const required = parseInt(requiredPercentage);

    if (isNaN(attended) || isNaN(total) || attended > total || attended < 0 || total <= 0) {
      setResult({
        error: true,
        message: "Please enter valid numbers. Classes attended cannot be more than total classes.",
      });
      return;
    }

    const currentPercentage = (attended / total) * 100;

    if (currentPercentage >= required) {
      const classesCanSkip = Math.floor((attended * 100 - required * total) / required);
      const futureTotal = total + classesCanSkip;
      setResult({
        error: false,
        currentPercentage: currentPercentage.toFixed(2),
        message: `You can bunk for ${classesCanSkip} more classes and still maintain ${required}% attendance.`,
        currentDetails: `Current Attendance: ${attended}/${total} → ${currentPercentage.toFixed(2)}%`,
        futureDetails: `Attendance Then: ${attended}/${futureTotal} → ${((attended / futureTotal) * 100).toFixed(2)}%`,
      });
    } else {
      const classesNeeded = Math.ceil((required * total - 100 * attended) / (100 - required));
      const futureTotal = total + classesNeeded;
      const futureAttendance = attended + classesNeeded;
      setResult({
        error: false,
        currentPercentage: currentPercentage.toFixed(2),
        message: `You need to attend ${classesNeeded} more classes to achieve ${required}% attendance.`,
        currentDetails: `Current Attendance: ${attended}/${total} → ${currentPercentage.toFixed(2)}%`,
        futureDetails: `Attendance Required: ${futureAttendance}/${futureTotal} → ${required}%`,
      });
    }
  };

  return (
    <div className="attendance-calculator w-full max-w-md mx-auto p-4 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Attendance Calculator</h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Required Percentage</label>
        <select
          value={requiredPercentage}
          onChange={(e) => setRequiredPercentage(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {[60, 65, 70, 75, 80, 85, 90].map((percent) => (
            <option key={percent} value={percent}>
              {percent}%
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Classes Attended</label>
        <input
          type="number"
          value={classesAttended}
          onChange={(e) => setClassesAttended(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter classes attended"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Total Classes</label>
        <input
          type="number"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter total classes"
        />
      </div>

      <button
        onClick={calculateAttendance}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded ${result.error ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"}`}
        >
          {result.error ? (
            <p className="text-red-600 font-medium">{result.message}</p>
          ) : (
            <>
              <p className="text-lg font-bold text-green-700 mb-2">{result.message}</p>
              <p className="output-text">{result.currentDetails}</p>
              <p className="output-text">{result.futureDetails}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceCalculator;
