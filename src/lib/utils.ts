import clsx from "clsx";

export function cn(...classes: Array<string | number | null | undefined | false>) {
  return clsx(classes);
}

