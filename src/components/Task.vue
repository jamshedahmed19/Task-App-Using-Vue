<template>
    <div @dblclick="onDblClick(task)" :class="[task.reminder ? 'reminder' : '', 'task']">
        <h3>
            {{ task.text }}
            <i @click="this.deleteTask(task)" class="fas fa-times"></i>
        </h3>
        <p>{{ task.day }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Task',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions(["deleteTask", "updateTaskReminder"]),
        onDblClick(task) {
            const updateTask = {
                id: task.id,
                text: task.text,
                day: task.day,
                reminder: !task.reminder
            };
            this.updateTaskReminder(updateTask);
        }
    },
}
</script>

<style scope>
.fas {
    color: red;
}

.task {
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.task.reminder {
    border-left: 5px solid green;
}

.task h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>