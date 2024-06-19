import React from "react";

export const Note = ({ note, onDelete }) => {
  const formatedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div>
      <p>{note.title}</p>
      <p>{note.content}</p>
      <p>{formatedDate}</p>
      <button onClick={() => onDelete(note.id)}>delete</button>
    </div>
  );
};
