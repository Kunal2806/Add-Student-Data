import { useState } from "react";

function Addfnx() {
  const [studentName, setstudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  function saveText() {
    let data = { studentName, courseName };
    fetch("https://api.kunalgoswami-2806.workers.dev/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log("result", result);
      window.location.reload();
    });
  }
  return (
    <>
      <div className="navbar">
        <div className="dropdown">
          <button
            className="rounded dropdown-toggle mx-5 bg-transparent"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="./image/add.png" alt="add"></img>
          </button>
          <ul className="dropdown-menu m-4">
            <li>
              Enter Name :-
              <input
                value={studentName}
                onChange={(e: any) => {
                  setstudentName(e.target.value);
                }}
                type="text"
              />
            </li>
            <li>
              Enter CourseName :-
              <input
                value={courseName}
                onChange={(e: any) => {
                  setCourseName(e.target.value);
                }}
                type="text"
              />
            </li>
            <li className="m-2">
              <button type="submit" onClick={saveText}>
                Save
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Addfnx;
