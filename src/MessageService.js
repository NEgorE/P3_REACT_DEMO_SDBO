import { BehaviorSubject } from 'rxjs';

const subscriberMetric1 = new BehaviorSubject(0);

const subscriberFilter1 = new BehaviorSubject([]);


export {
    subscriberMetric1,
    subscriberFilter1
}