import { defineComponent, PropType } from 'vue'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
import { Schema, SchemaTypes } from './types'

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  name: 'SchemaItem',
  setup(props) {
    return () => {
      const { schema } = props

      const type = schema.type

      // TODO:如果 用户没有指定 type 需要猜测 type

      let Component: any

      // 对于不同的schema做分发处理

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} 类型不支持`)
        }
      }

      return <Component {...props} />
    }
  },
})
