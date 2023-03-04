export interface PublicMenu {
    menuId: string;
    cookId: string;
    title: string;
    description: string;
    preparationTime: string;
    kitchenId: string;
    greetingFromKitchen: boolean;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number;
    createdAt: Date;
}
