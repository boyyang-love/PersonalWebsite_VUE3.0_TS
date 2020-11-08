<template>
  <div class="todoItems">
    <div class="check">
      <input type="checkbox" name="" id="" />
    </div>
    <div class="slot">
      <slot></slot>
    </div>
    <div class="del">
      <i class="iconfont icon-cha1"></i>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoItems",
});
</script>

<style scoped lang='scss'>
.todoItems {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #1bd1a5;
  border-radius: 0 13px;
  margin: 5px 0;
  min-height: 35px;

  .check {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      position: relative;
      cursor: pointer;
    }

    input[type="checkbox"]::before {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      top: 0;
      left: 0;
    }

    input[type="checkbox"]:checked::before {
      content: "\2665";
      width: 20px;
      height: 20px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #ff4c00;
      font-size: 20px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .slot {
    word-break: break-all;
    width: 80%;
    padding: 2px;
  }

  .del {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 10px;
      cursor: pointer;
      &:hover {
        color: rgb(139, 9, 9);
      }
    }
  }
}
</style>