import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import EditCardModal from "./EditCardModal"; // Import the new component

function KanbanCard({ task, columnId, onDragStart, onDragOver, onDrop }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalSave = (updatedTask) => {
    // Handle saving the edited task details here
    // You can update the task in your state or send it to a parent component for handling
    // For this example, we'll just update the local state
    task.content = updatedTask.content;
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card
        key={task.id}
        fluid
        draggable
        onDragStart={(e) => onDragStart(e, task.id, columnId)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(e);
        }}
        style={{
          marginRight: 5,
          borderRadius: 8,
          cursor: "pointer",
          backgroundColor: "whtie",
        }}
        onClick={handleEditClick}
      >
        <Card.Content>
          <Card.Header style={{ color: "black", fontSize: "14px" }}>
            {task.content}
          </Card.Header>
        </Card.Content>
      </Card>

      <EditCardModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSave={handleEditModalSave}
        task={editedTask}
      />
    </>
  );
}

export default KanbanCard;
