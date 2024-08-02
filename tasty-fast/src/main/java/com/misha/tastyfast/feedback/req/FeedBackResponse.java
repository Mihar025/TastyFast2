package com.misha.tastyfast.feedback.req;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedBackResponse {
    private Integer id;
    private Integer businessId;
    private Double note;
    private String comment;
    private boolean ownFeedback;




}
