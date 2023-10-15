import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Header } from "semantic-ui-react";
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
  }, [id]);

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
          paddingLeft: 16,
          paddingRight: 160,
          position: "fixed",
          width: "100%",
          top: 60,
          left: 150,
          zIndex: 1,
          right: 150,
        }}
      >
        <Header as="h1">{board?.title}</Header>
        <Button color="instagram" onClick={handleAddColumn}>
          Add another list
        </Button>
      </div>
      <div
        style={{
          overflow: "auto",
          position: "fixed",
          bottom: 0,
          top: 130,
          left: 150,
          right: 0,
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              marginLeft: 16,
              marginRight: 16,
              display: "flex",
              whiteSpace: "nowrap",
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
      </div>
    </>
  );
}

export default Board;
