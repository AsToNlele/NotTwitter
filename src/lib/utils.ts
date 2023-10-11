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
  if (!el || offset === undefined) return;
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
