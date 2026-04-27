import React from "react";
/***
 *
 * useRef , controlled and uncontrolled components
 */
const Demo1 = () => {
  const inputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const lastNameRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(lastNameRef.current.value);
  };
  console.log(inputRef);
  return (
    <div>
      {" "}
      <div>
        <input type="text" ref={inputRef} />
        <button
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          Click to Focus Inputbox
        </button>
      </div>
      <div>
        {" "}
        {/***form 1 controlled , controlled by react */}
        <form onSubmit={handleSubmit}>
          <input
            name="controlledInput"
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            name="uncontrolled"
            type="text"
            placeholder="last name"
            ref={lastNameRef}
          />

          <button type="submit">Submit </button>
        </form>
      </div>
    </div>
  );
};

export default Demo1;
