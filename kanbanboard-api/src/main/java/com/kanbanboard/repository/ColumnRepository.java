package com.kanbanboard.repository;

import com.kanbanboard.entity.ColumnEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ColumnRepository extends JpaRepository<ColumnEntity, Integer> {

    @Query("SELECT c FROM ColumnEntity c WHERE c.boardId = :boardId")
    List<ColumnEntity> findByBoardId(@Param("boardId") int boardId);

    @Query("SELECT c FROM ColumnEntity c WHERE c.columnId = :columnId AND c.boardId = :boardId")
    Optional<ColumnEntity> findByColumnIdAndBoardId(@Param("columnId") int columnId, @Param("boardId") int boardId);
}
