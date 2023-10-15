package com.kanbanboard.dto;

import com.kanbanboard.entity.BoardEntity;
import com.kanbanboard.entity.CardEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnDto {
    private int columnId;
    private String name;
    private int boardId;
    private int position;
    private List<CardDto> cards;
}
