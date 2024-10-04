"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`file-upload border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors duration-300 ${
        isDragActive
          ? "border-green-500 bg-green-100"
          : "border-green-300 hover:border-green-500 hover:bg-green-100"
      }`}
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[200px] w-full overflow-hidden object-cover rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/assets/icon/upload.svg"
            width={32}
            height={32}
            alt="upload"
            className="mb-2"
          />
          <div className="file-upload_label">
            <p className="text-sm mb-1">
              <span className="text-green-600 font-semibold">
                Click to upload{" "}
              </span>
              or drag and drop
            </p>
            <p className="text-xs text-green-700">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
