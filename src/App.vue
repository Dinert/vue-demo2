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
</style>
