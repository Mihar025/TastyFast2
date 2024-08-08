import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../../services/services/feedback.service';
import { PageResponseFeedBackResponse } from '../../../../services/models/page-response-feed-back-response';
import { FeedBackRequest } from '../../../../services/models/feed-back-request';
import { FeedBackResponse } from '../../../../services/models/feed-back-response';

@Component({
  selector: 'app-restaurant-feedbacks',
  templateUrl: './restaurant-feedbacks.component.html',
  styleUrls: ['./restaurant-feedbacks.component.scss']
})
export class RestaurantFeedbacksComponent implements OnInit {
  restaurantId: number;
  feedbacks: PageResponseFeedBackResponse | null = null;
  currentPage = 0;
  pageSize = 10;
  newFeedback: FeedBackRequest = {
    comment: '',
    note: 0,
    businessId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {
    this.restaurantId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
      this.loadFeedbacksForRestaurant();
    });
  }

  loadFeedbacksForRestaurant() {
    this.feedbackService.findAllFeedBacksByRestaurant({
      restaurantId: this.restaurantId,
      page: this.currentPage,
      size: this.pageSize
    }).subscribe({
      next: (response) => {
        this.feedbacks = response;
      },
      error: (error) => {
        console.error('Error loading feedbacks:', error);
      }
    });
  }

  submitFeedback() {
    this.newFeedback.businessId = this.restaurantId;

    this.feedbackService.saveFeedBackForRestaurant({
      restaurantId: this.restaurantId,
      body: this.newFeedback
    }).subscribe({
      next: (response: FeedBackResponse) => {
        console.log('Feedback submitted successfully', response);
        this.loadFeedbacksForRestaurant(); // Перезагрузка отзывов
        this.newFeedback = { comment: '', note: 0, businessId: 0 }; // Сброс формы
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
      }
    });
  }

  deleteFeedback(feedbackId: number) {
    if (feedbackId) {
      this.feedbackService.deleteFeedback({ feedbackId: feedbackId }).subscribe({
        next: () => {
          console.log('Feedback deleted successfully');
          this.loadFeedbacksForRestaurant();
        },
        error: (error) => {
          console.error('Error deleting feedback:', error);
          if (error.status === 403) {
            alert('You can only delete your own feedback');
          } else {
            alert('Error deleting feedback. Please try again.');
          }
        }
      });
    } else {
      console.error('Cannot delete feedback: feedbackId is undefined');
    }
  }
}
