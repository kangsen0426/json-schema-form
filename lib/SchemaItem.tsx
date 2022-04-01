import { computed, defineComponent, PropType } from 'vue'
// import NumberField from './fields/NumberField'
import NumberField from './fields/NumberField.vue'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
import ObjectField from './fields/ObjectField'

import { FiledPropsDefine, Schema, SchemaTypes } from './types'

import { retrieveSchema } from './utils'

export default defineComponent({
  props: FiledPropsDefine,
  name: 'SchemaItem',
  setup(props) {
    const retrieveSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {
      const { schema } = props

      const retrieveSchema = retrieveSchemaRef.value

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
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        default: {
          console.warn(`${type} 类型不支持`)
        }
      }

      return <Component {...props} schema={retrieveSchema} />
    }
  },
})
