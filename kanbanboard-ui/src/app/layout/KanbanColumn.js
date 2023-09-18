import React, { useState } from "react";
import { Grid, Header, Button, Divider, Icon } from "semantic-ui-react";
import KanbanCard from "./KanbanCard";
import AddCardModal from "./AddCardModal";
import EditColumnModal from "./EditColumnModal";

function KanbanColumn({ column, columns, setColumns }) {
  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState(column.tasks);
  const [editColumnModalOpen, setEditColumnModalOpen] = useState(false);

  const handleDragStart = (e, taskId, columnName) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("columnName", columnName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnName = e.dataTransfer.getData("columnName");

    if (sourceColumnName === column.id) {
      return;
    }

    const updatedColumns = columns.map((col) => {
      if (col.id === sourceColumnName) {
        return {
          ...col,
          tasks: col.tasks.filter((task) => task.id !== taskId),
        };
      }
      if (col.id === column.id) {
        return {
          ...col,
          tasks: [
            ...col.tasks,
            { ...cards.find((card) => card.id === taskId) },
          ],
        };
      }
      return col;
    });

    setColumns(updatedColumns);
    setCards(updatedColumns.find((col) => col.id === column.id).tasks);
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
      col.id === updatedColumn.id ? updatedColumn : col
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
      if (col.id === column.id) {
        return {
          ...col,
          tasks: [...col.tasks, newCard],
        };
      }
      return col;
    });

    setColumns(updatedColumns);
    setCards(updatedColumns.find((col) => col.id === column.id).tasks);
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
          <span style={{ flex: 1, textAlign: "center" }}>{column.title}</span>
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
          {cards.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              columnId={column.id}
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
