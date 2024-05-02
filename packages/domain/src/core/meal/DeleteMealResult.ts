export interface DeleteMealSuccessResult {
    deletedAt: Date;
}

export interface DeleteMealRequiredForMenuResult {
    menuId: string;
    menuTitle: string;
}

export interface DeleteMealErrorResult {
    failedAt: Date;
}

export type DeleteMealResult = DeleteMealSuccessResult | DeleteMealRequiredForMenuResult | DeleteMealErrorResult;
