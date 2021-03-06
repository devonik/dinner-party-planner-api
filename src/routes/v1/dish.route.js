const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const dishValidation = require('../../validations/dish.validation');
const dishController = require('../../controllers/dish.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageDishes'), validate(dishValidation.createDish), dishController.createDish)
  .get(validate(dishValidation.getDishes), dishController.getDishes);

router
  .route('/:dishId')
  .get(validate(dishValidation.getDish), dishController.getDish)
  .patch(auth('manageDishes'), validate(dishValidation.updateDish), dishController.updateDish)
  .delete(auth('manageDishes'), validate(dishValidation.deleteDish), dishController.deleteDish);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management and retrieval
 */

/**
 * @swagger
 * path:
 *  /dishs:
 *    post:
 *      summary: Create a dish
 *      description: The dish will be created by cooks.
 *      tags: [Dishes]
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
 *                - description
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
 *                title: Pizza
 *                subtitle: American style
 *                description: American style pizza is awesome
 *                imageUrl: https://banner2.cleanpng.com/20171220/oqe/pizza-png-image-5a3ab839564e57.89039813151379768935351034.jpg
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Dish'
 *        "400":
 *          $ref: '#/components/responses/DuplicateTitle'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all dishes
 *      description: Anyone can get all dishes.
 *      tags: [Dishes]
 *      parameters:
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          description: Dish title
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
 *                      $ref: '#/components/schemas/Dish'
 */

/**
 * @swagger
 * path:
 *  /dishes/{id}:
 *    get:
 *      summary: Get a dish
 *      description: Logged in cooks can fetch only their own dish information. Only admins can fetch other dishs.
 *      tags: [Dishes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Dish id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Dish'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a dish
 *      description: Logged in dishs can only update their own information. Only admins can update other dishs.
 *      tags: [Dishes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Dish id
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
 *                description:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *              example:
 *                title: Pizza
 *                subtitle: American style
 *                description: American style pizza is awesome
 *                imageUrl: https://banner2.cleanpng.com/20171220/oqe/pizza-png-image-5a3ab839564e57.89039813151379768935351034.jpg
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Dish'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a dish
 *      description: Logged in dishs can delete only themselves. Only admins can delete other dishs.
 *      tags: [Dishes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Dish id
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
