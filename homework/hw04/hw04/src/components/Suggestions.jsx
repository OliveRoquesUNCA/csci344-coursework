import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion";
export default function Suggestions({ token }) {
  const [suggestions, setSuggestions] = useState([]);

  async function getSuggestions() {
    const data = await getDataFromServer(token, "/api/suggestions");
    setSuggestions(data);
  }

  useEffect(() => {
    getSuggestions();
  }, []);

  function outputSuggestion(suggestionObj) {
    return (
      <Suggestion
        key={suggestionObj.id}
        suggestionData={suggestionObj}
        token={token}
      />
    );
  }

  console.log(suggestions);

  return (
    <div className="mt-4">
      <p className="text-base text-gray-400 font-bold mb-4">
        Suggestions for you
      </p>

      {suggestions.map(outputSuggestion)}
    </div>
  );
}
