import React, { useState } from "react";
import api from "../api";
import "../components/form.css";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created!");
          navigate('/')
        } else {
          alert("Failed to create note");
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div class="form-container">
      <span class="create-title">
        <h2>Create Note</h2>
        <button onClick={() => navigate("/")}>Home</button>
      </span>
      <form onSubmit={createNote} className="form">
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
          value={title}
          placeholder="Enter title"
        />{" "}
        <br />
        <textarea
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          required
          value={content}
          placeholder="Enter content"
        />{" "}
        <br />
        <button type="submit" class="submit-btn">
          Create
        </button>
      </form>
    </div>
  );
};
