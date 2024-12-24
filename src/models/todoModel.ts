import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Todo extends Model {

  public id!: number; 
  public task!: string;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "todo",
  }
);

export default Todo;
