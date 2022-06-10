export function fillStringLength(a, b) {
  // if b is longer than a, return spaces to fill it
  const diff = b.length - a.length
  let spaces = ''
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      spaces += ' '
    }
  }
  return spaces
}
