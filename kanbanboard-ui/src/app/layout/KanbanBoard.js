import React, { useState } from "react";
import {
  Container,
  Button,
  Grid,
  Input,
  Modal,
  Header,
} from "semantic-ui-react";
import KanbanColumn from "./KanbanColumn";

function KanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: "inProgress",
      title: "In Progress",
      tasks: [
        { id: "task-1", content: "Task 1" },
        { id: "task-2", content: "Task 2" },
      ],
    },
    {
      id: "dev",
      title: "Dev",
      tasks: [
        { id: "task-3", content: "Task 3" },
        { id: "task-4", content: "Task 4" },
      ],
    },
    {
      id: "prod",
      title: "Prod",
      tasks: [
        { id: "task-5", content: "Task 5" },
        { id: "task-6", content: "Task 6" },
      ],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    if (newColumnName.trim() === "") {
      // Don't add an empty column name
      setOpen(false);
      return;
    }

    const columnId = `column-${new Date().getTime()}`;
    const updatedColumns = [
      ...columns,
      {
        id: columnId,
        title: newColumnName,
        tasks: [],
      },
    ];

    setColumns(updatedColumns);
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
            minHeight: "100vh", // Set the minimum height to fill the page
          }}
        >
          {columns.map((column, index) => (
            <React.Fragment key={column.id}>
              {index > 0 && <div style={{ width: 16 }} />}{" "}
              {/* Add space between columns */}
              <KanbanColumn
                column={column}
                columns={columns}
                setColumns={setColumns}
              />
            </React.Fragment>
          ))}
        </div>
        <div style={{ height: "16px" }}></div>{" "}
        {/* Add some space at the bottom */}
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

export default KanbanBoard;
