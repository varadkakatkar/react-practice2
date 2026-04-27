import React from "react";
import ReactDOM from "react-dom/client";

/*  const heading = React.createElement(
        "h1",
        { id: "heading" },
        "Hello World From PURE React ",
      );

      console.log(heading) */

/***
 *  <div id="parent">
 *    <div id="child1">
 *      <h1 id="heading1"> Headig 1 </h1>
 *    </div>
 *     <div id="child2">
 *      <h1 id="heading2"> Headig 1 </h1>
 *    </div>
 *   </div>
 *
 *
 *
 *
 *
 *
 */

const parent = React.createElement(
  "div",
  { id: "parent" },
  [
    React.createElement("div", { key: "child1", id: "Child 1" }, [
      React.createElement("h1", { key: "h1-1", id: "heading" }, "I am h1 tag Child 1"),
      React.createElement("h2", { key: "h2-1", id: "heading2" }, "I am h2 tag Child 1"),
    ]),
    React.createElement("div", { key: "child2", id: "Child2" }, [
      React.createElement("h1", { key: "h1-2", id: "heading1" }, "I am h1 tag Child 2"),
      React.createElement("h2", { key: "h2-2", id: "heading2" }, "I am h2 tag Child 2"),
    ]),
  ],
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
