const { Router } = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         active:
 *           type: boolean
 */

const router = Router();
const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user.controller");
/**
 * @swagger
 * tags:
 *  name: Users
 * description: User management
 * /users:
 * 
 *  get:
 *   summary: Get all users, or a single user by id
 *   tags: [Users]
 *   parameters:
 *     - in: query
 *       name: id
 *       schema:
 *         type: string
 *       required: false
 *   responses:
 *    200:
 *      description: Users retrieved successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 *    404:
 *     description: User not found
 * 
 *    500:
 *      description: Error getting users
 * 
 *  post:
 *   summary: Create a new user
 *   tags: [Users]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *      description: User created successfully
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 * 
 *    500:
 *      description: Error creating user
 * 
 *  put:
 *   summary: Update an existing user
 *   tags: [Users]
 *   parameters:
 *     - in: query
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *      description: User updated successfully
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    500:
 *      description: Error updating user
 * 
 *  delete:
 *   summary: Delete an existing user
 *   tags: [Users]
 *   parameters:
 *     - in: query
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   responses:
 *    200:
 *      description: User deleted successfully
 *    404:
 *     description: User not found
 * 
 *    500:
 *      description: Error deleting user
 */

router.get("/users", userGet);
router.post("/users", userPost);
router.put("/users", userPut);
router.delete("/users", userDelete);

module.exports = router;