package com.misha.tastyfast.Controllers;

import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.productRequests.ProductRequest;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import com.misha.tastyfast.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

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