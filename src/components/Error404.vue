<template>
  <div class="text-center q-ma-xl">
    <p>
      <img src="assets/sad.svg" style="width: 30vw; max-width: 150px" />
    </p>
    <p class="text-faded">
      Sorry, nothing here...
      <strong>(404)</strong>
    </p>
    <q-btn color="secondary" style="width: 200px" to="/" label="Go back" />
  </div>
</template>

<script >
export default {
  name: "Error404",
};
</script>
