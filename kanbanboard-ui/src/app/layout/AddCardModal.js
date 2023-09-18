import React, { useState } from "react";
import { Modal, Form, Input, Button, Dropdown } from "semantic-ui-react";

function AddCardModal({ open, onClose, onAddCard }) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [assignee, setAssignee] = useState("");

  // Options for the assignee dropdown, replace with your own data
  const assigneeOptions = [
    { key: "1", text: "User 1", value: "user1" },
    { key: "2", text: "User 2", value: "user2" },
    // Add more options as needed
  ];

  const handleAddCard = () => {
    // Validate and process the card details here
    const newCard = {
      id: `${new Date().getTime()}`,
      title: cardTitle || `Task ${new Date().getTime()}`,
      description: cardDescription || "",
      storyPoints: storyPoints || 0, // You can convert this to a number if needed
      assignee: assignee || "Unassigned", // Default value if no assignee selected
    };
    onAddCard(newCard);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="tiny">
      <Modal.Header>Add Card</Modal.Header>
      <Modal.Content>
        <Form>
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
            <Dropdown
              placeholder="Select assignee"
              fluid
              search
              selection
              options={assigneeOptions}
              value={assignee}
              onChange={(e, data) => setAssignee(data.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button
          primary
          icon="checkmark"
          labelPosition="right"
          content="Add Card"
          onClick={handleAddCard}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AddCardModal;
