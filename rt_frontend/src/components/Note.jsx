import React from "react";
import "./note.css";

export const Note = ({ note, onDelete }) => {
  const formatedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div className="note-container">
      <span className="title-date">
        <h2 class="title">{note.title}</h2>
        <p class="date">latest: {formatedDate}</p>
      </span>
      <p class="content">{note.content}</p>
      <span className="delete-btn-span">
        <button onClick={() => onDelete(note.id)} class="delete-btn">
          delete
        </button>
      </span>
    </div>
  );
};
