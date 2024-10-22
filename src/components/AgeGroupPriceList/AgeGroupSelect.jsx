import PropTypes from "prop-types";
import { useState } from "react";

const AgeGroupSelect = ({ resultHandler, minAge, maxAge, isError, idx }) => {
  const [startAge, setStartAge] = useState(minAge);
  const [endAge, setEndAge] = useState(maxAge);

  const handleStartAgeChange = (e) => {
    const selectedAge = parseInt(e.target.value);
    setStartAge(selectedAge);
    resultHandler(idx, [selectedAge, endAge]);
    if (selectedAge > endAge) {
      setEndAge(selectedAge);
    }
  };

  const handleEndAgeChange = (e) => {
    const selectedAge = parseInt(e.target.value);
    setEndAge(selectedAge);
    resultHandler(idx, [startAge, selectedAge]);
    if (selectedAge < startAge) {
      setStartAge(selectedAge);
    }
  };

  return (
    <div>
      <p className="text-gray-500 py-2">年齡</p>
      <div className="flex">
        <select
          className="py-3.5 px-2.5 border-2 border-orange-500 rounded-md rounded-r-none grow"
          id="startAge"
          value={startAge}
          onChange={handleStartAgeChange}
        >
          {Array.from({ length: maxAge - minAge + 1 }, (_, idx) => (
            <option key={idx} value={idx} disabled={idx > endAge}>
              {idx}
            </option>
          ))}
        </select>
        <p className="px-2.5 py-3 bg-gray-100 border-2 border-gray-300 border-x-0 text-xl">
          ~
        </p>
        <select
          className="px-2.5 border-2 border-orange-500 rounded-md rounded-l-none grow"
          id="endAge"
          value={endAge}
          onChange={handleEndAgeChange}
        >
          {Array.from({ length: maxAge - minAge + 1 }, (_, idx) => (
            <option key={idx} value={idx} disabled={idx < startAge}>
              {idx}
            </option>
          ))}
        </select>
      </div>
      {isError && (
        <p className="bg-red-50 text-orange-500 font-bold p-2.5 rounded-md">
          年齡區間不可重疊
        </p>
      )}
    </div>
  );
};

AgeGroupSelect.propTypes = {
  resultHandler: PropTypes.func,
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
  isError: PropTypes.bool,
  idx: PropTypes.number,
};

export default AgeGroupSelect;
