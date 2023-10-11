package com.kanbanboard.serviceimpl;

import com.kanbanboard.dto.BoardDto;
import com.kanbanboard.entity.BoardEntity;
import com.kanbanboard.exception.BoardNotFoundException;
import com.kanbanboard.repository.BoardsRepository;
import com.kanbanboard.service.BoardsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardsServiceImpl implements BoardsService {

    @Autowired
    private BoardsRepository boardsRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BoardDto> getAllBoards() {
        List<BoardEntity> boards = boardsRepository.findAll();
        return boards.stream()
                .map(boardEntity -> modelMapper.map(boardEntity, BoardDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<BoardDto> getBoardById(int id) throws BoardNotFoundException {
        Optional<BoardEntity> boardEntity = boardsRepository.findById(id);
        if (boardEntity.isEmpty()) throw new BoardNotFoundException("Board not found");
        else {
            return Optional.of(modelMapper.map(boardEntity.get(), BoardDto.class));
        }
    }

    @Override
    public BoardDto createBoard(BoardDto boardDto) {
        BoardEntity boardEntity = modelMapper.map(boardDto, BoardEntity.class);
        BoardEntity savedBoardEntity = boardsRepository.save(boardEntity);
        return modelMapper.map(savedBoardEntity, BoardDto.class);
    }

    @Override
    public Optional<BoardDto> updateBoard(int id, BoardDto updatedBoardDto) throws BoardNotFoundException {
        Optional<BoardEntity> existingBoardEntity = boardsRepository.findById(id);
        if (existingBoardEntity.isEmpty()) throw new BoardNotFoundException("Board not found");

        BoardEntity updatedBoardEntity = modelMapper.map(updatedBoardDto, BoardEntity.class);
        updatedBoardEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        boardsRepository.save(updatedBoardEntity);

        return Optional.of(modelMapper.map(updatedBoardEntity, BoardDto.class));
    }

    @Override
    public void deleteBoard(int id) throws BoardNotFoundException {
        Optional<BoardEntity> existingBoardEntity = boardsRepository.findById(id);
        if (existingBoardEntity.isEmpty()) throw new BoardNotFoundException("Board not found");

        boardsRepository.deleteById(id);
    }
}
