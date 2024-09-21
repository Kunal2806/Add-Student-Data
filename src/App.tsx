import { useEffect, useState } from "react";
import "./App.css";
import Addfnx from "./component/Addfnx";
import Edit from "./component/Edit";
function App() {
  const [dataArray, setDataArray] = useState([]);
  const [alert, setAlert] = useState(false);
  const [dalert, setdAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setAlert(true);
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
      setAlert(false);
    };

    fetchData();
  }, []);

  function DeleteData(id: number) {
    setdAlert(true);
    fetch(`https://api.kunalgoswami-2806.workers.dev/delete/${id}`, {
      method: "DELETE",
    }).then(async () => {
      const response = await fetch(
        "https://api.kunalgoswami-2806.workers.dev/getdata"
      );
      const data = await response.json();
      setDataArray(data);
      setdAlert(false);
    });
  }

  function handleSendBack(_dataArray: any) {
    setDataArray(_dataArray);
  }

  return (
    <>
      <Addfnx sendBackFunc={handleSendBack} />
      {alert && (
        <div className="alert alert-primary" role="alert">
          Data Loading...
        </div>
      )}
      {dalert && (
        <div className="alert alert-primary" role="alert">
          DELETING...
        </div>
      )}

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
                      sendBackFunc={handleSendBack}
                    />
                  </a>
                  <button
                    className="handle"
                    onClick={() => {
                      {
                        alert && (
                          <div className="alert alert-primary" role="alert">
                            DELETING...
                          </div>
                        );
                      }
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
