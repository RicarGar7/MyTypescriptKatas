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
  let footer: FooterElement[] = []
  while (text.length > 0 && hasLink(text)) {
    const preAnchorText = text.substring(0, text.indexOf("["))
    const label = text.substring(text.indexOf("[") + 1, text.indexOf("]"))
    const link = text.substring(text.indexOf("(") + 1, text.indexOf(")"))
    const index = footer.findIndex((e) => e.value === link)
    const existsInFooter = index > -1
    if (existsInFooter) {
      body += `${preAnchorText}${label} ${footer[index].key}`
    } else {
      const anchorLabel = `[^anchor${counter}]`
      body += `${preAnchorText}${label} ${anchorLabel}`
      footer.push(new FooterElement(anchorLabel, link))
      counter++
    }
    text = text.substring(text.indexOf(")") + 1)
  }

  return body + text + "\n" + footer.map((element) => element.toString()).join("\n")
}

const hasLink = (text: string) => text.indexOf("[") != -1

// Buscar diferencia ++num, num++
