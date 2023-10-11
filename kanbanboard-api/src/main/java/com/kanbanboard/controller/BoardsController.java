package com.kanbanboard.controller;

import com.kanbanboard.dto.BoardDto;
import com.kanbanboard.exception.BoardNotFoundException;
import com.kanbanboard.service.BoardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/boards")
public class BoardsController {

    private final BoardsService boardsService;

    @Autowired
    public BoardsController(BoardsService boardsService) {
        this.boardsService = boardsService;
    }

    @GetMapping
    public ResponseEntity<List<BoardDto>> getAllBoards() {
        List<BoardDto> boards = boardsService.getAllBoards();
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDto> getBoardById(@PathVariable int id) throws BoardNotFoundException {
        Optional<BoardDto> board = boardsService.getBoardById(id);
        return ResponseEntity.ok(board.orElse(null));
    }

    @PostMapping
    public ResponseEntity<BoardDto> createBoard(@RequestBody BoardDto boardDto) {
        BoardDto createdBoard = boardsService.createBoard(boardDto);
        return ResponseEntity.ok(createdBoard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardDto> updateBoard(@PathVariable int id, @RequestBody BoardDto updatedBoardDto)
            throws BoardNotFoundException {
        Optional<BoardDto> updatedBoard = boardsService.updateBoard(id, updatedBoardDto);
        return ResponseEntity.ok(updatedBoard.orElse(null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable int id) throws BoardNotFoundException {
        boardsService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
}
