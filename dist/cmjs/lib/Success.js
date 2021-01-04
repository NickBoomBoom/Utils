"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_model_1 = require("../models/lib.model");
var Success = /** @class */ (function () {
    function Success(data) {
        var result = {
            state: lib_model_1.State.success,
            data: data
        };
        return result;
    }
    return Success;
}());
exports.default = Success;
//# sourceMappingURL=Success.js.map