import { useEffect, useState } from "react";
import api from "../api/api";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class User {
  _id: string = "";
  username: string = "";
  firstName: string = "";
  lastName: string = "";
}
function Home({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    setActiveTab(0);
  }, [setActiveTab]);
  const [, setGridApi] = useState(null);
  const handleDelete = (id: string) => {
    api.deleteUser(id).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };
  const columnDefs = [
    {
      headerName: "Username",
      field: "username",
    },
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "",
      field: "_id",
      maxWidth: 150,
      cellRendererFramework: (params: any) => (
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
            style={{ border: "none", width: "5px", margin: "0px" }}
          >
            <DeleteIcon style={{ height: "20px" }} />
          </Button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  const onGridReady = (params: any) => {
    setGridApi(params);
  };

  useEffect(() => {
    api.getAllUsers().then(setUsers);
  }, []);
  if (!localStorage.getItem("token")) {
    return <div>Login using admin account</div>;
  }
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "700px", overflow: "auto" }}
    >
      <AgGridReact
        rowData={users}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
}

export default Home;
