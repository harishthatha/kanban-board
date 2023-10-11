package com.kanbanboard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "cards")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CardEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cardId;

    private String title;
    private String description;
    private int points;
    private int assignedUserId;
    private int columnId;
    private int boardId;
}
