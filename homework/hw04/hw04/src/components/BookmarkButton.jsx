import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function BookmarkButton({ token, bookmarkId, postId }) {
  const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

  async function createBookmark() {
    const sendData = {
      post_id: postId,
    };
    console.log("creating bookmark...");
    //send post request
    const responseData = await postDataToServer(
      token,
      "/api/bookmarks/",
      sendData
    );
    console.log(responseData);
    setStateBookmarkId(responseData.id);
  }

  async function deleteBookmark() {
    console.log("deleting bookmark...");
    //send delete request
    const responseData = await deleteDataFromServer(
      token,
      "/api/bookmarks/" + stateBookmarkId
    );
    console.log(responseData);
    setStateBookmarkId(null);
  }

  if (stateBookmarkId) {
    return (
      <button
        aria-label="Unbookmark This Post"
        aria-checked="true"
        aria-roledescription="toggle"
        onClick={deleteBookmark}
      >
        <i className="fa-solid fa-bookmark"></i>
      </button>
    );
  } else {
    return (
      <button
        aria-label="Bookmark This Post"
        aria-checked="false"
        aria-roledescription="toggle"
        onClick={createBookmark}
      >
        <i className="far fa-bookmark"></i>
      </button>
    );
  }
}
