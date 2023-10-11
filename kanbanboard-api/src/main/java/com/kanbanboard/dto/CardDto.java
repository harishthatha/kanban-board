package com.kanbanboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDto extends BaseDto {
    private int cardId;

    private String title;
    private String description;
    private int points;
    private int assignedUserId;
    private int columnId;
    private int boardId;

}
