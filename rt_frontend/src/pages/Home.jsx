import React, { useEffect, useState } from "react";
import api from "../api";
import { Note } from "../components/Note"; 
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
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
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created!"); 
        } else {
          alert("Failed to create note");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
    <span>
      <h1>Notes</h1>
       <Link to={'/logout'}>logout</Link>
       </span>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}
     
      <form onSubmit={createNote}>
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
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
