import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";

// 1. fetch post data
// 2. iterate through each element, draws a Post component
export default function Posts({ token }) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const data = await getDataFromServer(token, "/api/posts");
    //sets state variable to redraw screen with posts
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  function outputPost(postObj) {
    return <Post key={postObj.id} postData={postObj} token={token} />;
  }

  console.log(posts);
  return <div>{posts.map(outputPost)}</div>;
}
