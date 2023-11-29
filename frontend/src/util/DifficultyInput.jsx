import React, { useState } from "react";

const DifficultyInput = ({ register }) => {
  const [difficulty, setDifficulty] = useState(0)

  const handleClick = (level) => {
    setDifficulty(level);
  
  }

  return (
    <div className="flex justify-center items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`m-1 cursor-pointer ${difficulty >= index + 1 ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          {difficulty >= index + 1 ? "🍲" : "🔲"}
        </span>
      ))}
    </div>
  )
}

export default DifficultyInput;
