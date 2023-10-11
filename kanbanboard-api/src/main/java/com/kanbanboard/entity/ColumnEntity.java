package com.kanbanboard.entity;

import com.kanbanboard.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "columns")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ColumnEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int columnId;
    private String name;
    private int boardId;

    @OneToMany(mappedBy = "columnId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CardEntity> cards;
}