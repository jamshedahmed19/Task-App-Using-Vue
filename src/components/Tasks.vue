<template>
    <div :key="task.id" v-for="task in allTasks">
        <Task :task="task" />
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Task from './Task.vue';

export default {
    name: "Tasks",
    components: { Task },
    created() {
        this.fetchTasks();
    },
    methods: {
        ...mapActions(["fetchTasks"]),
    },
    computed: {
        ...mapGetters(["allTasks"])
    }
}
</script>