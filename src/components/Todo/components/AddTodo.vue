<template>
  <div class="addtodo">
    <input type="text" placeholder="New Todo" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddTodo",
});
</script>

<style scoped lang='scss'>
.addtodo {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  .add {
    width: 20%;
    height: 100%;
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 15px;
    background-color: rgba(24, 21, 21, 0.6);
    color: white;
    border-radius: 15px 0;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>