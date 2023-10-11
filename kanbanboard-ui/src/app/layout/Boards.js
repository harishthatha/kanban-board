import React, { useEffect, useState } from "react";
import { Card, Container, Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../api/api";

const Boards = () => {
  const [boardsData, setBoardsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newBoard, setNewBoard] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get("/boards");
        const data = response.data;
        setBoardsData(data);
      } catch (error) {
        console.error("Error fetching boards data: ", error);
      }
    };

    fetchBoards();
  }, []);

  const handleCreateBoard = () => {
    if (!newBoard.title || !newBoard.description) {
      return;
    }

    const newBoardId = Date.now();

    const createdBoard = {
      id: newBoardId,
      title: newBoard.title,
      description: newBoard.description,
    };

    const updatedBoardsData = [...boardsData, createdBoard];

    setBoardsData(updatedBoardsData);
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
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {boardsData.map((board) => (
          <Link to={`/boards/${board.boardId}`} key={board.boardId}>
            <Card
              style={{
                borderRadius: "8px",
                width: "300px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
                cursor: "pointer",
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
