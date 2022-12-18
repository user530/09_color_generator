import React from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, type, weight }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const articleRef = React.useRef(null);

  React.useEffect(() => {
    const containerElem = articleRef.current;

    if (containerElem)
      containerElem.addEventListener("click", () => {
        setIsClicked(true);
        const colorVal = containerElem.children[1].innerText;
        navigator.clipboard.writeText(colorVal);
      });
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClicked(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isClicked]);

  const bcg = rgb.join(`,`);

  return (
    <React.Fragment>
      <article
        className={`color ${type == "shade" && "color-light"} ${
          isActive && "focused"
        }`}
        style={{ backgroundColor: `rgb(${bcg})` }}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        ref={articleRef}
      >
        {""}
        <p className="percent-value">{weight}%</p>
        <p className="color-value">{rgbToHex(...rgb)}</p>
        {isClicked && <p className="alert">Copied to clipboard</p>}
      </article>
    </React.Fragment>
  );
};

export default SingleColor;
