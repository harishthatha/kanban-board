package com.kanbanboard.service;

import com.kanbanboard.dto.CardDto;
import com.kanbanboard.exception.CardNotFoundException;

import java.util.List;
import java.util.Optional;

public interface CardService {

    CardDto createCard(int boardId, int columnId, CardDto cardDto);

    Optional<CardDto> getCard(int boardId, int columnId, int cardId) throws CardNotFoundException;

    List<CardDto> getAllCards(int boardId, int columnId);

    Optional<CardDto> updateCard(int boardId, int columnId, int cardId, CardDto updatedCardDto)
            throws CardNotFoundException;

    void deleteCard(int boardId, int columnId, int cardId) throws CardNotFoundException;
}
