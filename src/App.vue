<script>
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTask from "./components/AddTask.vue";
export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
    return {
      title: "Task List",
      showAddTask: false,
      tasks: [
      ]
    };
  },
  created() {
    this.tasks = [{
      id: 1,
      text: "Learn Vue",
      day: "21/07/2020",
      reminder: true
    },
    {
      id: 2,
      text: "Learn Vuex",
       day: "21/07/2020",
      reminder: false
    },
    {
      id: 3,
      text: "Learn Vue Router",
       day: "21/07/2020",
      reminder: false
    }]
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    toggleReminder(id) {
      this.tasks = this.tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task);
    },
    addTask(task) {
      this.tasks = [...this.tasks, task];
    }
  }
};
</script>

<template>
  <div class="container">
    <Header :title="title" :showAddTask="showAddTask" @toggle-add-task="toggleAddTask" />
    <AddTask v-if="showAddTask" @add-task="addTask" />
    <Tasks :tasks="tasks" @toggle-reminder="toggleReminder" @delete-task="deleteTask" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
