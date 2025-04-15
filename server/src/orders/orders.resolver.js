import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { OrderSuccessInfo } from "./entities/order-success.entity";
import { Order, GetOrders } from "./entities/order.entity";
import { OrderSeller, GetOrderSeller } from "./entities/order-seller.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver(Order)
export class OrderResolver {
    //Constructor
    constructor(orderService) {
        this.orderService = orderService;
    }

    //Get Orders for admin
    @Query(() => GetOrders, { name: "getOrders" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getOrders(
        @Args("searchInput")
        searchInput
    ) {
        return this.orderService.getOrders(searchInput);
    };

    //Get Single Order for admin
    @Query(() => Order, { name: "getOrder" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getOrder(
        @Args("id", { type: () => String })
        id
    ) {
        return this.orderService.getOrder(id);
    };

    //Get orders by user
    @Query(() => [Order], { name: "getOrderByUser" })
    @UseGuards(AuthGuard)
    getOrderByUser(
        @Context("user")
        reqUser
    ) {
        return this.orderService.getOrderByUser(reqUser);
    };

    //Get single orders by user
    @Query(() => Order, { name: "getSingleOrderByUser" })
    @UseGuards(AuthGuard)
    getSingleByUser(
        @Context("user")
        reqUser,
        @Args("id", { type: () => String })
        id
    ) {
        return this.orderService.getSingleByUser(reqUser, id);
    };

    //Get orders by seller
    @Query(() => GetOrderSeller, { name: "getOrdersBySeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getOrdersBySeller(
        @Context("user")
        reqUser,
        @Args("searchInput")
        searchInput
    ) {
        return this.orderService.getOrderBySeller(reqUser, searchInput);
    };

    //Get single orders by seller
    @Query(() => OrderSeller, { name: "getSingleOrderBySeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getSingleBySeller(
        @Args("orderSellerId", { type: () => String })
        orderSellerId,
        @Context("user")
        reqUser
    ) {
        return this.orderService.getSingleBySeller(orderSellerId, reqUser);
    }

    //Track order
    @Query(() => Order, { name: "trackOrder" })
    track(
        @Args("trackInput")
        trackInput
    ) {
        return this.orderService.track(trackInput);
    }

    //Add Order
    @Mutation(() => OrderSuccessInfo, { name: "addOrder" })
    @UseGuards(AuthGuard)
    add(
        @Args("orderInput")
        orderInput,
        @Context("user")
        reqUser
    ) {
        return this.orderService.add(orderInput, reqUser);
    };

    //Pay Again
    @Mutation(() => OrderSuccessInfo, { name: "payAgain" })
    @UseGuards(AuthGuard)
    pay(
        @Args("orderId", { type: () => String })
        orderId,
        @Context("user")
        reqUser
    ) {
        return this.orderService.pay(orderId, reqUser);
    };

    //Change status by admin
    @Mutation(() => SuccessInfo, { name: "changeOrderStatus" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    statusByAdmin(
        @Args("orderSellerId", { type: () => String })
        orderSellerId,
        @Args("status", { type: () => String })
        status,
    ) {
        return this.orderService.adminStatus(orderSellerId, status);
    }

    //Cancel order status by admin
    @Mutation(() => SuccessInfo, { name: "cancelOrderStatusByAdmin" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    cancelByAdmin(
        @Args("orderSellerId", { type: () => String })
        orderSellerId
    ) {
        return this.orderService.cancelByAdmin(orderSellerId);
    }

    //Cancel order status by user
    @Mutation(() => SuccessInfo, { name: "cancelOrderStatusByUser" })
    @UseGuards(AuthGuard)
    cancelByUser(
        @Args("orderSellerId", { type: () => String })
        orderSellerId
    ) {
        return this.orderService.cancelByUser(orderSellerId);
    }

    //Change or add Order Notes
    @Mutation(() => SuccessInfo, { name: "orderNote" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    note(
        @Args("id", { type: () => String })
        id,
        @Args("note", { type: () => String })
        note
    ) {
        return this.orderService.note(note, id);
    };
}