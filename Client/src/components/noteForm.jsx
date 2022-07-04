import React, { useState } from "react";

function Noteform({ notes, onSubmit }) {
  const [note] = useState(notes.text ? notes.text : "");
  const [text, setText] = useState(notes.text ? notes.text : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="text">Description :</label>
        <textarea
          type="text"
          className="form-control "
          name="text"
          id="text"
          rows="10"
          onChange={(e) => setText(e.target.value)}
          defaultValue={note}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" type="submit">
          Save Note
        </button>
      </div>
    </form>
  );
}

export default Noteform;
