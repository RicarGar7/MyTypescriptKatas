import { describe, expect, it } from "vitest"
import { interpolateValuesInTemplate, Replacements } from "./main.js"

describe("Template string", () => {
  it.each([[""], ["Texto sin variable"]])("should do nothing given no interpolations", (template: string) => {
    expect(interpolateValuesInTemplate(template, {})).toEqual(template)
  })

  it.each([
    ["${variable}", { variable: "valor" }, "valor"],
    ["This is a template with one ${variable}", { variable: "foo" }, "This is a template with one foo"],
    [
      "This is a text with a ${variable} to be replaced. \n" +
        "And this is another text with ${other-variable} to be replaced. \n" +
        "And this is another text with ${another-variable} to be replaced.",
      { variable: "value", "other-variable": "other-value", "another-variable": "another-value" },
      "This is a text with a value to be replaced. \n" +
        "And this is another text with other-value to be replaced. \n" +
        "And this is another text with another-value to be replaced.",
    ],
    ["${variable} ${variable} ${variable}", { variable: "foo" }, "foo foo foo"],
  ])(
    "should replace interpolation keys in text with values from dictionary",
    (template: string, dictionary: Replacements, expected: string) => {
      const result = interpolateValuesInTemplate(template, dictionary)
      expect(result).toEqual(expected)
    },
  )

  it.each([
    // ["This is a template with one ${variable}", {}, Exception],
    // ["This is a template with ozne variable", { variable: "foo" }, "This is a template with one variable"],
    ["${variable} ${variable2}", { variable: "foo", variable2: "${variable}" }, "foo ${variable}"],
    ["${variable} ${variable2}", { variable: "${variable2}", variable2: "foo" }, "${variable2} foo"],
  ])("should handle edge cases", (template: string, dictionary: Replacements, expected: string) => {
    const result = interpolateValuesInTemplate(template, dictionary)
    expect(result).toEqual(expected)
  })
})
