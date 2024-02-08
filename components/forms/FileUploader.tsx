"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="bg-neutral-100 border border-gray-200 flex justify-center items-center h-72 cursor-pointer flex-col overflow-hidden rounded-md w-full flex-1 hover:bg-neutral-200 transition-all hover:border-gray-300 shadow-sm"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={400}
            height={400}
            className="w-full object-cover object-center"
            title="Image Preview"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col py-5 text-grey-500 w-full">
          <h3 className="mb-2 mt-2 text-slate-600 font-medium">
            Drag photo here
          </h3>
          <p className="p-medium-12 mb-4 text-slate-500 text-sm font-light">
            SVG, PNG, JPG
          </p>
          <Button type="button">Click to select</Button>
        </div>
      )}
    </div>
  );
}
