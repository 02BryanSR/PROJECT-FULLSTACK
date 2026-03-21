package com.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

	List<ProductEntity> findByCategoryId(Long categoryId);

	boolean existsByNameIgnoreCase(String name);
	
	List<ProductEntity> findByNameContainingIgnoreCase(String name);

}
