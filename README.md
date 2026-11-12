# Frontend Mentor - Base Apparel coming soon page solution

This is a solution to the [Base Apparel coming soon page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/base-apparel-coming-soon-page-5d46b47f8db8a7063f9331a0).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty
  - The email address is not formatted correctly

### Screenshot

![Desktop layout of the Base Apparel coming soon page](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

**Validation rules as a list.** Instead of a chain of `if`s, each field gets an ordered list of `[test, message]` pairs. A small `validate` function returns the first failing message, or an empty string when everything passes. Adding a rule (or a whole new field, like a password) means adding a line, not rewriting logic:

```js
const emailRules = [
  [(value) => value !== "", "Please provide an email"],
  [(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Please provide a valid email"],
];

function validate(value, rules) {
  for (const [test, message] of rules) {
    if (!test(value)) return message;
  }
  return "";
}
```

- **Order matters:** "empty" is checked before "format", otherwise an empty field would get the less helpful "valid email" message.
- **`for...of`, not `forEach`:** `return` inside `forEach` only ends that callback, so it can't return the first error from `validate`.
- **Trim once, at the call site:** `validate(emailInput.value.trim(), emailRules)`, so input made only of spaces counts as empty and leading or trailing spaces don't break the format check.

**Error state driven by `aria-invalid`.** CSS shows the red border and the error icon with `input[aria-invalid="true"]`, so JS only sets one attribute. My first attempt used `toggleAttribute("aria-invalid", true)`, which adds an attribute with no value, so the selector never matched. `setAttribute("aria-invalid", "true")` fixed it.

**Clearing errors as the user types.** The `input` event fires on every change (including paste and autofill) and bubbles, so one listener on the form hides the error the moment the user starts fixing it. `change` would wait until the field loses focus.

**Regex vs built-in validation.** With `type="email"`, `input.validity.typeMismatch` checks the format with no extra code, but it accepts `jane@example` (no dot), which the HTML spec allows. I wrote my own regex to require a domain with a dot, and to practise hand-writing rules I can reuse for fields that have no built-in type, such as phone numbers or password strength. Either way, front-end checks only catch typos; only a confirmation email proves an address exists.

### AI Collaboration

I use AI as a learning partner to code better, not to skip the learning:

- Used Claude Code to write the HTML and CSS skeleton.
- Used Claude Code to explain the reasoning behind the skeleton's structure.
- Used AI to analyze the product scenario and the key points of the design.
- Wrote all of the JavaScript myself.

## Author

- Website - [Josh Liu](https://my-portfolio-frontend-kappa-lemon.vercel.app/)
- Frontend Mentor - [@JoshLiu111](https://www.frontendmentor.io/profile/JoshLiu111)
