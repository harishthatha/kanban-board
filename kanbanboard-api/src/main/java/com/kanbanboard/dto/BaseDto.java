package com.kanbanboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseDto {

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
