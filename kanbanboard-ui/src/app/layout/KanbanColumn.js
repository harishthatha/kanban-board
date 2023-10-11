import React, { useEffect, useState } from "react";
import { Grid, Header, Button, Divider, Icon } from "semantic-ui-react";
import KanbanCard from "./KanbanCard";
import AddCardModal from "./AddCardModal";
import EditColumnModal from "./EditColumnModal";

function KanbanColumn({ column = {}, columns, setColumns }) {
  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState(column.cards || []);
  const [editColumnModalOpen, setEditColumnModalOpen] = useState(false);

  const handleDragStart = (e, taskId, columnName) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("columnName", columnName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setCards(column.cards || []);
  }, [column, column?.cards]);

  const handleDrop = (e) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const sourceColumnName = parseInt(e.dataTransfer.getData("columnName"));

    if (sourceColumnName === column.columnId) {
      return;
    }

    const updatedColumns = columns.map((col) => {
      if (col.columnId === sourceColumnName) {
        const shiftedCard = col.cards.find((card) => card.cardId === taskId);
        return {
          ...col,
          cards: col.cards.filter((card) => card.cardId !== taskId),
        };
      }

      if (col.columnId === column.columnId) {
        const shiftedCard = columns
          .find((col) => col.columnId === sourceColumnName)
          .cards.find((card) => card.cardId === taskId);

        return {
          ...col,
          cards: [...col.cards, { ...shiftedCard }],
        };
      }

      return col; // Important: Return the unchanged column if not the source or destination column
    });

    setColumns([...updatedColumns]);
    setCards(
      updatedColumns.find((col) => col.columnId === column.columnId).cards
    );
  };

  const openEditColumnModal = () => {
    setEditColumnModalOpen(true);
  };

  const closeEditColumnModal = () => {
    setEditColumnModalOpen(false);
  };

  const handleEditColumn = (updatedColumn) => {
    // Handle column update here
    const updatedColumns = columns.map((col) =>
      col.columnId === updatedColumn.id ? updatedColumn : col
    );
    setColumns(updatedColumns);
    closeEditColumnModal();
  };

  const openAddCardModal = () => {
    setOpenModal(true);
  };

  const closeAddCardModal = () => {
    setOpenModal(false);
  };

  const handleAddCard = (newCard) => {
    const updatedColumns = columns.map((col) => {
      if (col.columnId === column.columnId) {
        return {
          ...col,
          tasks: [...col.cards, newCard],
        };
      }
      return col;
    });

    setColumns(updatedColumns);
    setCards(
      updatedColumns.find((col) => col.columnId === column.columnId).tasks
    );
  };

  return (
    <Grid.Column
      className="kanban-column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: 260,
      }}
    >
      <div
        style={{
          border: "1px solid black",
          marginBottom: "16px",
          borderRadius: "8px",
        }}
      >
        <Header
          as="h3"
          className="kanban-column-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <span style={{ flex: 1, textAlign: "center" }}>{column.name}</span>
          <Icon
            //name="ellipsis horizontal"
            name="edit"
            style={{ cursor: "pointer", fontSize: "13px", marginRight: "20px" }}
            onClick={openEditColumnModal}
          />
        </Header>

        <Divider
          style={{
            marginBottom: "12px",
            width: "100%",
          }}
        />
        <div style={{ padding: "16px" }}>
          {cards &&
            cards.map((task) => (
              <KanbanCard
                key={task.id}
                card={task}
                columnId={column.columnId}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
          <div style={{ marginTop: cards.length === 0 ? 30 : 16 }}>
            <Button color="instagram" fluid onClick={openAddCardModal}>
              <i className="plus icon" /> Add a card
            </Button>
          </div>
        </div>
        <AddCardModal
          open={openModal}
          onClose={closeAddCardModal}
          onAddCard={handleAddCard}
        />
        <EditColumnModal
          open={editColumnModalOpen}
          onClose={closeEditColumnModal}
          column={column}
          onUpdate={handleEditColumn}
        />
      </div>
    </Grid.Column>
  );
}

export default KanbanColumn;
