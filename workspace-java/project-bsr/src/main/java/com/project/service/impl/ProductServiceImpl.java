package com.project.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.ProductAdminForm;
import com.project.dto.ProductDTO;
import com.project.entity.CategoryEntity;
import com.project.entity.ProductEntity;
import com.project.mapper.ProductMapper;
import com.project.repository.CategoryRepository;
import com.project.repository.ProductRepository;
import com.project.service.ProductService;
import com.project.service.StorageService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductMapper mapper;
    private final ProductRepository repo;
    private final CategoryRepository categoryRepo;
    private final StorageService storageService;

    public ProductServiceImpl(ProductMapper mapper, ProductRepository repo, CategoryRepository categoryRepo,
			StorageService storageService) {
		super();
		this.mapper = mapper;
		this.repo = repo;
		this.categoryRepo = categoryRepo;
		this.storageService = storageService;
	}

	@Override
    public List<ProductDTO> findAll() {
        List<ProductEntity> products = repo.findAll();
        return mapper.toListDtos(products);
    }

    @Override
    public List<ProductDTO> findByCategoryId(Long categoryId) {
        List<ProductEntity> products = repo.findByCategory_Id(categoryId);
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
    public ProductDTO createProduct(ProductAdminForm form) {
        validateForm(form);

        String normalizedName = form.getName().trim();
        if (repo.existsByNameIgnoreCase(normalizedName)) {
            throw new IllegalArgumentException("A product with that name already exists");
        }

        CategoryEntity category = categoryRepo.findById(form.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        ProductEntity product = new ProductEntity();
        product.setName(normalizedName);
        product.setPrice(form.getPrice());
        product.setStock(form.getStock());
        product.setCategory(category);
        product.setImageUrl(resolveImageUrl(form.getImageUrl(), form.getImage(), null));

        return mapper.toDto(repo.save(product));
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductAdminForm form) {
        validateForm(form);

        ProductEntity product = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        String normalizedName = form.getName().trim();
        if (!product.getName().equalsIgnoreCase(normalizedName)
                && repo.existsByNameIgnoreCaseAndIdNot(normalizedName, id)) {
            throw new IllegalArgumentException("A product with that name already exists");
        }

        CategoryEntity category = categoryRepo.findById(form.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        product.setName(normalizedName);
        product.setPrice(form.getPrice());
        product.setStock(form.getStock());
        product.setCategory(category);
        product.setImageUrl(resolveImageUrl(form.getImageUrl(), form.getImage(), product.getImageUrl()));

        return mapper.toDto(repo.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        ProductEntity product = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        storageService.deleteIfManaged(product.getImageUrl());
        repo.delete(product);
    }

    private void validateForm(ProductAdminForm form) {
        if (form == null) {
            throw new IllegalArgumentException("Product data is required");
        }
        if (form.getName() == null || form.getName().isBlank()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (form.getPrice() == null || form.getPrice().signum() < 0) {
            throw new IllegalArgumentException("Price is invalid");
        }
        if (form.getStock() == null || form.getStock() < 0) {
            throw new IllegalArgumentException("Stock is invalid");
        }
        if (form.getCategoryId() == null) {
            throw new IllegalArgumentException("Category is required");
        }
    }

    private String resolveImageUrl(String requestedImageUrl, org.springframework.web.multipart.MultipartFile image,
            String currentImageUrl) {
        if (image != null && !image.isEmpty()) {
            storageService.deleteIfManaged(currentImageUrl);
            return storageService.storeProductImage(image);
        }

        if (requestedImageUrl != null && !requestedImageUrl.isBlank()) {
            String normalized = requestedImageUrl.trim();

            if (!normalized.equals(currentImageUrl)) {
                storageService.deleteIfManaged(currentImageUrl);
            }
            return normalized;
        }

        return currentImageUrl;
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
        if (dto.getPrice() == null || dto.getPrice() < 0) {
            throw new RuntimeException("Price is invalid");
        }
        if (dto.getStock() != null && dto.getStock() < 0) {
            throw new RuntimeException("Stock cannot be negative");
        }
    }
}
