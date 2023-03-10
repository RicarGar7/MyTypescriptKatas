## MarkDown Kata

This is the final piece of the course, here the attendees will be able to put all the concepts in action and check how to work with TDD, TPP, Unit tests, Integration tests, Mock and Software Design.

- **Estimated time:** 3 hours
- **Format:** Pairs

### The Problem

The goal is to implement a command line tool that takes a markdown file and returns another markdown file, applying certain transformations to the text.

```
$ markdown-transform link2footnote source.md destination.md
```

The first transformation is to turn links into footnotes. The syntax of a link is this:

```
[visible text link](url)
```

The syntax of a footnote is the following:

```
visible text link [^anchor1]

[^anchor1]: url or text
```

The goal is to make conversions like the following:

Source:

```
[this book](https://codigosostenible.com) and some other text
and some other text line.
```

# TypeScript Kata Setup

Includes:

- 💬 TypeScript
- ✅ Vitest
- 💅 Prettier

> Mixture from [LeanMind](https://github.com/lean-mind/typescript-boilerplate)'s & [Acid Tango](https://gitlab.com/acid-tango/boilerplates/typescript) boilerplates
