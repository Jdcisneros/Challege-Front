"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.findAll();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Error to fetch tasks" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        if (!task) {
            res.status(400).json({ error: "task is required" });
        }
        const newTask = yield todoModel_1.default.create({ task });
        res.status(200).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: "Error to create task" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield todoModel_1.default.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while searching for the task" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task } = req.body;
        if (!task) {
            return res.status(404).json({ error: "Task is required" });
        }
        const todo = yield todoModel_1.default.findByPk(id);
        if (!todo) {
            res.status(400).json({ error: "Task not found" });
        }
        else {
            todo.task = task;
            yield (todo === null || todo === void 0 ? void 0 : todo.save());
        }
        res.status(200).json(todo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating task" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield todoModel_1.default.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        yield (task === null || task === void 0 ? void 0 : task.destroy());
        res.status(200).json({ message: "Task deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting task" });
    }
}));
exports.default = router;
