package com.misha.tastyfast.services;

import com.misha.tastyfast.exception.InternalServerErrorException;
import com.misha.tastyfast.mapping.DrinkMapper;
import com.misha.tastyfast.mapping.ProductMapper;
import com.misha.tastyfast.mapping.StoreMapper;
import com.misha.tastyfast.model.Drink;
import com.misha.tastyfast.model.Product;
import com.misha.tastyfast.model.Store;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.DrinkRepository;
import com.misha.tastyfast.repositories.ProductRepository;
import com.misha.tastyfast.repositories.StoreRepository;
import com.misha.tastyfast.repositories.UserRepository;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequest;
import com.misha.tastyfast.requests.drinkRequests.DrinkRequestForStore;
import com.misha.tastyfast.requests.drinkRequests.DrinksResponse;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.requests.productRequests.ProductRequest;
import com.misha.tastyfast.requests.productRequests.ProductResponse;
import com.misha.tastyfast.requests.storeRequests.StoreRequest;
import com.misha.tastyfast.requests.storeRequests.StoreResponse;
import com.misha.tastyfast.transactionHistory.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {

    //Create new store
    //Find restaurant by restaurantId;
    // Update restaurant
    // delete restaurant
    // create new dish inside this restaurant
    // create new drink inside this restaurant
    // find all dishes inside restaurant
    // find all drinks inside restaurant
    // everything have to be authenticated
    // change dish photo
    // change drink photo

    private final StoreRepository storeRepository;
    private final StoreTransactionHistoryRepository storeTransactionHistoryRepository;
    private final StoreMapper storeMapper;
    private final ProductRepository productRepository;
    private final DrinkRepository drinkRepository;
    private final ProductMapper productMapper;
    private final DrinkMapper drinkMapper;
    private final DrinksTransactionHistoryRepository drinksTransactionHistoryRepository;
    private final ProductTransactionHistoryRepository productTransactionHistoryRepository;
    private final UserRepository userRepository;

    @PreAuthorize("hasRole('BUSINESS_OWNER')") //updated
    public Store createNewStore(StoreRequest request, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Store store = storeMapper.toStore(request, user);
        store.setOwner(user);
        store.setActive(true);
        Store savedStore = storeRepository.save(store);
        StoreTransactionHistory storeTransactionHistory = StoreTransactionHistory
                .builder()
                .store(savedStore)
                .user(user)
                .transactionType("CREATED")
                .transactionDate(LocalDateTime.now())
                .details("RestaurantController was successfully created!")
                .build();
        storeTransactionHistoryRepository.save(storeTransactionHistory);
        return savedStore;
    }
    @Cacheable(value = "store_byId", key ="#storeId + '_' + #connectedUser")
    public StoreResponse findStoreById (Integer storeId, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Store with provided ID::" + storeId + " wasn't founded"));
        boolean isOwner = store.getOwner().getId().equals(user.getId());
        boolean isBusinessOwner = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("BUSINESS_OWNER"));
        if(isOwner || isBusinessOwner){
            return storeMapper.toStoreResponse(store);
        }
        else {
            return storeMapper.toPublicStoreResponse(store);
        }

    }
    @Cacheable(value = "store_allProducts" , key = "#storeId")
    public PageResponse<ProductResponse> findAllProductInStore(int page, int size, Integer storeId) {
        log.info("Fetching products for stores with ID: {}", storeId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Product> products = productRepository.findAllProductsInStore(pageable, storeId);

        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());

        log.info("Found {} dishes for restaurant with ID: {}", productResponses.size(), storeId);

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

    @Cacheable(value = "store_allDrinks", key = "#storeId")
    public PageResponse<DrinksResponse> findAllDrinksInStore(int page, int size, Integer storeId) {
        log.info("Fetching drinks for store with ID: {}", storeId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Drink> drinks = drinkRepository.findAllDrinksInStore(pageable, storeId);
        List<DrinksResponse> responses = drinks.getContent().stream()
                .map(drinkMapper::toDrinkResponse)
                .collect(Collectors.toList());
        log.info("Found {} drinks for store with ID: {}", responses.size(), storeId);
        return new PageResponse<>(
                responses,
                drinks.getNumber(),
                drinks.getSize(),
                drinks.getTotalElements(),
                drinks.getTotalPages(),
                drinks.isFirst(),
                drinks.isLast()
        );
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "store_drink_byId", key = "#drinkId + '_' + #storeId")
    public DrinksResponse findDrinkByIdInStore(Integer drinkId, Integer storeId) {

        Drink drink = drinkRepository.findByIdAndStoreId(drinkId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find drink with restaurantId: " + drinkId));
        return drinkMapper.toDrinkResponse(drink);

    }

    @Transactional(readOnly = true)
    @Cacheable(value = "store_product_byId", key = "#productId + '_' + #storeId")
    public ProductResponse findProductByIdInStore(Integer productId, Integer storeId) {

        Product product = productRepository.findByIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find dish with provided restaurantId: " + productId));
        return productMapper.toProductResponse(product);
    }

    @Cacheable(value = "store_allStores")
    public PageResponse<StoreResponse> findAllStores(int page, int size, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        var owId = user.getId();
        System.out.println("Owner restaurantId: " + owId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page <Store> store = storeRepository.findAllDisplayedStores(pageable, user.getId());
        List<StoreResponse> storeResponses = store.map(storeMapper::toStoreResponse).stream().toList();
        System.out.println("Stores had been received: " + storeResponses.size());
        return new PageResponse<>(
                storeResponses,
                store.getNumber(),
                store.getSize(),
                store.getTotalElements(),
                store.getTotalPages(),
                store.isFirst(),
                store.isLast()
        );
    }

    @Cacheable(value = "store_allStoresWithoutDelivery")
    public PageResponse<StoreResponse> findAllStoresWithoutDelivery(int page, int size, Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        var Id = user.getId();
        System.out.println("User is here:" +Id);

        Pageable pageable = PageRequest.of(page, size , Sort.by("createdDate").descending());
        Page<Store> stores = storeRepository.findAllDisplayedStoresWithoutDelivery(pageable, user.getId());
        List<StoreResponse> responses = stores.map(storeMapper::toStoreResponse).stream().toList();
        System.out.println("Stores without delivery had been received" + responses.size());

        return new PageResponse<>(
                responses,
                stores.getNumber(),
                stores.getSize(),
                stores.getTotalElements(),
                stores.getTotalPages(),
                stores.isFirst(),
                stores.isLast()
        );
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "store_update", key = "#storeId")
    public Store updateStore(Integer storeId, StoreRequest updateRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Store existingStore = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with provided restaurantId: " + storeId));

        if (!existingStore.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("You don't have permission to update this store");
        }
        existingStore.setName(updateRequest.getStoreName());
        existingStore.setAddress(updateRequest.getAddress());
        existingStore.setPhoneNumber(updateRequest.getPhoneNumber());
        existingStore.setEmail(updateRequest.getEmail());
        existingStore.setDescription(updateRequest.getDescription());
        existingStore.setOpeningHours(updateRequest.getOpeningHours());
        existingStore.setDeliveryAvailable(updateRequest.isDeliveryAvailable());
        existingStore.setWebsiteUrl(updateRequest.getWebsiteUrl());
        existingStore.setLogoUrl(updateRequest.getLogoUrl());

        Store updatedStore = storeRepository.save(existingStore);
        StoreTransactionHistory transactionHistory = StoreTransactionHistory.builder()
                .store(updatedStore)
                .user(user)
                .transactionType("UPDATE")
                .transactionDate(LocalDateTime.now())
                .details("RestaurantController updated")
                .build();
        storeTransactionHistoryRepository.save(transactionHistory);
        return existingStore;
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    public void deleteStore(Integer id,  Authentication connectedUser){
        User user = ((User) connectedUser.getPrincipal());
        Store existedStore = storeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with provided restaurantId:" + id))     ;
        if(!existedStore.getOwner().getId().equals(user.getId())){
            throw new AccessDeniedException("You don't have permission to update this restaurant");
        }

        StoreTransactionHistory transactionHistory = StoreTransactionHistory
                .builder()
                .store(existedStore)
                .user(user)
                .transactionType("DELETE")
                .transactionDate(LocalDateTime.now())
                .details("RestaurantController deleting")
                .build();
        storeRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
   // @CachePut(value = "store_allProducts", key = "#storeId")
   @Transactional
   public ProductResponse addProductToStore(Integer storeId, ProductRequest request, Authentication authentication) {
       User user = (User) authentication.getPrincipal();

       Store existedStore = storeRepository.findById(storeId)
               .orElseThrow(() -> new EntityNotFoundException("Cannot find store with provided restaurantId:" + storeId));

       if (!existedStore.getOwner().getId().equals(user.getId())) {
           throw new AccessDeniedException("You don't have permission to add product to this store");
       }
       try {
           Product product = createProductFromRequest(request, existedStore, user);
           Product savedProduct = productRepository.save(product);
           return productMapper.toProductResponse(savedProduct);
       }
       catch (EntityNotFoundException e){
           throw new EntityNotFoundException("Cannot create new product: "+ e.getMessage());
       }
       }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @CachePut(value = "store_allDrinks", key = "#storeId")
    public DrinksResponse addDrinkToTheStore(Integer storeId, DrinkRequestForStore request, Authentication authentication){
        User user = ((User) authentication.getPrincipal());
        Store existedStore = storeRepository.findById(storeId)
                .orElseThrow(() -> new
                        EntityNotFoundException(
                        "Cannot find store with provided restaurantId:" + storeId));
        if(!existedStore.getOwner().getId().equals(user.getId())){
            throw new AccessDeniedException("You don't have permission to add this drink in the store");
        }

        try{
            Drink drink = createDrinkFromRequest(request, existedStore, user);
            Drink savedDrink = drinkRepository.save(drink);
            return drinkMapper.toDrinkResponse(savedDrink);
        }
        catch (EntityNotFoundException e){
            throw new EntityNotFoundException("Cannot create new drink: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    @CachePut(value = "store_drinks_update", key = "#storeId + '_' + #drinkId")
    public DrinksResponse updateDrinkInStore(Integer storeId, Integer drinkId, DrinkRequest request, Authentication connectedUser) throws BadRequestException, InternalServerErrorException {
        User user = ((User) connectedUser.getPrincipal());
        Store existedStore = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find Store with provided ID:" + storeId));

        if(!existedStore.getOwner().getId().equals(user.getId())){
            log.warn("User {} does not have permission to update drinks in store {}", user.getId(), storeId);
            throw new AccessDeniedException("You dont have permission to update this drink in the restaurant");
        }

        Drink existedDrink = drinkRepository.findByIdAndStoreId(drinkId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find drink in store with provided restaurantId::" + drinkId));


        try{
            updatedDrinkProperties(existedDrink, request);
            Drink updatedDrink = drinkRepository.save(existedDrink);
            createTransactionHistory(updatedDrink, existedStore, user);
            log.warn("Drink with restaurantId {} in store {} successfully updated", drinkId, storeId);
            return drinkMapper.toDrinkResponse(updatedDrink);
        }
        catch (IllegalArgumentException e){
            log.error("Invalid data provided for drink update: {}", e.getMessage());
            throw new BadRequestException("Invalid data provided for drink update: " + e.getMessage());
        }
        catch (Exception e) {
            log.error("An error occurred while updating the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }

    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @CachePut(value = "store_product_update", key = "#storeId + '_' + #productId")
    public ProductResponse updateProductForStore(Integer storeId, Integer productId, ProductRequest request, Authentication connectedUser) throws BadRequestException, InternalServerErrorException {
        User user = ((User) connectedUser.getPrincipal());
        Store existedStore = storeRepository.findById(storeId)
                .orElseThrow(() ->new EntityNotFoundException("Cannot find store with provided restaurantId: " + storeId));

        if(!existedStore.getOwner().getId().equals(user.getId())){
            log.warn("User {} does not have permission to update product in store {}", user.getId(), storeId);
            throw new AccessDeniedException("You don't have permission to update this product in the store");
        }
        Product product = productRepository.findByIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find product with provided restaurantId: " + productId + " in store with restaurantId: "+ storeId));

        try{
            updateProductInStore(product, request);
            Product updatedProduct = productRepository.save(product);
            createTransactionHistoryForProduct(updatedProduct, existedStore, user);
            log.info("Product with restaurantId {} in restaurant {} successfully updated", productId, storeId);
            return productMapper.toProductResponse(updatedProduct);
        }
        catch (IllegalArgumentException e) {
            log.error("Invalid data provided for dish update: {}", e.getMessage());
            throw new BadRequestException("Invalid data provided for dish update: " + e.getMessage());
        }  catch (Exception e) {
            log.error("An error occurred while updating the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }

    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
    //@CacheEvict(value = "store_deleteDrink", key = "#drinkId + '_' + #storeId")
    public void deleteDrinkInsideStore(Integer drinkId, Integer storeId, Authentication ConnectedUser) throws InternalServerErrorException {
        User user = ((User) ConnectedUser.getPrincipal());
        Store store = storeRepository.findById(storeId).orElseThrow();
        if(!store.getOwner().getId().equals(user.getId())){
            log.warn("User {} does not have permission to delete drink in store {}", user.getId(), storeId);
            throw new AccessDeniedException("You don't have permission to delete this dish in the restaurant");
        }

        Drink drink = drinkRepository.findByIdAndStoreId(drinkId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find drink with provided restaurantId: " + storeId));

        try{
            deleteDrinkTransactionHistory(drink, store, user);
            drink.getHistories().clear();
            drink.getFeedbacks().clear();
           drinkRepository.delete(drink);
           log.info("Drink with restaurantId {} had been successfully deleted from store {}", drinkId, storeId);
        }catch (Exception e){
            log.error("An error occurred while deleting the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Transactional
   // @CacheEvict(value = "store_deleteProduct", key = "#productId + '_' + #storeId")
    public void deleteProductInsideStore(Integer productId, Integer storeId, Authentication ConnectedUser) throws InternalServerErrorException {
        User user = ((User) ConnectedUser.getPrincipal());
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with provided restaurantId: " + storeId));

        if(!store.getOwner().getId().equals(user.getId())){
            log.warn("User {} does not have permission to delete product in store {}", user.getId(), storeId);
            throw new AccessDeniedException("You don't have permission to delete this product in the store");
        }

        Product product = productRepository.findByIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find product with provided restaurantId: " + storeId));

        try{
            deleteProductTransactionalHistory(product, store, user);
            product.getHistories().clear();
            product.getFeedbacks().clear();
            productRepository.delete(product);
            log.info("Drink with restaurantId {} had been successfully deleted from store {}", productId, storeId);
        }catch (Exception e){
            log.error("An error occurred while deleting the drink: {}", e.getMessage(), e);
            throw new InternalServerErrorException("An error occurred while updating the drink: " + e.getMessage());
        }
    }

    private void deleteProductTransactionalHistory(Product product, Store store, User user) {
        ProductTransactionHistory productTransactionHistory =
                ProductTransactionHistory.builder()
                        .product(product)
                        .store(store)
                        .user(user)
                        .transactionType("DELETE")
                        .transactionDate(LocalDateTime.now())
                        .details("Delete product")
                        .build();
        productTransactionHistoryRepository.delete(productTransactionHistory);
    }


    private void updatedDrinkProperties(Drink existedDrink, DrinkRequest request) {
        existedDrink.setDrinksName(request.drinkName());
        existedDrink.setDrinksDescription(request.drinkDescription());
        existedDrink.setPrice(request.price());
        existedDrink.setCalories(request.calories());
       // existedDrink.setCategory(request.d());
        existedDrink.setInStock(request.inStock());
        existedDrink.setAlcohol(request.isAlcohol());
    }

    private void updateProductInStore(Product product, ProductRequest request) {
      //  product.setLastModifiedBy(request.п());
        product.setProductName(request.productName());
        product.setProductDescription(request.productDescription());
        product.setPrice(request.price());
        product.setCalories(request.calories());
        product.setInStock(request.inStock());
    }

    private void createTransactionHistoryForProduct(Product product, Store store, User user) {
      ProductTransactionHistory productTransactionHistory =
              ProductTransactionHistory.builder()
                      .product(product)
                      .store(store)
                      .user(user)
                      .transactionType("UPDATE")
                      .transactionDate(LocalDateTime.now())
                      .details("Updating product")
                      .build();
      productTransactionHistoryRepository.save(productTransactionHistory);
    }

    private void createTransactionHistory(Drink updatedDrink, Store existedStore, User user) {
        DrinksTransactionHistory transactionHistory = DrinksTransactionHistory.builder()
                .drink(updatedDrink)
                .store(existedStore)
                .user(user)
                .transactionType("UPDATE")
                .transactionDate(LocalDateTime.now())
                .details("Updating drink")
                .alreadyOrdered(false)
                .returned(false)
                .build();
        drinksTransactionHistoryRepository.save(transactionHistory);
    }

    private void deleteDrinkTransactionHistory(Drink drink, Store store, User user) {
        DrinksTransactionHistory transactionHistory = DrinksTransactionHistory.builder()
                .drink(drink)
                .store(store)
                .user(user)
                .transactionType("DELETE")
                .transactionDate(LocalDateTime.now())
                .details("Delete drink")
                .build();
        drinksTransactionHistoryRepository.delete(transactionHistory);
    }
    private Product createProductFromRequest(ProductRequest request, Store store, User owner) {
        Product product = new Product();
        updateProductFromRequest(product, request);
        product.setStore(store);
        product.setOwner(owner);
        return product;
    }

    private void updateProductFromRequest(Product product, ProductRequest request) {
        product.setProductName(request.productName());
        product.setProductDescription(request.productDescription());
        product.setPrice(request.price());
        product.setCalories(request.calories());
        product.setInStock(request.inStock());
    }

    private Drink createDrinkFromRequest(DrinkRequestForStore request, Store store, User user){
        Drink drink = new Drink();
        updateDrinkFromRequest(drink, request);
        drink.setStore(store);
        drink.setOwner(user);
        return drink;
    }

    private void updateDrinkFromRequest(Drink drink, DrinkRequestForStore request) {
        drink.setDrinksName(request.drinkName());
        drink.setDrinksDescription(request.drinkDescription());
        drink.setPrice(request.price());
        drink.setCalories(request.calories());
        drink.setCategory(request.drinkCategory());
        drink.setInStock(request.inStock());
        drink.setAlcohol(request.isAlcohol());
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse findAllStoresInformation(Integer storeId, Authentication connectedUser){
        User currentUser = ((User) connectedUser.getPrincipal());
        if(!currentUser.getId().equals(storeId)){
            throw new AccessDeniedException("You dont have an access ti change restaurant information!");
        }
        var existedStore = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Store not found"));
        return storeMapper.toStoreResponse(existedStore);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeStoreName(Integer storeId, String storeName){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(storeName != null && storeName.isEmpty()){
            store.setName(storeName);
        }
        return storeMapper.toStoreResponse(store);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeAddress(Integer storeId, String address){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(address != null && address.isEmpty()){
            store.setAddress(address);
        }
        return storeMapper.toStoreResponse(store);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changePhoneNumber(Integer storeId, String phoneNumber){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(phoneNumber != null && phoneNumber.isEmpty()){
            store.setPhoneNumber(phoneNumber);
        }
        return storeMapper.toStoreResponse(store);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeEmail(Integer storeId, String email){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(email != null && email.isEmpty()){
            store.setEmail(email);
        }
        return storeMapper.toStoreResponse(store);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeDescription(Integer storeId, String description){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(description != null && description.isEmpty()){
            store.setDescription(description);
        }
        return storeMapper.toStoreResponse(store);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeOpeningHours(Integer storeId, String openingHours){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(openingHours != null && openingHours.isEmpty()){
            store.setOpeningHours(openingHours);
        }
        return storeMapper.toStoreResponse(store);
    }
    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeWebSiteUrl(Integer storeId, String websiteUrl){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        if(websiteUrl != null && websiteUrl.isEmpty()){
            store.setWebsiteUrl(websiteUrl);
        }
        return storeMapper.toStoreResponse(store);
    }

    @PreAuthorize("hasRole('BUSINESS_OWNER')")
    @Cacheable(value = "restaurants", key = "#storeId")
    public StoreResponse changeDeliveryAvailable(Integer storeId, boolean deliveryAvailable){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find store with id: " + storeId));
        store.setDeliveryAvailable(deliveryAvailable);
        return storeMapper.toStoreResponse(store);
    }



}
