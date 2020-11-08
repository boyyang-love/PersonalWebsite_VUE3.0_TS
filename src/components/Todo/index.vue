<template>
  <div class="todo" v-show="isShow">
    <todo-head @hidden="hidden">Todolist</todo-head>
    <todo-items>1111111111111</todo-items>
    <add-todo></add-todo>
    <slot></slot>
  </div>
  <div class="todoBtn" @click="addTodo">ToDo +</div>
</template>

<script lang='ts'>
import TodoHead from "./components/TodoHead.vue";
import TodoItems from "./components/TodoItems.vue";
import AddTodo from "./components/AddTodo.vue";
import { defineComponent, reactive, ref } from "vue";
import { ItodoList } from "@/typings";

export default defineComponent({
  name: "Todo",
  components: {
    TodoHead,
    TodoItems,
    AddTodo,
  },
  setup() {
    const isShow = ref<boolean>(false);

    const todoList = reactive<ItodoList[]>([
      { id: new Date().getTime(), content: "222222" },
    ]);
    const addTodo = (): void => {
      isShow.value = !isShow.value;
    };

    const hidden = (status: boolean): void => {
      isShow.value = status;
    };

    return {
      isShow,
      addTodo,
      hidden,
    };
  },
});
</script>

<style scoped lang='scss'>
.todo {
  width: 300px;
  min-height: 50px;
  background-color: rgba(143, 66, 66, 0.4);
  position: absolute;
  bottom: 85px;
  left: 50px;
  border-radius: 15px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
}

.todoBtn {
  position: absolute;
  bottom: 30px;
  left: 50px;
  font-size: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: rgba(156, 38, 38, 0.692);
  }
}
</style>