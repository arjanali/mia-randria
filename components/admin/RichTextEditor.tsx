"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 text-sm font-medium border border-transparent hover:border-[var(--color-border)] ${
          editor.isActive("bold") ? "bg-white border-[var(--color-border)]" : ""
        }`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 text-sm italic border border-transparent hover:border-[var(--color-border)] ${
          editor.isActive("italic") ? "bg-white border-[var(--color-border)]" : ""
        }`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 text-sm border border-transparent hover:border-[var(--color-border)] ${
          editor.isActive("heading", { level: 2 }) ? "bg-white border-[var(--color-border)]" : ""
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 text-sm border border-transparent hover:border-[var(--color-border)] ${
          editor.isActive("heading", { level: 3 }) ? "bg-white border-[var(--color-border)]" : ""
        }`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setLink({ href: "" }).run()}
        className={`px-2 py-1 text-sm border border-transparent hover:border-[var(--color-border)] ${
          editor.isActive("link") ? "bg-white border-[var(--color-border)]" : ""
        }`}
      >
        Link
      </button>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  disabled,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Heading.configure({ levels: [2, 3] }),
    ],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[200px] px-4 py-3 font-body text-[var(--color-text)] focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="border border-[var(--color-border)] bg-white">
      <Toolbar editor={editor} />
      <div className="min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
