import { useState, useEffect, FunctionComponent } from "react";
import { ITask } from "../typings/Task";
import ItemCard from "../components/ItemCard";

interface TaskListProps {
  tasks: ITask[];
  status?: "complete" | "incomplete";
}

const TaskList: FunctionComponent<TaskListProps> = ({
  tasks,
  status = "incomplete",
}) => {
  const [todos, setTodos] = useState<ITask[]>([]);
  useEffect(() => {
    const filtered = tasks.filter((task: ITask) => {
      if (status === "incomplete") {
        return task.status === 0;
      } else {
        return task.status === 1;
      }
    });
    if (status === "incomplete") {
      filtered.sort(function (a, b) {
        var dateA = new Date(a.createdAt);
        var dateB = new Date(b.createdAt);
        return dateA > dateB ? 1 : -1;
      });
    } else {
      filtered.sort(function (a, b) {
        var dateA = new Date(a.createdAt);
        var dateB = new Date(b.createdAt);
        return dateB > dateA ? 1 : -1;
      });
    }
    setTodos(filtered);
    // eslint-disable-next-line
  }, [tasks]);

  return (
    <>
      {todos.map((item: any) => (
        <ItemCard data={item} key={item.id} />
      ))}
    </>
  );
};

export default TaskList;
