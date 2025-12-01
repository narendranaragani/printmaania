"use client";

import { Upload } from "lucide-react";

type DesignUploadHintProps = {
  label?: string;
};

export const DesignUploadHint = ({ label = "Upload Design/Logo" }: DesignUploadHintProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-[#FFD369] bg-gradient-to-br from-[#FFD369]/10 to-white p-5">
      <label className="flex cursor-pointer items-center gap-4 text-sm text-[#222831]">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD369]/20">
          <Upload className="h-5 w-5 text-[#FF6B35]" />
        </span>
        <div className="flex flex-col">
          <span className="font-bold text-[#222831]">{label}</span>
          <span className="text-xs text-[#555555]">
            Visual placeholder. Attach the real file once WhatsApp opens.
          </span>
        </div>
        <input type="file" className="sr-only" disabled />
      </label>
      <p className="mt-3 text-xs text-[#555555]">
        Once your WhatsApp chat opens please add your artwork or reference images there.
      </p>
    </div>
  );
};

