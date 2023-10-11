package com.kanbanboard.service;

import com.kanbanboard.dto.BoardDto;
import com.kanbanboard.exception.BoardNotFoundException;

import java.util.List;
import java.util.Optional;

public interface BoardsService {
    List<BoardDto> getAllBoards();
    Optional<BoardDto> getBoardById(int id) throws BoardNotFoundException;
    BoardDto createBoard(BoardDto boardDto);
    Optional<BoardDto> updateBoard(int id, BoardDto updatedBoardDto) throws BoardNotFoundException;
    void deleteBoard(int id) throws BoardNotFoundException;
}
