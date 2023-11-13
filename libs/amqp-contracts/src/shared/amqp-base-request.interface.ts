export interface AmqpBaseRequest<T = unknown> {
  type: string;
  payload: T;
  requestid: string;
  timestamp: string;
  exchange?: string;
  routingKey?: string;
}
