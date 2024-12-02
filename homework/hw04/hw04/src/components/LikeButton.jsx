import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";
export default function LikeButton({ token, likeId, postId }) {
  const [stateLikeId, setStateLikeId] = useState(likeId);
  async function createLike() {
    const sendData = {
      post_id: postId,
    };
    console.log("creating like...");
    const responseData = await postDataToServer(token, "/api/likes/", sendData);
    console.log(responseData);
    setStateLikeId(responseData.id);
  }

  async function deleteLike() {
    console.log("deleting like...");
    const responseData = await deleteDataFromServer(
      token,
      "/api/likes/" + stateLikeId
    );
    console.log(responseData);
    setStateLikeId(null);
  }
  if (stateLikeId) {
    return (
      <button
        aria-label="Unlike This Post"
        aria-checked="true"
        aria-roledescription="toggle"
        onClick={deleteLike}
      >
        <i className="fa-solid fa-heart text-red-700"></i>
      </button>
    );
  } else {
    return (
      <button
        aria-label="Like This Post"
        aria-checked="false"
        aria-roledescription="toggle"
        onClick={createLike}
      >
        <i className="far fa-heart"></i>
      </button>
    );
  }
}
