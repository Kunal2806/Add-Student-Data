import { useEffect, useState } from "react";
import "./App.css";
import Addfnx from "./component/Addfnx";
import Edit from "./component/Edit";
function App() {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.kunalgoswami-2806.workers.dev/getdata"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDataArray(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  function DeleteData(id: number) {
    fetch(`https://api.kunalgoswami-2806.workers.dev/delete/${id}`, {
      method: "DELETE",
    }).then((result) => {
      console.log("result", result);
      window.location.reload();
    });
  }

  return (
    <>
      <Addfnx />
      <div className="container">
        <table className="table table-border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Course</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((item: any) => (
              <tr key={item.studentId}>
                <th scope="row">{item.studentId}</th>
                <td>{item.studentName}</td>
                <td>{item.courseName}</td>
                <td className="buttons">
                  <a className="handle">
                    <Edit
                      id={item.studentId}
                      preStudentName={item.studentName}
                      preCourseName={item.courseName}
                    />
                  </a>
                  <button
                    className="handle"
                    onClick={() => {
                      DeleteData(item.studentId);
                    }}
                  >
                    <img src="./image/delete.png" alt="delete"></img>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
