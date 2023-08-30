"use client";

import React, { useEffect, useRef, useState } from "react";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import autoAnimate from "@formkit/auto-animate";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, HTMLContent, useEditor } from "@tiptap/react";
import { AiPolicy } from "../_utils";

interface Props {
  content: string | string[];
  handleOnChanges: (prop: any) => void;
  sectionId?: string;
  subSectionId?: string;
  heading?: AiPolicy["heading"];
  sections?: AiPolicy["sections"];
  sectionIndex?: number;
  subSectionIndex?: number;
  contentIndex?: number;
  hideDeleteButton?: boolean;
  handleUpdatePolicy: () => Promise<void>;
  handleDeleteSection: (sectionId: string) => void;
  handleDeleteSubSection: (
    sectionId: string,
    subSectionId: string,
    sectionIndex: number,
  ) => void;
}

export default function Editor({
  content,
  handleOnChanges,
  sectionId,
  subSectionId,
  heading,
  sections,
  sectionIndex,
  subSectionIndex,
  contentIndex,
  handleUpdatePolicy,
  handleDeleteSection,
  handleDeleteSubSection,
  hideDeleteButton = false,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Highlight,

      Link.configure({
        HTMLAttributes: {
          class: "editor-links",
        },
        openOnClick: false,
        protocols: ["mailto"],
      }),
    ],
    content,
  });

  const [isEditorFocused, setIsEditorFocused] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const parentRef = useRef(null);

  const htmlString = editor?.getHTML();

  const [savedContent, setSavedContent] = useState<HTMLContent>(
    htmlString as HTMLContent,
  );

  const handleEditorOnFocus = ({ target }: React.FocusEvent<HTMLElement>) => {
    if (target.closest(".tiptap")) {
      setIsEditorFocused(true);
    }
  };

  const handleEditorOnBlur = ({ target }: React.FocusEvent<HTMLElement>) => {
    if (!isHovering && target.closest(".tiptap")) {
      setIsEditorFocused(false);
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (!isConfirmed) return;
    if (!sectionId || !sectionIndex) return;

    if (!subSectionId) {
      handleDeleteSection(sectionId);
      setIsEditorFocused(false);
      return;
    }

    handleDeleteSubSection(sectionId, subSectionId, sectionIndex);
    setIsEditorFocused(false);
  };

  const handleOnDiscard = () => {
    editor?.commands.setContent(savedContent);
    setIsEditorFocused(false);
  };

  const handleOnSave = async () => {
    if (!htmlString) return;

    await handleUpdatePolicy();
    setSavedContent(htmlString);
    setIsEditorFocused(false);
  };

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current, { duration: 175 });
  }, [parentRef]);

  useEffect(() => {
    if (!htmlString) return;

    if (heading && htmlString !== heading.trim()) {
      handleOnChanges({ newContent: htmlString });
      return;
    }

    if (
      !sections ||
      sectionIndex === undefined ||
      subSectionIndex === undefined ||
      contentIndex === undefined
    )
      return;

    const { children } = sections[sectionIndex];
    if (!children) return;
    const { htmlContent } = children[subSectionIndex];
    if (!htmlContent) return;

    if (htmlString !== htmlContent[contentIndex].trim()) {
      handleOnChanges({
        sectionId,
        subSectionId,
        newContent: htmlString,
        contentIndex,
      });
    } // TODO - use memo is prob good here

    if (!Array.isArray(htmlContent) && htmlString !== htmlContent.trim()) {
      handleOnChanges({
        sectionId,
        subSectionId,
        newContent: htmlString,
      });
    }
  }, [
    contentIndex,
    handleOnChanges,
    heading,
    htmlString,
    sectionId,
    sectionIndex,
    sections,
    subSectionId,
    subSectionIndex,
  ]);

  useEffect(() => {
    if (!htmlString) return;
    setSavedContent(() => htmlString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlString ? null : htmlString]); // lmao what a pattern

  if (!editor) {
    return null;
  }

  return (
    <div
      className="editor-container"
      onBlur={handleEditorOnBlur}
      onFocus={handleEditorOnFocus}
      ref={parentRef}
    >
      <EditorContent editor={editor} />
      {isEditorFocused && (
        <div className="mt-[15px] flex justify-between">
          <div className="flex">
            <button
              onClick={handleOnSave}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                background: "#4A558E",
                border: "0.50px #252D54 solid",
              }}
              className="mr-[8px] inline-flex h-[30px] w-[105px] items-center justify-center gap-1 rounded-[3px] px-2.5 py-[3px]"
            >
              <p className="text-xs font-bold leading-normal text-white">
                Save changes
              </p>
            </button>

            <div>
              <button
                onClick={handleOnDiscard}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ border: "0.50px #4A558E solid" }}
                className="inline-flex h-[30px] w-[65px] items-center justify-center gap-1 rounded-[3px] px-2.5 py-[3px]"
              >
                <p
                  style={{ color: "#364071" }}
                  className="text-xs font-bold leading-normal text-indigo-900"
                >
                  Discard
                </p>
              </button>
            </div>
          </div>
          {!hideDeleteButton && (
            <div>
              <button
                onClick={handleDelete}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="text-right text-xs font-normal leading-normal text-zinc-500 underline"
              >
                delete section
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
