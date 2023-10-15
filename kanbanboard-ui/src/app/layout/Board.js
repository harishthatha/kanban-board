import React, { useState, useEffect } from "react";
import { Button, Grid, Input, Modal, Header } from "semantic-ui-react";
import api from "../api/api";
import KanbanColumn from "./KanbanColumn";
import { useParams } from "react-router-dom";

function Board() {
  const [columns, setColumns] = useState([]);
  const [board, setBoard] = useState({});
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const boardData = await api.get(`/boards/${id}`);

        setBoard({ ...boardData.data });

        const columnsData = await api.get(`/boards/${id}/columns`);
        setColumns(columnsData.data);
      } catch (error) {
        console.error("Error fetching columns data: ", error);
      }
    };

    fetchColumns();
  }, [id]); // Ensure useEffect runs when `id` changes

  const handleAddColumn = () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (newColumnName.trim() === "") {
      setOpen(false);
      return;
    }

    try {
      const response = await api.post(`/boards/${id}/columns`, {
        name: newColumnName.trim(),
      });

      const newColumn = response.data;
      setColumns([...columns, newColumn]);
      setOpen(false);
      setNewColumnName("");
    } catch (error) {
      console.error("Error adding new column: ", error);
      // Handle error here, e.g., show an error message to the user
    }
  };

  const handleColumnDrop = async (draggedColumnIndex, droppedColumnIndex) => {
    const updatedColumns = [...columns];
    const draggedColumn = updatedColumns[draggedColumnIndex];
    updatedColumns[draggedColumnIndex] = updatedColumns[droppedColumnIndex];
    updatedColumns[droppedColumnIndex] = draggedColumn;
    setColumns(updatedColumns);

    try {
      await api.put(`/boards/${id}/columns/order`, updatedColumns);
    } catch (error) {
      console.error("Error updating column order: ", error);
      // Handle error here, e.g., show an error message to the user
    }
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
          {board?.title}
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

      <div
        className="kanban-grid"
        style={{
          overflowX: "auto",
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
          display: "flex",
        }}
      >
        {columns.map((column, index) => (
          <React.Fragment key={column.columnId}>
            {index > 0 && <div style={{ width: 16 }} />}
            <KanbanColumn
              column={column}
              columns={columns}
              setColumns={setColumns}
              columnIndex={index}
              onColumnDrop={handleColumnDrop}
            />
          </React.Fragment>
        ))}
      </div>

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
    </>
  );
}

export default Board;
