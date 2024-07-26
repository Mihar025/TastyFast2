import {Component, OnInit} from '@angular/core';
import {RestaurantResponse} from "../../../../services/models/restaurant-response";
import {ActivatedRoute} from "@angular/router";
import {RestaurantControllerService} from "../../../../services/services/restaurant-controller.service";

@Component({
  selector: 'app-details',
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent implements OnInit{
  restaurant: RestaurantResponse | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantControllerService,
  ) {}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.loadRestaurantDetails(id);
    } else {
      this.error = 'Invalid restaurant ID';
    }
  }


  loadRestaurantDetails(id: string) {
    this.restaurantService.getRestaurantById({ restaurantId: id }).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
      error: (err) => {
        console.error('Error fetching restaurant details:', err);
        this.error = 'Failed to load restaurant details. Please try again later.';
      }
    });
  }



  }

