"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_model_1 = require("../models/lib.model");
var Fail = /** @class */ (function () {
    function Fail(err) {
        var result = {
            state: lib_model_1.State.fail,
            err: err
        };
        return result;
    }
    return Fail;
}());
exports.default = Fail;
//# sourceMappingURL=Fail.js.map