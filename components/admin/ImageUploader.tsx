"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  value,
  onChange,
  disabled,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const supabase = createClient();
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: err } = await supabase.storage
      .from("post-images")
      .upload(path, file, { upsert: false });
    setUploading(false);
    if (err) {
      setError(err.message);
      return;
    }
    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    onChange(data.publicUrl);
    e.target.value = "";
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        disabled={disabled}
      />
      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt=""
            className="max-h-48 w-auto rounded border border-[var(--color-border)]"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled || uploading}
              className="text-sm font-medium text-[var(--color-accent)] hover:underline disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              disabled={disabled}
              className="text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="w-full py-12 border-2 border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] text-sm font-medium tracking-widest uppercase hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Drag & drop or click to upload"}
        </button>
      )}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
