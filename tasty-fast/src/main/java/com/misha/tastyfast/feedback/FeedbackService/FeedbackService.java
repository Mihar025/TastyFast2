package com.misha.tastyfast.feedback.FeedbackService;

import com.misha.tastyfast.exception.OperationNotPermittedException;
import com.misha.tastyfast.feedback.FeedbackMapper.FeedbackMapper;
import com.misha.tastyfast.feedback.feedbackrepository.FeedbackRepository;
import com.misha.tastyfast.feedback.req.FeedBackRequest;
import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.model.*;
import com.misha.tastyfast.repositories.ProductRepository;
import com.misha.tastyfast.repositories.RestaurantRepository;
import com.misha.tastyfast.repositories.StoreRepository;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import com.misha.tastyfast.services.RestaurantService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.core.utils.PropertyResolverUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor

public class FeedbackService {
    private static final Logger log = LoggerFactory.getLogger(FeedbackService.class);
    private final ProductRepository productRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;
    private final RestaurantRepository restaurantRepository;
    private final StoreRepository storeRepository;


    public FeedBackResponse saveFeedbackForRestaurant(FeedBackRequest feedBackRequest, Integer restaurantId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("No Restaurant with the ID::" + feedBackRequest.businessId()));

        Feedback feedback = feedbackMapper.toFeedback(feedBackRequest);
        feedback.setRestaurant(restaurant);
        feedback.setUser(user);
        feedback.setCreatedBy(user.getId());
        feedback.setCreatedDate(LocalDateTime.now());
        feedback.setLastModifiedDate(LocalDateTime.now());
        feedback.setCreatedBy(user.getId());
        Feedback savedFeedback = feedbackRepository.save( feedback);
         return feedbackMapper.toFeedBackRestaurantResponse(savedFeedback, user.getId());
    }

    public FeedBackResponse saveFeedbackForStore(FeedBackRequest feedBackRequest, Integer storeId,  Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("No Store with the ID::" + feedBackRequest.businessId()));
        Feedback feedback = feedbackMapper.toFeedback(feedBackRequest);
        feedback.setStore(store);
        feedback.setUser(user);
        feedback.setCreatedBy(user.getId());
        feedback.setCreatedDate(LocalDateTime.now());
        feedback.setLastModifiedDate(LocalDateTime.now());
        feedback.setCreatedBy(user.getId());
        Feedback savedFeedback = feedbackRepository.save( feedback);
        return feedbackMapper.toFeedBackStoreResponse(savedFeedback, user.getId());
    }

    public PageResponse<FeedBackResponse> findAllRestaurantFeedbacks(Integer restaurantId, int page, int size, Authentication connectedUser){
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllFeedbacksByRestaurantId(restaurantId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(m -> feedbackMapper.toFeedBackRestaurantResponse(m, user.getId()))
                .toList();

        return new PageResponse<>(
                feedBackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }

    public PageResponse<FeedBackResponse> findAllStoreFeedbacks(Integer storeId, int page, int size, Authentication connectedUser){
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllFeedbacksByStoreId(storeId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(m -> feedbackMapper.toFeedBackStoreResponse(m, user.getId()))
                .toList();

        return new PageResponse<>(
                feedBackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }




    public void deleteFeedBackById(Integer feedbackId, Authentication connectedUser) {
        User user = ((User)connectedUser.getPrincipal());
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new EntityNotFoundException("No Feedback with the ID::" + feedbackId));

        if (!feedback.getUser().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("You can only delete your own feedback");
        }
        feedbackRepository.deleteById(feedbackId);
    }






}
