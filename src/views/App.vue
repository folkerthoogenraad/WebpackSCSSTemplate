<!-- src/components/Hello.vue -->

<template>
    <div>
      Vue loaded. {{message}}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// The @Component decorator indicates the class is a Vue component
@Component
export default class App extends Vue {
  message: string = 'Hello!'
}
</script>

<style lang="scss" scoped>

</style>