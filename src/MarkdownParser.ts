class FooterElement {
  key: string
  value: string

  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }

  toString = () => {
    return `${this.key}: ${this.value}`
  }
}

export function markdownParser(text: string): string {
  const hasNoText = text.length == 0
  if (hasNoText) {
    return text
  }
  if (!hasLink(text)) {
    return text
  }

  let counter = 1
  let body: string = ""
  let footer: string = ""
  while (text.length > 0 && hasLink(text)) {
    const preAnchorText = text.substring(0, text.indexOf("["))
    const label = text.substring(text.indexOf("[") + 1, text.indexOf("]"))
    const link = text.substring(text.indexOf("(") + 1, text.indexOf(")"))
    let anchorLabel = `[^anchor${counter}]`
    const existsLink = footer.includes(link)
    if (existsLink) {
      const indexLink = footer.indexOf(link)
      anchorLabel = `[^anchor${footer[indexLink - 4]}]`
    } else {
      footer += `\n${anchorLabel}: ${link}`
      counter++
    }
    body += `${preAnchorText}${label} ${anchorLabel}`
    text = text.substring(text.indexOf(")") + 1)
  }

  return body + text + footer
}

const hasLink = (text: string) => text.indexOf("[") != -1

// Buscar diferencia ++num, num++
