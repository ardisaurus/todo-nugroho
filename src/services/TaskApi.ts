import axios from "axios";
import { ITask } from "../typings/Task";

const apiClient = axios.create({
  baseURL: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0",
  headers: {
    "Content-type": "application/json",
  },
});

export const getTasks = async () => {
  const response = await apiClient.get<ITask[]>("/to-do-list");
  return response.data;
};
