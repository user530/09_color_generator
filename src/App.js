import React, { useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

function App() {
  const [color, setColor] = useState(``);
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#f15025").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let colors = new Values(color).all(10);

      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <section className="container">
        <h3>Colore generator:</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`${error ? `error` : null}`}
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#f15025"
          />

          <button type="submit" className="btn">
            Get colors
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => (
          <SingleColor key={index} {...color} />
        ))}
      </section>
    </React.Fragment>
  );
}

export default App;
