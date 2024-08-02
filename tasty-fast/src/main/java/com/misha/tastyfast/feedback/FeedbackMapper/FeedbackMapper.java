package com.misha.tastyfast.feedback.FeedbackMapper;

import com.misha.tastyfast.feedback.req.FeedBackRequest;
import com.misha.tastyfast.feedback.req.FeedBackResponse;
import com.misha.tastyfast.model.Feedback;
import com.misha.tastyfast.model.Product;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class FeedbackMapper {

    public Feedback toFeedback(FeedBackRequest request) {
        return Feedback.builder()
                .note(request.note())
                .comment(request.comment())
                .build();
    }

    public FeedBackResponse toFeedBackRestaurantResponse(Feedback feedback, Integer userId) {
        return FeedBackResponse.builder()
                .id(feedback.getId())
                .businessId(feedback.getRestaurant().getId())
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), userId))
                .build();
    }

    public FeedBackResponse toFeedBackStoreResponse(Feedback feedback, Integer userId) {
        return FeedBackResponse.builder()
                .id(feedback.getId())
                .businessId(feedback.getStore().getId())
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), userId))
                .build();
    }
}