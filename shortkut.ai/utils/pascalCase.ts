const pascalCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}

export default pascalCase
