package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.model.Product;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.ProductRepository;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.productRequests.ProductRequest;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import com.misha.tastyfast.services.ProductService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;
    @PostMapping(value = "/product-logo/{productId}", consumes = {"image/webp", "multipart/form-data"})
    public ResponseEntity<?> uploadProductLogo(
            @PathVariable("productId") Integer productId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication authentication
    ){
        productService.uploadStoreLogo(file,authentication, productId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/logo/{productId}")
    public ResponseEntity<Resource> getProductLogo(@PathVariable Integer productId, Authentication authentication) throws IOException {
        User user = ((User) authentication.getPrincipal());

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        String logoPath = product.getLogo();

        if (logoPath == null || logoPath.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Удаляем начальный './' из пути, если он есть
        if (logoPath.startsWith("./")) {
            logoPath = logoPath.substring(2);
        }

        Resource resource = new ClassPathResource(logoPath);
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }










    @PostMapping
    public ResponseEntity<Integer> createProduct(@RequestBody ProductRequest productRequest, Authentication authentication) {
        Integer productId = productService.save(productRequest, authentication);
        return ResponseEntity.ok(productId);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer productId, Authentication authentication) {
        ProductResponse productResponse = productService.findProductById(productId, authentication);
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<ProductResponse> response = productService.findAllProducts(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-products")
    public ResponseEntity<PageResponse<ProductResponse>> getMyProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        PageResponse<ProductResponse> response = productService.findAllProductsByOwner(page, size, authentication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}/cover")
    public ResponseEntity<Void> uploadProductCover(
            @PathVariable Integer productId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        productService.uploadProductCoverPicture(file, authentication, productId);
        return ResponseEntity.ok().build();
    }
}