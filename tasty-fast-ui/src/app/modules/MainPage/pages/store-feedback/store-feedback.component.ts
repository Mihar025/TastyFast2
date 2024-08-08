import { Component } from '@angular/core';
import {PageResponseFeedBackResponse} from "../../../../services/models/page-response-feed-back-response";
import {FeedBackRequest} from "../../../../services/models/feed-back-request";
import {ActivatedRoute} from "@angular/router";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {FeedBackResponse} from "../../../../services/models/feed-back-response";

@Component({
  selector: 'app-store-feedback',
  templateUrl: './store-feedback.component.html',
  styleUrl: './store-feedback.component.scss'
})
export class StoreFeedbackComponent {

  storeId: number;
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
    this.storeId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storeId = +params['id'];
      this.loadFeedbacksForStore();
    });
  }



  loadFeedbacksForStore() {
    this.feedbackService.findAllFeedBacksByStore({
      storeId: this.storeId,
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


  submitFeedbackForStore() {
    this.newFeedback.businessId = this.storeId;

    this.feedbackService.saveFeedBackForStore({
      storeId: this.storeId,
      body: this.newFeedback
    }).subscribe({
      next: (response: FeedBackResponse) => {
        console.log('Feedback submitted successfully', response);
        this.loadFeedbacksForStore();
        this.newFeedback = { comment: '', note: 0, businessId: 0 };
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
      }
    });
  }

  deleteFeedback(feedbackId: number) {
    this.feedbackService.deleteFeedback({ feedbackId: feedbackId }).subscribe({
      next: () => {
        console.log('Feedback deleted successfully');
        this.loadFeedbacksForStore();
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
  }


}

