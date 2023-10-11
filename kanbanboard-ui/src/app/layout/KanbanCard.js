import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import EditCardModal from "./EditCardModal"; // Import the new component

function KanbanCard({ card = {}, columnId, onDragStart, onDragOver, onDrop }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalSave = (updatedCard) => {
    // Handle saving the edited card details here
    // You can update the card in your state or send it to a parent component for handling
    // For this example, we'll just update the local state
    setEditedCard(updatedCard);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card
        key={card.cardId}
        fluid
        draggable
        onDragStart={(e) => onDragStart(e, card.cardId, columnId)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(e);
        }}
        style={{
          marginRight: 5,
          borderRadius: 8,
          cursor: "pointer",
          backgroundColor: "white",
        }}
        onClick={handleEditClick}
      >
        <Card.Content>
          <Card.Header style={{ color: "black", fontSize: "14px" }}>
            {card.title}
          </Card.Header>
          {/* <Card.Meta>Points: {card.points}</Card.Meta> */}
          <Card.Description>{card.description}</Card.Description>
        </Card.Content>
      </Card>

      <EditCardModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSave={handleEditModalSave}
        card={editedCard}
      />
    </>
  );
}

export default KanbanCard;
