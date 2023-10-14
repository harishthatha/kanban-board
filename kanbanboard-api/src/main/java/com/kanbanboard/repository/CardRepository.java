package com.kanbanboard.repository;

import com.kanbanboard.entity.CardEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends CrudRepository<CardEntity, Integer> {

    @Query("SELECT c FROM CardEntity c WHERE c.cardId = :cardId AND c.columnId = :columnId AND c.boardId = :boardId")
    Optional<CardEntity> findByCardIdAndColumnIdAndBoardId(@Param("cardId") int cardId, @Param("columnId") int columnId, @Param("boardId") int boardId);

    @Query("SELECT c FROM CardEntity c WHERE c.columnId = :columnId AND c.boardId = :boardId")
    List<CardEntity> findByColumnIdAndBoardId(@Param("columnId") int columnId, @Param("boardId") int boardId);


}
