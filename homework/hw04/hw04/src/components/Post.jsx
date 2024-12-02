import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

export default function Post({ postData, token }) {
  console.log(postData);

  return (
    <section className="bg-white border mb-10">
      {/* user header */}
      <div className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">
          {postData.user.username}
        </h3>
        <button className="icon-button">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      {/*  */}
      <img
        src={postData.image_url}
        alt={postData.alt_text || "Post Photo"}
        width="300"
        height="300"
        className="w-full bg-cover"
      />
      {/* buttons */}
      <div className="p-4">
        <div className="flex justify-between text-2xl mb-3">
          <div className="flex gap-2">
            {/* like button */}
            <LikeButton
              token={token}
              likeId={postData.current_user_like_id}
              postId={postData.id}
            />
            {/* misc buttons */}
            <button>
              <i className="far fa-comment"></i>
            </button>
            <button>
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
          {/* bookmark button */}
          <BookmarkButton
            token={token}
            bookmarkId={postData.current_user_bookmark_id}
            postId={postData.id}
          />
        </div>
        {/* num likes */}
        <p className="font-bold mb-3">{postData.likes.length} like(s)</p>
        {/* caption */}
        <div className="text-sm mb-3">
          <p className="flex gap-2">
            <strong>{postData.user.username}</strong>
            {postData.caption}
            <button className="button">more</button>
          </p>
        </div>
      </div>
      {/* comments TBD */}
      {/* last updated */}
      <p className="uppercase text-gray-500 text-xs">{postData.display_time}</p>
    </section>
  );
}
