
export enum State {
  fail,
  success,
}

export interface IPromiseResponse {
  state: State,
  err?: any,
  data?: any
}

