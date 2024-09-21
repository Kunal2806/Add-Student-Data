import { useState } from "react";
export interface props {
  id: number;
  preCourseName: string;
  preStudentName: string;
  sendBackFunc: any;
}
function Edit(props: props) {
  const [studentName, setstudentName] = useState(`${props.preStudentName}`);
  const [courseName, setCourseName] = useState(`${props.preCourseName}`);
  const [alert, setAlert] = useState(false);

  function saveText() {
    setAlert(true);
    let data = { studentName, courseName };
    fetch(`https://api.kunalgoswami-2806.workers.dev/update/${props.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async () => {
      const response = await fetch(
        "https://api.kunalgoswami-2806.workers.dev/getdata"
      );
      const data = await response.json();
      props.sendBackFunc(data);
      setAlert(false);
    });
  }
  return (
    <>
      {alert && (
        <div className="alert alert-primary" role="alert">
          EDIT Data...
        </div>
      )}
      <div className="dropdown">
        <button
          className="rounded handle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src="./image/edit.png" alt="add"></img>
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
              id="EditName"
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
              id="EditCourseName"
            />
          </li>
          <li className="m-2">
            <button type="submit" onClick={saveText}>
              Save
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Edit;
