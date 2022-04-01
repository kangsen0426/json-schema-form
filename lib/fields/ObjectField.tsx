import { defineComponent, inject, DefineComponent } from 'vue'
import { SchemaFormConteextKey } from '../context'
import { FiledPropsDefine } from '../types'
import SchemaItem from '../SchemaItem'
import { isObject } from '../utils'
type SchemaItemDefine = DefineComponent<typeof FiledPropsDefine>

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context: { SchemaItem: SchemaItemDefine } | undefined = inject(
      SchemaFormConteextKey,
    )

    if (!context) {
      throw Error('SchemaForm should be used')
    }

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
