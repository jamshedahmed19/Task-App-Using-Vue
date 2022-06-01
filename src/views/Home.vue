  <template>
    <AddTask v-show="showAddTask" @add-task="addTask" />
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
export default {
    name: "Home",
    props: {
        showAddTask: Boolean,
    },
    components: {
        Tasks,
        AddTask,
    },
    data() {
        return {
            tasks: []
        };
    },
    async created() {
        this.tasks = await this.fetchTasks();
    },
    methods: {
        async deleteTask(id) {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log(data)
            response.statusCode = 200 ? this.tasks = this.tasks.filter(task => task.id !== id) : alert("Error while deleting task");
        },
        async toggleReminder(id) {
            const taskToToggle = await this.fetchTask(id);
            const updateTask = {
                ...taskToToggle, reminder: !taskToToggle.reminder
            }

            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateTask)
            });

            this.tasks = this.tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task);
        },
        async addTask(task) {
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            const data = await response.json();
            this.tasks = [...this.tasks, data];
        },
        async fetchTasks() {
            const response = await fetch("http://localhost:5000/tasks");
            const data = await response.json();
            return data;
        },
        async fetchTask(id) {
            const response = await fetch(`http://localhost:5000/tasks/${id}`);
            const data = await response.json();
            return data;
        }
    }
};
</script>