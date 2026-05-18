import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", { id: "heading" }, "Hello World "); // react element returns object
const span = <span>REACT ELEMENT SPAN </span>;
const jsxHeadingElement = (
  <h1 id="heading">
    This is JSX heading 🚀 adding JSX Element inside another element {span}
  </h1>
); // JSX element
console.log("jsxHeading ", jsxHeadingElement);
console.log("heading ", heading);
const root = ReactDOM.createRoot(document.getElementById("root"));

const JSXHeading = () => {
  return (
    <h1>
      HeadingComponent converted from jSX element to React Component
      ................
    </h1>
  );
};

const HeadingComponent = () => {
  return (
    <>
      Any javascript {2 + 2}
      <br />
      Function call {JSXHeading()}
      <JSXHeading> </JSXHeading>
      <JSXHeading />
      Adding element <span>{jsxHeadingElement} inside component </span>
      <h1>HeadingComponent ................</h1>
    </>
  );
};

const HeadingComponent2 = () => <h1>HeadingComponent2 ................</h1>;

// root.render(jsxHeadingElement);
const title = (
  <span>
    Putting component inside react element <HeadingComponent2 />{" "}
  </span>
);
root.render(<HeadingComponent />);
// root.render(<HeadingComponent2 />);
// root.render(<JSXHeading />);

// root.render(title)
