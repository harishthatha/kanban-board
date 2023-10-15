package com.kanbanboard.serviceimpl;

import com.kanbanboard.dto.ColumnDto;
import com.kanbanboard.entity.BoardEntity;
import com.kanbanboard.entity.ColumnEntity;
import com.kanbanboard.exception.ColumnNotFoundException;
import com.kanbanboard.repository.BoardsRepository;
import com.kanbanboard.repository.ColumnRepository;
import com.kanbanboard.service.ColumnService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ColumnServiceImpl implements ColumnService {

    @Autowired
    private ColumnRepository columnRepository;
    @Autowired
    private BoardsRepository boardsRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ColumnDto> getColumnsByBoardId(int boardId) {
        List<ColumnEntity> columns = columnRepository.findByBoardId(boardId);
            return columns.stream()
                    .map(columnEntity -> modelMapper.map(columnEntity, ColumnDto.class))
                    .collect(Collectors.toList());
    }

    @Override
    public Optional<ColumnDto> getColumnById(int boardId, int columnId) throws ColumnNotFoundException {
//        Optional<ColumnEntity> columnEntity = columnRepository.findByColumnIdAndBoardId(columnId, boardId);
//        if (columnEntity.isEmpty()) throw new ColumnNotFoundException("Column not found");
//        else {
//            return Optional.of(modelMapper.map(columnEntity.get(), ColumnDto.class));
//        }
        return null;
    }

    @Override
    public ColumnDto createColumn(int boardId, ColumnDto columnDto) {
        ColumnEntity columnEntity = modelMapper.map(columnDto, ColumnEntity.class);
        columnEntity.setBoardId(boardId);
        ColumnEntity savedColumnEntity = columnRepository.save(columnEntity);
        return modelMapper.map(savedColumnEntity, ColumnDto.class);
    }

    @Override
    public Optional<ColumnDto> updateColumn(int boardId, int columnId, ColumnDto updatedColumnDto) throws ColumnNotFoundException {
        Optional<ColumnEntity> existingColumnEntity = columnRepository.findByColumnIdAndBoardId(columnId, boardId);
        if (existingColumnEntity.isEmpty()) throw new ColumnNotFoundException("Column not found");

        ColumnEntity updatedColumnEntity = modelMapper.map(updatedColumnDto, ColumnEntity.class);
        updatedColumnEntity.setBoardId(boardId);
        updatedColumnEntity.setColumnId(columnId);
        updatedColumnEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        columnRepository.save(updatedColumnEntity);

        return Optional.of(modelMapper.map(updatedColumnEntity, ColumnDto.class));
    }

    @Override
    public void deleteColumn(int boardId, int columnId) throws ColumnNotFoundException {
        Optional<ColumnEntity> existingColumnEntity = columnRepository.findByColumnIdAndBoardId(columnId, boardId);
        if (existingColumnEntity.isEmpty()) throw new ColumnNotFoundException("Column not found");

        columnRepository.deleteById(columnId);
    }
}
