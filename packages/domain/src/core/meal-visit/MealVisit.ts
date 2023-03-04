import { Platform } from '../shared.js';

export interface MealVisit {
    mealVisitId: string;
    mealId: string;
    sessionId: string;
    userId?: string;
    platform: Platform;
    createdAt: string;
}
