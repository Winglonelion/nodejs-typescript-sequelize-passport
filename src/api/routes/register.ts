
import express from "express";
import passport from "passport";

import { handler, type, validate } from 'api/functions/register'
import { RouterType } from "./types";

const name = "register";
const router = express.Router();

/**
 * @swagger
 *
 * /register:
 *  post:
 *      description: Create new account for user
 *      parameters:
 *       - email:
 *         in: formData
 *         required: true
 *         type: string
 */
router[type]("/", validate, handler);

const RegisterRouter: RouterType = { name, router };

export default RegisterRouter
