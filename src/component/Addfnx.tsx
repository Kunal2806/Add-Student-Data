import { useState } from "react";

function Addfnx(props: any) {
  const [studentName, setstudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [alert, setAlert] = useState(false);

  function saveText() {
    let data = { studentName, courseName };
    setAlert(true);
    fetch("https://api.kunalgoswami-2806.workers.dev/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        props.sendBackFunc(data);
        setstudentName("");
        setCourseName("");
        setAlert(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <>
      {alert && (
        <div className="alert alert-primary" role="alert">
          Data ADDING...
        </div>
      )}
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
