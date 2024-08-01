import { Component, OnInit } from '@angular/core';
import { OrderControllerService } from '../../../../services/services/order-controller.service';
import { PageResponseOrderResponse } from '../../../../services/models/page-response-order-response';
import { AuthenticationService } from "../../../../services/services/authentication.service";
import { CancelOrder$Params } from "../../../../services/fn/order-controller/cancel-order";
import { OrderResponse } from "../../../../services/models/order-response";
import {DeleteOrder$Params} from "../../../../services/fn/order-controller/delete-order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: PageResponseOrderResponse | null = null;
  currentPage = 0;
  pageSize = 10;
  userId: number;

  constructor(
    private orderService: OrderControllerService,
    private authService: AuthenticationService
  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : 0;
    if (this.userId === 0) {
      console.error('User ID not found in localStorage');
      // Здесь можно добавить логику для перенаправления на страницу входа
    }
  }

  ngOnInit() {
    if (this.userId !== 0) {
      this.loadOrders();
    }
  }

  loadOrders() {
    this.orderService.getUserOrders({
      userId: this.userId,
      page: this.currentPage,
      size: this.pageSize
    }).subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  cancelOrder(orderId: number) {
    const params: CancelOrder$Params = { orderId };
    this.orderService.cancelOrder(params).subscribe({
      next: (response: OrderResponse) => {
        console.log('Order cancelled successfully', response);
        this.removeOrderFromList(orderId);
      },
      error: (error) => {
        console.error('Error cancelling order:', error);
      }
    });
  }

  removeOrderFromList(orderId: number) {
    if (this.orders && this.orders.content) {
      const index = this.orders.content.findIndex(order => order.id === orderId);
      if (index !== -1) {
        this.orders.content.splice(index, 1);
        // Обновляем общее количество элементов
        if (this.orders.totalElement) {
          this.orders.totalElement -= 1;
        }
        // Если страница стала пустой, и это не первая страница, загружаем предыдущую
        if (this.orders.content.length === 0 && this.currentPage > 0) {
          this.currentPage--;
          this.loadOrders();
        }
      }
    }
  }

  deleteOrder(orderId: number) {
    const params: DeleteOrder$Params = { orderId };
    this.orderService.deleteOrder(params).subscribe({
      next: () => {
        console.log('Order deleted successfully');
        this.removeOrderFromList(orderId);
      },
      error: (error) => {
        console.error('Error deleting order:', error);
      }
    });
  }

  nextPage() {
    if (this.orders?.totalPages && this.currentPage < this.orders.totalPages - 1) {
      this.currentPage++;
      this.loadOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadOrders();
    }
  }
}
