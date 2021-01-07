import { State, IPromiseResponse } from '../models/lib.model';

class Fail {
  constructor(err?: any) {
    const result: IPromiseResponse = {
      state: State.fail,
      err
    }
    return result
  }
}

export default Fail