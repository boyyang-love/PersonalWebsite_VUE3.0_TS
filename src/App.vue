<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

.el-message-box {
  max-height: 75vh;
  overflow: auto !important;
}

@media screen and (max-width: 400px) {
  .el-message-box__wrapper .el-message-box {
    width: 340px !important;
  }
}
</style>
