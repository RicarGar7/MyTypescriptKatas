import { describe, expect, it } from "vitest"
import { markdownParser } from "./MarkdownParser.js"

/*
Use cases

Parts
  Parse anchor and no anchor text
    handle no anchor
      "texto sin anchor" -> "texto sin anchor"
    Parse anchor and write footer
      "[este libro](https://codigosostenible.com)" -> "este libro [^anchor1]\n[^anchor1]: https://codigosostenible.com"
    With previous no anchor text
      "se puede encontrar en [este libro](https://codigosostenible.com)" -> "se puede encontrar en este libro [^anchor1]\n[^anchor1]: https://codigosostenible.com"
    N times
      "[este libro](https://codigosostenible.com) y [este otro](https://otroLibro.com)" -> "este libro [^anchor1] y este otro [^anchor2]\n[^anchor1]: https://codigosostenible.com\n[^anchor2]: https://otroLibro.com"
    Attatch last no anchor text
      "[este libro](https://codigosostenible.com) y [este otro](https://otroLibro.com) son los mejores" -> "este libro [^anchor1] y este otro [^anchor2]\n[^anchor1]: https://codigosostenible.com son los mejores\n[^anchor2]: https://otroLibro.com"
    handle same anchor
      "[este libro](https://codigosostenible.com) [este mismo](https://codigosostenible.com)" -> "este libro [^anchor1] este otro [^anchor1]\n[^anchor1]: https://codigosostenible.com"

 Patrón body
  bucle -> (preNoAnchorText + (ParsedAnchorText + [^anchor + index])) + postNoAnchorText + footer

  Patrón footer
  bucle -> (separator + [^anchor + index]: url + separator)
 */

type MarkdownTestParam = { in: string; out: string }
const params: Record<string, MarkdownTestParam> = {
  "handle empties": {
    in: "",
    out: "",
  },
  "handle no anchor": {
    in: "texto sin anchor",
    out: "texto sin anchor",
  },
  "parse anchor and write footer": {
    in: "[este libro](https://codigosostenible.com)",
    out: "este libro [^anchor1]\n[^anchor1]: https://codigosostenible.com",
  },
  "with previous no anchor text": {
    in: "se puede encontrar en [este libro](https://codigosostenible.com)",
    out: "se puede encontrar en este libro [^anchor1]\n[^anchor1]: https://codigosostenible.com",
  },
  "n times": {
    in: "se puede encontrar [este libro](https://codigosostenible.com) y [este otro](https://otroLibro.com)",
    out: "se puede encontrar este libro [^anchor1] y este otro [^anchor2]\n[^anchor1]: https://codigosostenible.com\n[^anchor2]: https://otroLibro.com",
  },
  "attach last no anchor text": {
    in: "se puede encontrar [este libro](https://codigosostenible.com) y [este otro](https://otroLibro.com) son los mejores",
    out: "se puede encontrar este libro [^anchor1] y este otro [^anchor2] son los mejores\n[^anchor1]: https://codigosostenible.com\n[^anchor2]: https://otroLibro.com",
  },
  "handle same anchor": {
    in: "se puede encontrar [este libro](https://codigosostenible.com) y [este libro](https://codigosostenible.com) son los mejores",
    out: "se puede encontrar este libro [^anchor1] y este libro [^anchor1] son los mejores\n[^anchor1]: https://codigosostenible.com",
  },
  "handle same anchor on non consecutive positions": {
    in: "se puede encontrar [este libro](https://codigosostenible.com) y [este otro](https://whenever.com) y [este libro](https://codigosostenible.com) son los mejores",
    out: "se puede encontrar este libro [^anchor1] y este otro [^anchor2] y este libro [^anchor1] son los mejores\n[^anchor1]: https://codigosostenible.com\n[^anchor2]: https://whenever.com",
  },
}

describe("Markdown cli", () => {
  function expectParam(param: MarkdownTestParam) {
    expect(markdownParser(param.in)).toBe(param.out)
  }

  it("should parse a received markdown file by command line", () => {
    //ToDo
  })

  describe("parser", () => {
    it("handle no anchor text", () => {
      expectParam(params["handle empties"])
      expectParam(params["handle no anchor"])
    })
    it("parse anchor and footer", () => {
      expectParam(params["parse anchor and write footer"])
      expectParam(params["with previous no anchor text"])
      expectParam(params["n times"])
      expectParam(params["attach last no anchor text"])
    })
    it("handle repeated links", () => {
      expectParam(params["handle same anchor"])
      expectParam(params["handle same anchor on non consecutive positions"])
    })
  })
})
