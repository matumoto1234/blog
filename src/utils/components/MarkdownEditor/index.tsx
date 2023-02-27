import MDEditor, { ContextStore } from '@uiw/react-md-editor'
import { useState } from 'react'
import { MarkdownViewer } from '../MarkdownViewer'
import { markdownEditor } from './index.css'

export const MarkdownEditor = () => {
  const [value, setValue] = useState('**Hello world!!!**')

  const onChange = (
    value?: string | undefined,
    event?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
    state?: ContextStore | undefined
  ) => {
    if (value) {
      setValue(value)
    }
  }

  return (
    <MDEditor
      className={markdownEditor}
      value={value}
      onChange={onChange}
      components={{
        preview: (
          source: string,
          state: ContextStore,
          dispatch: React.Dispatch<ContextStore>
        ) => {
          return <MarkdownViewer markdownText={source} />
        },
      }}
    />
  )
}
