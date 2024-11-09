'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import type { Snipet } from '@prisma/client';
import { editSnippet } from '@/actions';

interface SnippetEditFormProps {
  snippet: Snipet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = '') {
    console.log('here is the current model value:', value);
    setCode(value);
  }

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div className="mt-5">
      <Editor
        height="30vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={code}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
