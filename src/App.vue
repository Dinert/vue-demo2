<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style scoped></style>
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
#app > * {
  height: 100%;
}
   * {
      margin: 0;
      padding: 0;
    }
    ul, li{
      list-style: none;
    }
    .ali-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
</style>
