package com.kanbanboard.repository;

import com.kanbanboard.entity.BoardEntity;
import com.kanbanboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardsRepository extends JpaRepository<BoardEntity,Integer> {

}
