package com.project.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.project.service.StorageService;

@Service
public class FileSystemStorageService implements StorageService {

    private static final String PUBLIC_PREFIX = "/uploads/products/";
    private final Path productsDir;

    public FileSystemStorageService(@Value("${app.upload.root:uploads}") String uploadRoot) {
        try {
            this.productsDir = Path.of(uploadRoot, "products").toAbsolutePath().normalize();
            Files.createDirectories(this.productsDir);
        } catch (IOException ex) {
            throw new RuntimeException("Could not initialize storage directory", ex);
        }
    }

    @Override
    public String storeProductImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID() + (StringUtils.hasText(ext) ? "." + ext.toLowerCase() : "");

        Path target = productsDir.resolve(fileName).normalize();
        if (!target.startsWith(productsDir)) {
            throw new IllegalArgumentException("Invalid file path");
        }

        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return PUBLIC_PREFIX + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file", ex);
        }
    }

    @Override
    public void deleteIfManaged(String publicPath) {
        if (!StringUtils.hasText(publicPath) || !publicPath.startsWith(PUBLIC_PREFIX)) {
            return;
        }

        String fileName = publicPath.substring(PUBLIC_PREFIX.length());
        Path target = productsDir.resolve(fileName).normalize();

        if (!target.startsWith(productsDir)) {
            return;
        }

        try {
            Files.deleteIfExists(target);
        } catch (IOException ex) {
            throw new RuntimeException("Could not delete file", ex);
        }
    }
}
