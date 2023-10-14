package com.kanbanboard.controller;

import com.kanbanboard.dto.CardDto;
import com.kanbanboard.exception.CardNotFoundException;
import com.kanbanboard.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/boards/{boardId}/columns/{columnId}/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<CardDto> createCard(@PathVariable int boardId,
                                              @PathVariable int columnId,
                                              @RequestBody CardDto cardDto) {
        CardDto createdCard = cardService.createCard(boardId, columnId, cardDto);
        return ResponseEntity.ok(createdCard);
    }

    @GetMapping("/{cardId}")
    public ResponseEntity<CardDto> getCard(@PathVariable int boardId,
                                           @PathVariable int columnId,
                                           @PathVariable int cardId)
            throws CardNotFoundException {
        Optional<CardDto> card = cardService.getCard(boardId, columnId, cardId);
        return ResponseEntity.ok(card.orElse(null));
    }

    @GetMapping
    public ResponseEntity<List<CardDto>> getAllCards(@PathVariable int boardId,
                                                     @PathVariable int columnId) {
        List<CardDto> cards = cardService.getAllCards(boardId, columnId);
        return ResponseEntity.ok(cards);
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<CardDto> updateCard(@PathVariable int boardId,
                                              @PathVariable int columnId,
                                              @PathVariable int cardId,
                                              @RequestBody CardDto updatedCardDto)
            throws CardNotFoundException {
        Optional<CardDto> updatedCard = cardService.updateCard(boardId, columnId, cardId, updatedCardDto);
        return ResponseEntity.ok(updatedCard.orElse(null));
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<Void> deleteCard(@PathVariable int boardId,
                                           @PathVariable int columnId,
                                           @PathVariable int cardId)
            throws CardNotFoundException {
        cardService.deleteCard(boardId, columnId, cardId);
        return ResponseEntity.noContent().build();
    }
}

