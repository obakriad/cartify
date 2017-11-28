import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    CartService,
    ShopService
} from '../shared/index';

import { BaseError } from '../error/base-error';
import { NotFoundError } from '../error/not-found-error';
import { ICartItem } from '../shared/cart-item.interface';

@Component({
    templateUrl: './cart-item-list.component.html',
    providers: [CartService, ShopService]
})
export class ItemCartComponent implements OnInit {
    private userCartItems: ICartItem[];
    private showLoading = true;

    constructor(private router: Router, private cart: CartService) {}

    ngOnInit(): void {
        this.cart.getCartItems().subscribe(
            cart => this.userCartItems = cart,
            (error: BaseError) => {
                if (error instanceof NotFoundError) {
                    console.log('NOT FOUND');
                } else {
                    throw error;
                }
            },
            () => this.showLoading = false
        );
    }

    increaseQuantity(item: ICartItem): void {
        this.cart.increaseCartItemQunatity(item).subscribe(
            items => console.log('Incremented'));
    }

    decreaseQunatity(item: ICartItem): void {
        this.cart.decreaseCartItemQunatity(item).subscribe(
            items => console.log('Decremented'));
    }

    removeCartItem(item: ICartItem): void {
        this.cart.removeCartItem(item).subscribe(
            items => console.log('Removed'));
    }

    goBack(): void {
        this.router.navigate(['/items']);
    }
}
