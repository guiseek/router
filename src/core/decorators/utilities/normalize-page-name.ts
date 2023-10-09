const LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM'

export function normalizePageName(rawName: string) {
  const name = rawName.replace('Element', '')
  const chars = name.split('')

  const formattedName = chars.reduce((prev, curr, i) => {
    const index = LETTERS.indexOf(curr) > 0 && i > 0
    return (prev += index ? '-' : '') + curr
  }, '')

  const hasDivider = formattedName.indexOf('-') > 0

  const normalizedName = !hasDivider ? formattedName + '-page' : formattedName

  return normalizedName.toLowerCase()
}
