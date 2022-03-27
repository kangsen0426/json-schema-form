import { defineComponent, reactive, ref, Ref, watchEffect } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'

import demos from './demos'
import SchemaForm from '../lib'

type Schema = any
type UISchema = any

// 将数据对象转换为 json
function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const schema = {
  type: 'string',
}

// 为编辑器创建样式
const useStyles = createUseStyles({
  // 容器样式
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  // 顶部菜单样式
  menu: {
    width: 700,
    flexShrink: 0,
  },
  //代码区样式
  code: {
    width: 700,
    flexShrink: 0,
  },
  //代码面板
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },

  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
})

export default defineComponent({
  setup() {
    // 选中状态
    const selectedRef: Ref<number> = ref(0)

    // 定义 demo 数据
    const demo: {
      schema: Schema | null
      data: any // 数据 对象
      uiSchema: UISchema | null //  ui 数据对象
      schemaCode: string // 转字符串后的code数据
      dataCode: string
      uiSchemaCode: string
    } = reactive({
      schema: null,
      data: {},
      uiSchema: '',
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d = demos[index] // demo 数据集
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
    })

    const methodRef: Ref<any> = ref()

    const classesRef = useStyles()

    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
    }

    // 监听代码区数据变化 处理函数
    const handleCodeChange = (
      filed: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) => {
      try {
        const json = JSON.parse(value)
        demo[filed] = json
        // 修改 样例的数据
        ;(demo as any)[`${filed}Code`] = value
      } catch (err) {
        console.log('代码格式有误')
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    return () => {
      const classes = classesRef.value
      const selected = selectedRef.value

      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form 组件库</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                class={classes.codePanel}
                code={demo.schemaCode}
                title="Schema - 数据集合区域"
                onChange={handleSchemaChange}
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.uiSchemaCode}
                  title="UISchema - UI数据区域"
                  onChange={handleUISchemaChange}
                />
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.dataCode}
                  title="Value - 表单数据区域"
                  onChange={handleDataChange}
                />
              </div>
            </div>
            <div class={classes.form}>
              <SchemaForm
                schema={demo.schema}
                value={demo.data}
                onChange={handleChange}
              />
              {/* <ThemeProvider theme={ThemeDefault}>
                <SchemaForm
                  customFormats={customFormat}
                  customKeywords={customKeyword}
                  uiSchema={demo.uiSchema || {}}
                  schema={demo.schema}
                  onChange={handleChange}
                  value={demo.data}
                  contentRef={contentRef}
                  ref={nameRef}
                  customValidate={demo.customValidate}
                />
              </ThemeProvider>
              <button onClick={validateForm}>validate</button> */}
            </div>
          </div>
        </div>
      )
    }
  },
})
