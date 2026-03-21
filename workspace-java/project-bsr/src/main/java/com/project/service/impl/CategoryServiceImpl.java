package com.project.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.CategoryDTO;
import com.project.entity.CategoryEntity;
import com.project.mapper.CategoryMapper;
import com.project.repository.CategoryRepository;
import com.project.service.CategoryService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryMapper mapper;
    private final CategoryRepository repo;

    public CategoryServiceImpl(CategoryMapper mapper, CategoryRepository repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    @Override
    public List<CategoryDTO> findAll() {
        List<CategoryEntity> listCategories = repo.findAll();
        return mapper.toListDtos(listCategories);
    }

    @Override
    public CategoryDTO findById(Long id) {
        CategoryEntity category = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return mapper.toDto(category);
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO dto) {
        validateCreate(dto);

        if (repo.existsByNameIgnoreCase(dto.getName().trim())) {
            throw new IllegalArgumentException("A category with that name already exists");
        }

        CategoryEntity category = mapper.toEntity(dto);
        CategoryEntity saved = repo.save(category);
        return mapper.toDto(saved);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO dto, Long id) {
        CategoryEntity categoryFound = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            String newName = dto.getName().trim();

            if (!categoryFound.getName().equalsIgnoreCase(newName)
                    && repo.existsByNameIgnoreCase(newName)) {
                throw new IllegalArgumentException("A category with that name already exists");
            }

            categoryFound.setName(newName);
        }

        if (dto.getDescription() != null && !dto.getDescription().isBlank()) {
            categoryFound.setDescription(dto.getDescription().trim());
        }

        CategoryEntity saved = repo.save(categoryFound);
        return mapper.toDto(saved);
    }

    @Override
    public void deleteCategory(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        repo.deleteById(id);
    }

    private void validateCreate(CategoryDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Category data is required");
        }
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (dto.getDescription() == null || dto.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description is required");
        }
    }
}