import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../typings/Task";

interface TaskState {
  task: ITask[];
}

// Define the initial state using that type
const initialState: TaskState = {
  task: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    initTask: (state, action: PayloadAction<ITask[]>) => {
      state.task = action.payload;
    },
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
export const { addTask, removeTask, updateTask, switchStatusTask, initTask } =
  taskListSlice.actions;

export default taskListSlice.reducer;
