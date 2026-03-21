package com.project.service;
import java.util.List;
import com.project.dto.CategoryDTO;


public interface CategoryService {

	List<CategoryDTO> findAll();

	CategoryDTO findById(Long id);

	CategoryDTO createCategory(CategoryDTO dto);

	CategoryDTO updateCategory(CategoryDTO dto, Long id);

	void deleteCategory(Long id);
}
