
export const isPrimitive = (value: unknown): value is string | number | boolean => {
  return ["string", "number", "boolean"].includes(typeof value)
}

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === "object"
}

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value)
}

export const printLastWord = (pattern: string) => {
  const words = pattern.split(".")
  const lastWord = words[words.length - 1]
  return lastWord
}

export const showFirst30Characters = (inputString: string) => {
  return inputString.length > 30 ? inputString.substring(0, 30) + "..." : inputString
}

