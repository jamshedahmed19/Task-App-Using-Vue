import axios from "axios";

const state = {
  tasks: [],
};

const getters = {
  allTasks: (state) => state.tasks,
};

const actions = {
  fetchTasks({ commit }) {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => commit("setTasks", response.data));
  },
  addTask({ commit }, task) {
    axios
      .post("http://localhost:5000/tasks", task)
      .then((response) => commit("newTask", response.data));
  },
  deleteTask({ commit }, task) {
    axios
      .delete(`http://localhost:5000/tasks/${task.id}`)
      .then((response) => commit("removeTask", task));
  },
  updateTaskReminder({ commit }, task) {
    axios
      .put(`http://localhost:5000/tasks/${task.id}`, task)
      .then((response) => {
        commit("toggleReminder", task);
      });
  },
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  newTask: (state, task) => state.tasks.unshift(task),
  removeTask: (state, task) =>
    (state.tasks = state.tasks.filter((t) => t.id !== task.id)),
  toggleReminder: (state, updatedTask) => {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
