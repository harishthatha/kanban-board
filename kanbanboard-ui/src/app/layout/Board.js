import React, { useState, useEffect } from "react";
import { Button, Grid, Input, Modal, Header } from "semantic-ui-react";
import api from "../api/api";
import KanbanColumn from "./KanbanColumn";
import { useParams } from "react-router-dom";

function Board() {
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await api.get(`/boards/${id}/columns`);
        setColumns(response.data);
      } catch (error) {
        console.error("Error fetching columns data: ", error);
      }
    };

    fetchColumns();
  }, []);

  const handleAddColumn = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    if (newColumnName.trim() === "") {
      setOpen(false);
      return;
    }

    // Code to send the new column name to the server can be added here

    setOpen(false);
    setNewColumnName("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "lightgray",
          height: 50,
        }}
      >
        <Header
          as="h1"
          style={{ marginBottom: "16px", marginTop: 5, marginLeft: 16 }}
        >
          {"test"}
        </Header>
        <div
          style={{
            flex: "0 0 auto",
            alignSelf: "center",
            marginTop: 12,
            marginRight: 16,
          }}
        >
          <Button
            style={{ width: 200, marginBottom: 16 }}
            color="instagram"
            fluid
            onClick={handleAddColumn}
          >
            Add another list
          </Button>
        </div>
      </div>

      <div style={{ overflowX: "auto", marginTop: 16, marginLeft: 16 }}>
        <div
          className="kanban-grid"
          style={{
            display: "flex",
            minWidth: `${columns.length * 330 + (columns.length - 1) * 16}px`,
            minHeight: "100vh",
          }}
        >
          {columns &&
            columns.length &&
            columns.map((column, index) => (
              <React.Fragment key={column.id}>
                {index > 0 && <div style={{ width: 16 }} />}
                <KanbanColumn
                  column={column}
                  columns={columns}
                  setColumns={setColumns}
                />
              </React.Fragment>
            ))}
        </div>
        <div style={{ height: "16px" }}></div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          size="small"
        >
          <Modal.Header>Add another list</Modal.Header>
          <Modal.Content>
            <Input
              fluid
              placeholder="Column Name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Add"
              onClick={handleConfirm}
            />
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
}

export default Board;
