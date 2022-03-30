<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine } from '../types'

export default {
  props: FiledPropsDefine,
  setup(props: any) {
    const handleChange = (e: any) => {
      console.log(e)
      props.onChange(e.target.value)
    }

    return {
      handleChange,
    }
  },
}
</script>
