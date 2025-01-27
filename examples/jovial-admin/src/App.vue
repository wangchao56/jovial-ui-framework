<script setup lang='ts'>
</script>

<template>
  <section>
    <div
      v-for="i in 10 " :key="i" v-slide-in
    >
      {{ i }}
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  gap: 146px;
  padding: 60px;
  box-sizing: border-box;
}
div {
  width: 70vw;
  height: 80vh;
  background-color: #ccc;
  display: grid;
  place-content: center;
}
</style>
