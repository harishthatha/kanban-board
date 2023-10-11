package com.kanbanboard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "boards")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BoardEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardId;

    private String title;
    private String description;
    private String assignedUser; // Assuming assigned user for each board

    @OneToMany(mappedBy = "boardId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ColumnEntity> columns;
}
