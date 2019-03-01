<template>
  <div>
    <span :style="{background:color}"><i :class="icon"></i>&nbsp;{{name}}</span>
    <b :style="{color:color}">{{count}}</b>
  </div>
</template>

<script>
export default {
  props: {
    icon:{
      type: String,
      default(){
        return "el-icon-menu"
      }
    },
    color: {
      type: String,
      default() {
        return "#f90";
      }
    },
    name: {
      type: String,
      default() {
        return "未知";
      }
    },
    count: {
      type: Number,
      default() {
        return 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 200px;
  height: 60px;
  background: #fff;
  span {
    width: 50%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
  b {
    width: 50%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
