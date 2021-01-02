import { State } from '../models/lib.model';
var Fail = /** @class */ (function () {
    function Fail(err) {
        var result = {
            state: State.fail,
            err: err
        };
        return result;
    }
    return Fail;
}());
export default Fail;
//# sourceMappingURL=Fail.js.map