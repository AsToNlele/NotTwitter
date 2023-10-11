import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCaret = (el: HTMLDivElement | null) => {
  const sel = window.getSelection();

  if (!el || !sel || sel?.rangeCount == 0) return 0;

  const range = sel.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);
  return preRange.toString().length;
};

export const setCaret = (el: HTMLDivElement | null, offset: number) => {
  if (!el || offset === undefined || el.textContent === "") return;
  const sel = window.getSelection();
  const range = document.createRange();

  if (el.childNodes?.[0]) {
    range.setStart(el.childNodes[0], offset);
  } else {
    range.setStart(el, offset);
  }

  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
};

export const getTag = (content: string, caretPosition: number): string => {
  const atIndex = content.lastIndexOf("@", caretPosition - 1);
  if (atIndex === -1) {
    return "";
  }

  const prefix = content[atIndex - 1];
  if (prefix && !/\s/.test(prefix)) {
    return "";
  }

  const afterAt = content.slice(atIndex + 1, caretPosition);
  if (afterAt.includes(" ")) {
    return "";
  }

  const whitespaceIndex = content.indexOf(" ", caretPosition);
  const tagEndIndex = whitespaceIndex === -1 ? content.length : whitespaceIndex;

  return content.slice(atIndex + 1, tagEndIndex);
};
