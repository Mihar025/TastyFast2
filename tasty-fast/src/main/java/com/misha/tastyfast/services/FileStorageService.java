package com.misha.tastyfast.services;

import com.misha.tastyfast.model.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;
import static java.lang.System.currentTimeMillis;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {
    @Value("${application.file.uploads.photos-output-path}")
    private String fileUploadsPath;

    public String saveProductFile(
            @NonNull MultipartFile sourceFile,
            @NonNull Product product,
            @NonNull Integer id
    ) {
        final String fileUploadSubPath = "product" + separator + product.getId();
        return uploadFile(sourceFile, fileUploadsPath + separator + fileUploadSubPath);
    }

    public String saveDishesFile(
            @NonNull MultipartFile sourceFile,
            @NonNull Dishes dishes,
            @NonNull Integer id
    ) {
        final String fileUploadSubPath = "dishes" + separator + dishes.getId();
        return uploadFile(sourceFile, fileUploadsPath + separator + fileUploadSubPath);
    }

    public String saveDrinkFile(
            @NonNull MultipartFile sourceFile,
            @NonNull Drink drink,
            @NonNull Integer id
    ) {
        final String fileUploadSubPath = "drink" + separator + drink.getId();
        return uploadFile(sourceFile, fileUploadsPath + separator + fileUploadSubPath);
    }

    public String saveRestaurantFile(
            @NonNull MultipartFile sourceFile,
            @NonNull Restaurant restaurant,
            @NonNull Integer id
    ) {
        final String fileUploadSubPath = "restaurant" + separator + restaurant.getId();
        return uploadFile(sourceFile, fileUploadsPath + separator + fileUploadSubPath);
    }

    public String saveStoreFile(
            @NonNull MultipartFile sourceFile,
            @NonNull Store store,
            @NonNull Integer id
    ) {
        final String fileUploadSubPath = "store" + separator + store.getId();
        return uploadFile(sourceFile, fileUploadsPath + separator + fileUploadSubPath);
    }

    private String uploadFile(@NonNull MultipartFile sourceFile,
                              @NonNull String fileUploadPath) {
        File targetFolder = new File(fileUploadPath);
        if(!targetFolder.exists()){
            boolean folderCreated = targetFolder.mkdirs();
            if(!folderCreated){
                log.warn("Failed to create the target folder: {}", fileUploadPath);
                return null;
            }
        }

        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        String fileName = currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(fileUploadPath, fileName);

        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to {}", targetPath);
            return targetPath.toString();
        } catch (IOException e) {
            log.error("File wasn't saved", e);
            return null;
        }
    }

    private String getFileExtension(String filename) {
        if(filename == null || filename.isEmpty()){
            return  "";
        }

        int lastDotIndex = filename.lastIndexOf(".");
        if(lastDotIndex == -1){
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }
}