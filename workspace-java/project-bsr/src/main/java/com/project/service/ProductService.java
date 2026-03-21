package com.project.service;

import java.util.List;
import com.project.dto.ProductDTO;


public interface ProductService {

	List<ProductDTO> findAll();

	List<ProductDTO> findByCategoryId(Long categoryId);

	ProductDTO findById(Long id);
	
	List<ProductDTO> findByName(String name);

	ProductDTO createProduct(ProductDTO dto);

	ProductDTO updateProduct(Long id, ProductDTO dto);

	void deleteProduct(Long id);

	boolean hasStock(Long productId, Integer requiredQuantity);

	ProductDTO increaseStock(Long productId, Integer amount);

	ProductDTO decreaseStock(Long productId, Integer amount);
	
	Integer getProductStock(Long productId);;

}
