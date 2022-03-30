<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine } from '../types'

export default {
  props: FiledPropsDefine,
  setup(props: any) {
    const handleChange = (e: any) => {
      console.log(e)

      //校验 number 类型

      const value = e.target.value
      const num = +value // 转为 number

      props.onChange(Number.isNaN(num) ? undefined : num)
    }

    return {
      handleChange,
    }
  },
}
</script>
