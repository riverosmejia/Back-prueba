"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Arouter = (0, express_1.Router)();
const getAllUser_1 = require("../controllers/Users/getAllUser");
const getUserById_1 = require("../controllers/Users/getUserById");
const createUser_1 = require("../controllers/Users/createUser");
const deleteUser_1 = require("../controllers/Users/deleteUser");
const loginUser_1 = require("../controllers/Users/loginUser");
//obtener todos los usuarios
Arouter.get("/users", getAllUser_1.getAllUser);
//obtener usuario por ID
Arouter.get("/user/:id", getUserById_1.getUserById);
//crear un usuario
Arouter.post("/users/register", createUser_1.createUser);
//borrar un usuario
Arouter.delete("/user/:id", deleteUser_1.deleteUser);
//loguear un usuario
Arouter.post("/user/login", loginUser_1.loginUser);
exports.default = Arouter;
