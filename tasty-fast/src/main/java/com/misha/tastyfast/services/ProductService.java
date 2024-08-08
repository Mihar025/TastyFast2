package com.misha.tastyfast.services;

import com.misha.tastyfast.comon.ProductSpecification;
import com.misha.tastyfast.mapping.ProductMapper;
import com.misha.tastyfast.model.Product;
import com.misha.tastyfast.model.Restaurant;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.ProductRepository;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.productRequests.ProductRequest;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import com.misha.tastyfast.transactionHistory.ProductTransactionHistoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;



@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductTransactionHistoryRepository productTransactionHistoryRepository;
    private final ProductMapper productMapper;
    private final FileStorageService fileStorageService;


    public Integer save(ProductRequest request, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Product product = productMapper.toProduct(request);
        product.setOwner(user);
        return productRepository.save(product).getId();
    }

    public ProductResponse findProductById(Integer productId, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        return productRepository.findById(productId)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new EntityNotFoundException("No product founded with restaurantId: " + productId));
    }

    public PageResponse<ProductResponse> findAllProducts (int page, int size, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Integer userId = user.getId();
        System.out.println("Current user is : " + userId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Product> products= productRepository.findAllDisplayableProducts(pageable, user.getId());
        List<ProductResponse> productResponses = products.map(productMapper::toProductResponse)
                .toList();
        System.out.println("Product retrieved: " + productResponses.size());
        productResponses.forEach(product -> System.out.println("Product description: " + product.getProductDescription() + "Id" + product.getId()));
        return new PageResponse<>(
                productResponses,
                products.getNumber(),
                products.getSize(),
                products.getTotalElements(),
                products.getTotalPages(),
                products.isFirst(),
                products.isLast()
        );
    }

    public PageResponse <ProductResponse>findAllProductsByOwner(int page, int size, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Product> products = productRepository.findAll(ProductSpecification.withOwnerId(user.getId()), pageable);
        List<ProductResponse> productResponses = products.stream().map(productMapper::toProductResponse)
                .toList();
        return new PageResponse<>();
    }


    public void uploadProductCoverPicture(MultipartFile file, Authentication connectedUser, Integer productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("No product with ID:: " + productId ));

        User user = ((User)  connectedUser.getPrincipal());
        var productCover = fileStorageService.saveProductFile(file, product, user.getId());
        product.setProductCover(productCover);
        productRepository.save(product);

    }

    public void uploadStoreLogo(MultipartFile file, Authentication authentication, Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find product with provided id: " + productId));
        User user = ((User) authentication.getPrincipal());

        if (!product.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("You don't have permission to upload logo for this product");
        }

        String logoPath = fileStorageService.saveProductFile(file, product, user.getId());
        if (logoPath == null) {
            throw new RuntimeException("Failed to save restaurant logo");
        }if (logoPath.startsWith("./")) {
            logoPath = logoPath.substring(2);
        }
        product.setLogo(logoPath);
        productRepository.save(product);
    }


}
