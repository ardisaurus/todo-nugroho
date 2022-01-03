import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../typings/Task";

interface TaskState {
  task: ITask[];
}

// Define the initial state using that type
const initialState: TaskState = {
  task: [
    {
      id: 1,
      title: "Make a meal",
      description: "lorem ipsum",
      status: 0,
      createdAt: "2019-11-15 18:00",
    },
    {
      id: 2,
      title: "Dinner with family",
      description: "lorem ipsum",
      status: 0,
      createdAt: "2019-11-16 18:00",
    },
    {
      id: 3,
      title: "Watch scary movie",
      description: "lorem ipsum",
      status: 0,
      createdAt: "2019-11-15 13:00",
    },
    {
      id: 4,
      title: "Learn something new",
      description: "lorem ipsum",
      status: 1,
      createdAt: "2019-11-15 08:00",
    },
    {
      id: 5,
      title: "Make a phone call to mom",
      description: "lorem ipsum",
      status: 1,
      createdAt: "2019-11-15 04:00",
    },
  ],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.task.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.task = state.task.filter((task) => {
        return task.id !== action.payload;
      });
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const { id } = action.payload;
      const idx = state.task.findIndex((task) => task.id === id);
      state.task[idx] = action.payload;
    },
    switchStatusTask: (state, action: PayloadAction<ITask>) => {
      const { id } = action.payload;
      const idx = state.task.findIndex((task) => task.id === id);
      if (state.task[idx].status === 0) {
        state.task[idx].status = 1;
      } else {
        state.task[idx].status = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask, updateTask, switchStatusTask } =
  taskListSlice.actions;

export default taskListSlice.reducer;
