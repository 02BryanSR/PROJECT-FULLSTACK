package com.project.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.ProductDTO;
import com.project.entity.CategoryEntity;
import com.project.entity.ProductEntity;
import com.project.mapper.ProductMapper;
import com.project.repository.CategoryRepository;
import com.project.repository.ProductRepository;
import com.project.service.ProductService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductMapper mapper;
    private final ProductRepository repo;
    private final CategoryRepository categoryRepo;

    public ProductServiceImpl(ProductMapper mapper, ProductRepository repo, CategoryRepository categoryRepo) {
        this.mapper = mapper;
        this.repo = repo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<ProductDTO> findAll() {
        List<ProductEntity> products = repo.findAll();
        return mapper.toListDtos(products);
    }

    @Override
    public List<ProductDTO> findByCategoryId(Long categoryId) {
        List<ProductEntity> products = repo.findByCategoryId(categoryId);
        return mapper.toListDtos(products);
    }

    @Override
    public ProductDTO findById(Long id) {
        ProductEntity product = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        return mapper.toDto(product);
    }

    @Override
    public List<ProductDTO> findByName(String name) {
        if (name == null || name.isBlank()) {
            throw new RuntimeException("Name is required");
        }

        List<ProductEntity> products = repo.findByNameContainingIgnoreCase(name.trim());
        return mapper.toListDtos(products);
    }

    @Override
    public ProductDTO createProduct(ProductDTO dto) {
        validateProduct(dto);

        CategoryEntity category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        ProductEntity product = mapper.toEntity(dto);
        product.setCategory(category);

        if (product.getStock() == null) {
            product.setStock(0);
        }

        ProductEntity saved = repo.save(product);
        return mapper.toDto(saved);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        ProductEntity productFound = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        mapper.updateEntityFromDto(dto, productFound);

        if (dto.getCategoryId() != null) {
            CategoryEntity category = categoryRepo.findById(dto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + dto.getCategoryId()));
            productFound.setCategory(category);
        }

        if (productFound.getStock() != null && productFound.getStock() < 0) {
            throw new RuntimeException("Stock cannot be negative");
        }

        ProductEntity saved = repo.save(productFound);
        return mapper.toDto(saved);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Product not found");
        }
        repo.deleteById(id);
    }

    @Override
    public boolean hasStock(Long productId, Integer requiredQuantity) {
        if (productId == null) {
            throw new RuntimeException("productId is required");
        }
        if (requiredQuantity == null || requiredQuantity < 0) {
            throw new RuntimeException("requiredQuantity is invalid");
        }

        ProductEntity product = repo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return product.getStock() != null && product.getStock() >= requiredQuantity;
    }

    @Override
    public ProductDTO increaseStock(Long productId, Integer amount) {
        if (amount == null || amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }

        ProductEntity productFound = repo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (productFound.getStock() == null) {
            productFound.setStock(0);
        }

        productFound.setStock(productFound.getStock() + amount);

        ProductEntity saved = repo.save(productFound);
        return mapper.toDto(saved);
    }

    @Override
    public ProductDTO decreaseStock(Long productId, Integer amount) {
        if (amount == null || amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }

        ProductEntity product = repo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!hasStock(productId, amount)) {
            throw new RuntimeException("Not enough stock");
        }

        product.setStock(product.getStock() - amount);

        ProductEntity saved = repo.save(product);
        return mapper.toDto(saved);
    }

    @Override
    public Integer getProductStock(Long productId) {
        if (productId == null) {
            throw new RuntimeException("productId is required");
        }

        ProductEntity product = repo.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));

        return product.getStock();
    }

    private void validateProduct(ProductDTO dto) {
        if (dto == null) {
            throw new RuntimeException("ProductDTO is required");
        }
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new RuntimeException("Product name is required");
        }
        if (dto.getCategoryId() == null) {
            throw new RuntimeException("categoryId is required");
        }
        if (dto.getPrice() == null || dto.getPrice().doubleValue() < 0) {
            throw new RuntimeException("Price is invalid");
        }
        if (dto.getStock() != null && dto.getStock() < 0) {
            throw new RuntimeException("Stock cannot be negative");
        }
    }
}