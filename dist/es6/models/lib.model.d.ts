export declare enum State {
    fail = 0,
    success = 1
}
export interface IPromiseResponse {
    state: State;
    err?: any;
    data?: any;
}
