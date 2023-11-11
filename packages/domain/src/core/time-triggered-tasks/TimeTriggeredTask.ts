import { type NanoId } from '../shared';

export interface TimeTriggeredTaskPullPayment {
    type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT';
    bookingRequestId: NanoId;
}

export interface TimeTriggeredTaskPullPaymentAnnouncement {
    type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT';
    bookingRequestId: NanoId;
}

export type TimeTriggeredTaskVariation = TimeTriggeredTaskPullPayment | TimeTriggeredTaskPullPaymentAnnouncement;

export interface TimeTriggeredTask {
    timeTriggeredTaskId: NanoId;
    dueDate: Date;
    task: TimeTriggeredTaskVariation;
    createdAt: Date;
}
