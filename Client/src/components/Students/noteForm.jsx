import React, { useState } from "react";

function Noteform({ titles, notes, onSubmit }) {
  const [heading, setHeading] = useState(titles.text ? titles.text : "");
  const [text, setText] = useState(notes.text ? notes.text : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, heading });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="text">Title :</label>
        <textarea
          type="text"
          className="form-control "
          name="text"
          id="text"
          onChange={(e) => setHeading(e.target.value)}
          defaultValue={titles}
          required
        ></textarea>
        <label htmlFor="text">Description :</label>
        <textarea
          type="text"
          className="form-control "
          name="text"
          id="text"
          rows="10"
          onChange={(e) => setText(e.target.value)}
          defaultValue={notes}
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
