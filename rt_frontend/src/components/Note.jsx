import React from "react";
import './nt.css'

export const Note = ({ note, onDelete }) => {
  const formatedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{formatedDate}</p>
      <button onClick={() => onDelete(note.id)}>delete</button>
    </div>
  );
};
