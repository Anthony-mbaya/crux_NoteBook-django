import React, { useEffect, useState } from "react";
import api from "../api";
import { Note } from "../components/Note";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
export const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data), console.log(data);
      })
      .catch((err) => alert(err));
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note Deleted!");
        } else {
          alert("Failed to delete note");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div class="home-container">
      <span class="header">
        <h2>Notes</h2>
        <button class="create-btn" onClick={() => navigate('/create')} >Create</button>
        <Link to={"/logout"} class="logout">logout</Link>
      </span>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}


    </div>
  );
};
