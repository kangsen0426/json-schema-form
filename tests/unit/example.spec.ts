import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import JsonSchemaForm, { NumberField } from '../../lib'

describe('HelloWorld.vue', () => {
  it('should render correct number field', () => {
    // 创建测试流程
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    // 渲染 numberField
    const numberField = wrapper.findComponent(NumberField)
    // expect(numberField.exists()).toBeTruthy()
  })
})

// const HelloWorld = defineComponent({
//   name: 'HelloWorld',
//   props: {
//     msg: String,
//   },
//   setup(props) {
//     return () => {
//       return h('div', props.msg)
//     }
//   },
// })

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg },
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
