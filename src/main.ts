export type Replacements = { [key: string]: string }

export function interpolateValuesInTemplate(template: string, interpolationValues: Replacements): string {
  for (const [key, value] of Object.entries(interpolationValues)) {
    template = template.replaceAll("${" + key + "}", value)
  }
  return template
}
