const { Router } = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *        - username
 *        - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

const router = Router();
const { login } = require("../controllers/session.controller");

// API test route
router.get("/", (req, res) => {
  res.send("API running, Documentation available at /api/docs");
});

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: User login
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     security: [] 
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in
 */
// login route
router.post("/login", login);

module.exports = router;
