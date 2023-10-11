package com.kanbanboard.dto;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto extends BaseDto {
    private int boardId;
    private String title;
    private String description;
    private List<CardDto> cards;
}
