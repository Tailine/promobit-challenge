export function joinClassNames(classNames: string[]) {
  return classNames.filter((className) => className !== "").join(" ");
}
