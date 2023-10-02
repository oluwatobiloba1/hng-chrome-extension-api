"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
/**
 * @openapi
 * /video/{id}:
 *  get:
 *    tag: video
 *  parameters:
 *      - name: id
 *      - in: path
 *      - description: id of the video to request.
 *      - required: true
 */
router.get('/video/:id', controller_1.getVideo);
/**
 * @openapi
 * /start:
 *  post:
 *    tag: video
 *  responses:
 *    200:
 *      description: A successful response
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      -id
 *
 *
 */
router.post('/start', controller_1.startUpload);
/**
 * @openapi
 * /upload/{id}:
 *  put:
 *    tag: video
 *  parameters:
 *      - name: id
 *      - in: path
 *      - description: id of the video for uploading chunks of string data
 *      - required: true
 */
router.put('/upload/:id', controller_1.uploadVideo);
/**
 * @openapi
 * /finish/{id}:
 *  post:
 *    tag: video
 *  parameters:
 *    - name: id
 *    - in: path
 *    - description: id of the video for completing upload
 *    - required: true
 */
router.post('/finish/:id', controller_1.uploadVideo);
exports.default = router;
// module.exports = router
