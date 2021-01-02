import { State, IPromiseResponse } from '../models/lib.model';

class Success {
  constructor(data?: any) {
    const result: IPromiseResponse = {
      state: State.success,
      data
    }
    return result
  }
}

export default Success