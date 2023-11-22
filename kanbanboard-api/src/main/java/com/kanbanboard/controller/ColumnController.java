package com.kanbanboard.controller;

import com.kanbanboard.dto.ColumnDto;
import com.kanbanboard.exception.ColumnNotFoundException;
import com.kanbanboard.service.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/boards/{boardId}/columns")
public class ColumnController {

    private final ColumnService columnService;

    @Autowired
    public ColumnController(ColumnService columnService) {
        this.columnService = columnService;
    }

    @GetMapping
    public ResponseEntity<List<ColumnDto>> getColumnsByBoardId(@PathVariable int boardId) {
        List<ColumnDto> columns = columnService.getColumnsByBoardId(boardId);
        return ResponseEntity.ok(columns);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ColumnDto> getColumnById(@PathVariable int boardId, @PathVariable int id)
            throws ColumnNotFoundException {
        Optional<ColumnDto> column = columnService.getColumnById(boardId, id);
        return ResponseEntity.ok(column.orElse(null));
    }

    @PostMapping
    public ResponseEntity<ColumnDto> createColumn(@PathVariable int boardId, @RequestBody ColumnDto columnDto) {
        ColumnDto createdColumn = columnService.createColumn(boardId, columnDto);
        return ResponseEntity.ok(createdColumn);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColumnDto> updateColumn(@PathVariable int boardId, @PathVariable int id,
                                                  @RequestBody ColumnDto updatedColumnDto) throws ColumnNotFoundException {
        Optional<ColumnDto> updatedColumn = columnService.updateColumn(boardId, id, updatedColumnDto);
        return ResponseEntity.ok(updatedColumn.orElse(null));
    }

    // the way it is more comfy and make it run on the same and other machines also
    // which makes more

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColumn(@PathVariable int boardId, @PathVariable int id)
            throws ColumnNotFoundException {
        columnService.deleteColumn(boardId, id);
        return ResponseEntity.noContent().build();
    }
}
