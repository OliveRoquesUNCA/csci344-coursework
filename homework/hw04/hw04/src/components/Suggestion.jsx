import React, { useState, useEffect } from "react";

export default function Suggestion({ suggestionData, token }) {
  console.log(suggestionData);

  return (
    <section className="flex justify-between items-center mb-4 gap-2">
      <img src={suggestionData.thumb_url} className="rounded-full" />
      <div className="w-[180px]">
        <p className="font-bold text-sm">{suggestionData.username}</p>
        <p className="text-gray-500 text-xs">suggested for you</p>
      </div>
      <button
        className="link following"
        aria-label="follow user (button not implemented)"
      >
        follow
      </button>
    </section>
  );
}
