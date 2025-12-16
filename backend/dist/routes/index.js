"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_1 = __importDefault(require("./health"));
const tests_1 = __importDefault(require("./tests"));
const votes_1 = __importDefault(require("./votes"));
const uploads_1 = __importDefault(require("./uploads"));
const router = (0, express_1.Router)();
router.use(health_1.default);
router.use(tests_1.default);
router.use(votes_1.default);
router.use(uploads_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map