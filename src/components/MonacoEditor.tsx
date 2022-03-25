import * as Monaco from 'monaco-editor'

import {
  defineComponent,
  PropType,
  shallowRef,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    // 必须先shallowRef，否则，editer.getValue（）将不起作用
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let ___prevent_trigger_change_event = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
          containerRef.value,
          {
            value: props.code,
            language: 'json',
            formatOnPaste: true,
            tabSize: 2,
            minimap: {
              enabled: false,
            },
          },
        )),
        _subscription = editor.onDidChangeModelContent((event) => {
          if (!___prevent_trigger_change_event) {
            props.onChange(editor.getValue(), event)
          }
        })
    })

    onBeforeUnmount(() => {
      if (_subscription) {
        _subscription.dispose()
      }
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()

        if (v !== model.getValue()) {
          editor.pushUndoStop()
          ___prevent_trigger_change_event = true
          // pushEditOperations表示它期望使用cursorComputer，但似乎不需要
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          )
          editor.pushUndoStop()
          ___prevent_trigger_change_event = false
        }
        // if (v !== editorRef.value.getValue()) {
        //   editorRef.value.setValue(v)
        // }
      },
    )

    const classRef = useStyles()

    return () => {
      const classes = classRef.value
      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
