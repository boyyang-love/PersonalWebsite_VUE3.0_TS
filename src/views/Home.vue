<template>
  <div class="home">
    <div class="todoBox">
      <todo></todo>
    </div>
  </div>
</template>

<script lang="ts">
import Todo from "@/components/Todo/index.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Home",
  components: {
    Todo,
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .todoBtn {
    position: absolute;
    bottom: 50px;
    left: 50px;
    font-size: 20px;
    color: rgb(192, 67, 88);
    font-weight: 500;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
}
</style>
