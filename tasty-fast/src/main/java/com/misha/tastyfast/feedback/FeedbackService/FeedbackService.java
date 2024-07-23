package com.misha.tastyfast.feedback.FeedbackService;

import com.misha.tastyfast.exception.OperationNotPermittedException;
import com.misha.tastyfast.feedback.FeedbackMapper.FeedbackMapper;
import com.misha.tastyfast.feedback.feedbackrepository.FeedbackRepository;
import com.misha.tastyfast.feedback.req.FeedBackRequest;
import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.model.Feedback;
import com.misha.tastyfast.model.Product;
import com.misha.tastyfast.model.User;
import com.misha.tastyfast.repositories.ProductRepository;
import com.misha.tastyfast.requests.pageResponse.PageResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private static final Logger log = LoggerFactory.getLogger(FeedbackService.class);
    private final ProductRepository productRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedBackRequest request, Authentication connectedUser) {
        Product product = productRepository.findById(request.businessId()).orElseThrow(
                () -> new EntityNotFoundException("No book with the ID::" + request.businessId())
        );
        if(!product.isInStock()){
            throw new OperationNotPermittedException("You cannot give a feedback for restaurant or store!   ");
        }
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(product.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("You cannot give a feedback to your own restaurant");
        }
        Feedback feedBack = feedbackMapper.toFeedback(request);
        return feedbackRepository.save(feedBack).getId();
    }

    public PageResponse<FeedBackResponse> findAllFeedBacksByProduct(Integer productId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByProductId(productId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedBackResponse(f, user.getId()))
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

    public PageResponse<FeedBackResponse> findAllFeedBacksByDishes(Integer dishesId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByDishesId(dishesId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedBackResponse(f, user.getId()))
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

    public PageResponse<FeedBackResponse> findAllFeedBacksByDrink(Integer drinkId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByDrinkId(drinkId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedBackResponse(f, user.getId()))
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

    public PageResponse<FeedBackResponse> findAllFeedBacksByRestaurant(Integer restaurantId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByRestaurantId(restaurantId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedBackResponse(f, user.getId()))
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

    public PageResponse<FeedBackResponse> findAllFeedBacksByStore(Integer storeId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByRestaurantId(storeId, pageable);
        List<FeedBackResponse> feedBackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedBackResponse(f, user.getId()))
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

    public void deleteFeedBackById(Integer feedBackId, Authentication connectedUser) throws Exception {
        User user = ((User)connectedUser.getPrincipal());
        try {
            feedbackRepository.deleteById(feedBackId);
        }
        catch (Exception e) {
            throw new Exception("Cannot delete feedback with id: " + feedBackId);
        }
    }






}
