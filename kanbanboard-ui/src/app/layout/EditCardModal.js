import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Dropdown,
  Message,
} from "semantic-ui-react";
import api from "../api/api";

function EditCardModal({ open, onClose, onUpdate, card }) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [assignee, setAssignee] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (card) {
      setCardTitle(card.title);
      setCardDescription(card.description);
      setStoryPoints(card.points.toString());
      setAssignee(card.assignedUserId.toString());
    }
  }, [card]);

  const handleUpdateCard = async () => {
    if (!cardTitle || !assignee) {
      setError("Title and Assignee are required fields.");
      return;
    }

    try {
      const response = await api.put(`/cards/${card.cardId}`, {
        title: cardTitle,
        description: cardDescription,
        points: parseInt(storyPoints),
        assignedUserId: parseInt(assignee),
      });

      const updatedCard = response.data;
      onUpdate(updatedCard);
      onClose();
    } catch (error) {
      console.error("Error updating card: ", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setError("");
        onClose();
      }}
      size="tiny"
    >
      <Modal.Header>Edit Card</Modal.Header>
      <Modal.Content>
        <Form error={!!error}>
          <Form.Field>
            <label>Title</label>
            <Input
              placeholder="Enter title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder="Enter description"
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Story Points</label>
            <Input
              type="number"
              placeholder="Enter story points"
              value={storyPoints}
              onChange={(e) => setStoryPoints(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Assignee</label>
            <Input
              placeholder="Enter assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
          </Form.Field>
          <Message error content={error} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setError("");
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          primary
          icon="checkmark"
          labelPosition="right"
          content="Save"
          onClick={handleUpdateCard}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditCardModal;
