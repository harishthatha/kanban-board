import React, { useState } from "react";
import { Card, Container, Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const initialBoardsData = [
  {
    id: 1,
    title: "Board 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Board 2",
    description: "Suspendisse potenti. Nulla facilisi.",
  },
  {
    id: 3,
    title: "Board 3",
    description: "Praesent eget ligula ac augue pulvinar fermentum.",
  },
];

const Boards = () => {
  const [boardsData, setBoardsData] = useState(initialBoardsData);
  const [openModal, setOpenModal] = useState(false);
  const [newBoard, setNewBoard] = useState({ title: "", description: "" });

  const handleCreateBoard = () => {
    // Validate the form fields here if needed
    if (!newBoard.title || !newBoard.description) {
      return;
    }

    // Generate a unique ID for the new board
    const newBoardId = Date.now();

    // Create the new board object
    const createdBoard = {
      id: newBoardId,
      title: newBoard.title,
      description: newBoard.description,
    };

    // Add the new board to the boardsData array
    const updatedBoardsData = [...boardsData, createdBoard];

    // Update the state to reflect the new board
    setBoardsData(updatedBoardsData);

    // Close the modal and reset the form fields
    setOpenModal(false);
    setNewBoard({ title: "", description: "" });
  };

  return (
    <Container style={{ marginTop: 16 }}>
      <Button
        primary
        style={{ marginTop: "16px" }}
        onClick={() => setOpenModal(true)}
      >
        Create Board
      </Button>
      <div
        style={{
          display: "flex",
          gap: "16px", // Adjust the gap as needed
          flexWrap: "wrap", // Allow cards to wrap to the next line
        }}
      >
        {boardsData.map((board) => (
          <Link to={`/boards/${board.id}`} key={board.id}>
            {" "}
            {/* Wrap the Card in Link */}
            <Card
              style={{
                borderRadius: "8px",
                width: "300px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
                cursor: "pointer", // Add cursor pointer
              }}
            >
              <Card.Content>
                <Card.Header>{board.title}</Card.Header>
                <Card.Description>{board.description}</Card.Description>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)} size="tiny">
        <Modal.Header>Create a New Board</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Board Title"
                value={newBoard.title}
                onChange={(e) =>
                  setNewBoard({ ...newBoard, title: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                placeholder="Board Description"
                value={newBoard.description}
                onChange={(e) =>
                  setNewBoard({ ...newBoard, description: e.target.value })
                }
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button primary onClick={handleCreateBoard}>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default Boards;
