import request from "supertest";
import app, { server } from "../index"; 
import Todo from "../models/todoModel";
import sequelize from "../config/db";

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión a la base de datos
  server.close(); // Cierra el servidor Express
});

jest.mock("../models/todoModel");

describe("Todo Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("should return all todos", async () => {
      const mockTodos = [{ id: "1", task: "Test task" }];
      (Todo.findAll as jest.Mock).mockResolvedValue(mockTodos);

      const res = await request(app).get("/api/todo");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTodos);
    });
  });

  describe("GET /:id", () => {
    it("should return a single todo by ID", async () => {
      const mockTodo = { id: "1", task: "Test task" };
      (Todo.findByPk as jest.Mock).mockResolvedValue(mockTodo);

      const res = await request(app).get("/api/todo/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTodo);
    });

    it("should return 404 if todo is not found", async () => {
      (Todo.findByPk as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get("/api/todo/999");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Task not found" });
    });
  });

  describe("POST /", () => {
    it("should create a new todo", async () => {
      const mockTodo = { id: "1", task: "New Task" };
      (Todo.create as jest.Mock).mockResolvedValue(mockTodo);

      const res = await request(app).post("/api/todo").send({ task: "New Task" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTodo);
    });

    it("should return 400 if task is missing", async () => {
      const res = await request(app).post("/api/todo").send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Task is required" });
    });
  });

  describe("PUT /:id", () => {
    it("should update a todo", async () => {
        const mockTodo = { id: "1", task: "Old Task", save: jest.fn() };
        (Todo.findByPk as jest.Mock).mockResolvedValue(mockTodo);
      
        const updatedTask = "Updated Task";
        const res = await request(app).put("/api/todo/1").send({ task: updatedTask });
      
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: "1", task: updatedTask });
        expect(mockTodo.save).toHaveBeenCalled(); 
        expect(mockTodo.task).toBe(updatedTask); 
      });

    it("should return 400 if task is missing", async () => {
      const res = await request(app).put("/api/todo/1").send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Task is required" });
    });

    it("should return 404 if todo is not found", async () => {
      (Todo.findByPk as jest.Mock).mockResolvedValue(null);

      const res = await request(app).put("/api/todo/999").send({ task: "Updated Task" });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Task not found" });
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a todo", async () => {
      const mockTodo = { id: "1", task: "Task to delete", destroy: jest.fn() };
      (Todo.findByPk as jest.Mock).mockResolvedValue(mockTodo);

      const res = await request(app).delete("/api/todo/1");
      expect(res.status).toBe(200);
      expect(mockTodo.destroy).toHaveBeenCalled();
    });

    it("should return 404 if todo is not found", async () => {
      (Todo.findByPk as jest.Mock).mockResolvedValue(null);

      const res = await request(app).delete("/api/todo/999");
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Todo is required" });
    });
  });
});