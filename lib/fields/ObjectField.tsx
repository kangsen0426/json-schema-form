import { defineComponent, inject } from 'vue'
import { useVJSFContext } from '../context'
import { FiledPropsDefine } from '../types'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleObjeectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (undefined === v) {
        delete value[key]
      } else {
        // 更新 value
        value[key] = v
      }

      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}

      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          onChange={(v: any) => handleObjeectFieldChange(k, v)}
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
        />
      ))
    }
  },
})
