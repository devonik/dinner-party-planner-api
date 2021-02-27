const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const validation = require('../../validations/ingredient.validation');
const controller = require('../../controllers/ingredient.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageIngredients'), validate(validation.create), controller.create)
  .get(validate(validation.getAll), controller.getAll);

router
  .route('/:id')
  .get(validate(validation.getById), controller.getById)
  .patch(auth('manageIngredients'), validate(validation.update), controller.updateById)
  .delete(auth('manageIngredients'), validate(validation.deleteById), controller.deleteById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredient management and retrieval
 */

/**
 * @swagger
 * path:
 *  /ingredients:
 *    post:
 *      summary: Create a ingredient
 *      description: The ingredient will be created by cooks.
 *      tags: [Ingredients]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - subtitle
 *                - imageUrl
 *              properties:
 *                title:
 *                  type: string
 *                  description: must be unique
 *                subtitle:
 *                  type: string
 *                description:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *              example:
 *                title: Tomato
 *                subtitle: It's red
 *                imageUrl: https://png.pngtree.com/png-clipart/20190925/original/pngtree-red-tomato-png-image_4983241.jpg
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Ingredient'
 *        "400":
 *          $ref: '#/components/responses/DuplicateTitle'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all ingredientes
 *      description: Anyone can get all ingredientes.
 *      tags: [Ingredients]
 *      parameters:
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          description: Ingredient title
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Ingredient'
 */
/**
 * @swagger
 * path:
 *  /ingredientes/{id}:
 *    get:
 *      summary: Get a ingredient
 *      description: Logged in cooks can fetch only their own ingredient information. Only admins can fetch other ingredients.
 *      tags: [Ingredientes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Ingredient id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Ingredient'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a ingredient
 *      description: Logged in ingredients can only update their own information. Only admins can update other ingredients.
 *      tags: [Ingredientes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Ingredient id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: must be unique
 *                subtitle:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *              example:
 *                title: Tomato
 *                subtitle: It's red
 *                imageUrl: https://png.pngtree.com/png-clipart/20190925/original/pngtree-red-tomato-png-image_4983241.jpg
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Ingredient'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a ingredient
 *      description: Logged in ingredients can delete only themselves. Only admins can delete other ingredients.
 *      tags: [Ingredientes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Ingredient id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
