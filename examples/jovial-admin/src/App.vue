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
  /* height: 100vh; */
  display: flex;
  width: 100vw;
  padding: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  gap: 146px;
  box-sizing: border-box;
}

div {
  display: grid;
  width: 70vw;
  height: 80vh;
  background-color: #ccc;
  place-content: center;
}
</style>
