package com.kanbanboard.serviceimpl;

import com.kanbanboard.dto.CardDto;
import com.kanbanboard.entity.CardEntity;
import com.kanbanboard.exception.CardNotFoundException;
import com.kanbanboard.repository.CardRepository;
import com.kanbanboard.service.CardService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CardDto createCard(int boardId, int columnId, CardDto cardDto) {
        CardEntity cardEntity = modelMapper.map(cardDto, CardEntity.class);
        cardEntity.setBoardId(boardId);
        cardEntity.setColumnId(columnId);
        CardEntity savedCardEntity = cardRepository.save(cardEntity);
        return modelMapper.map(savedCardEntity, CardDto.class);
    }

    @Override
    public Optional<CardDto> getCard(int boardId, int columnId, int cardId) throws CardNotFoundException {
        Optional<CardEntity> cardEntity = cardRepository.findByCardIdAndColumnIdAndBoardId(cardId, columnId, boardId);
        if (cardEntity.isEmpty()) {
            throw new CardNotFoundException("Card not found");
        } else {
            return Optional.of(modelMapper.map(cardEntity.get(), CardDto.class));
        }
    }

    @Override
    public List<CardDto> getAllCards(int boardId, int columnId) {
        List<CardEntity> cards = cardRepository.findByColumnIdAndBoardId(columnId, boardId);
        return cards.stream()
                .map(cardEntity -> modelMapper.map(cardEntity, CardDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CardDto> updateCard(int boardId, int columnId, int cardId, CardDto updatedCardDto) throws CardNotFoundException {
        Optional<CardEntity> existingCardEntity = cardRepository.findByCardIdAndColumnIdAndBoardId(cardId, columnId, boardId);
        if (existingCardEntity.isEmpty()) {
            throw new CardNotFoundException("Card not found");
        }

        CardEntity updatedCardEntity = modelMapper.map(updatedCardDto, CardEntity.class);
        updatedCardEntity.setBoardId(boardId);
        updatedCardEntity.setColumnId(columnId);
        updatedCardEntity.setCardId(cardId);
        cardRepository.save(updatedCardEntity);

        return Optional.of(modelMapper.map(updatedCardEntity, CardDto.class));
    }

    @Override
    public void deleteCard(int boardId, int columnId, int cardId) throws CardNotFoundException {
        Optional<CardEntity> existingCardEntity = cardRepository.findByCardIdAndColumnIdAndBoardId(cardId, columnId, boardId);
        if (existingCardEntity.isEmpty()) {
            throw new CardNotFoundException("Card not found");
        }

        cardRepository.deleteById(cardId);
    }
}
