import React, { useState } from "react";
import { Modal, Form, Input, Button, Dropdown } from "semantic-ui-react";

function EditCardModal({ isOpen, onClose, onSave, onDelete, task }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    // Handle saving the edited task details
    onSave(editedTask);
  };

  const handleDelete = () => {
    // Handle deleting the task
    onDelete(task.id);
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="tiny">
      <Modal.Header>Edit Card</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Task Content</label>
            <Input
              placeholder="Edit task content"
              value={editedTask.content}
              onChange={(e) =>
                setEditedTask({ ...editedTask, content: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder="Edit description"
              value={editedTask.description || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Story Points</label>
            <Input
              type="number"
              placeholder="Edit story points"
              value={editedTask.storyPoints || ""}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  storyPoints: parseInt(e.target.value) || null,
                })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Assignee</label>
            <Dropdown
              placeholder="Select assignee"
              selection
              options={[]}
              value={editedTask.assignee || ""}
              onChange={(e, { value }) =>
                setEditedTask({ ...editedTask, assignee: value })
              }
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" floated="left" onClick={handleDelete}>
          Delete
        </Button>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button
          primary
          icon="checkmark"
          labelPosition="right"
          content="Save"
          onClick={handleSave}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditCardModal;
