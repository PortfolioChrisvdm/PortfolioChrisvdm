# ResolveIQ Accessibility Standard

## Purpose

ResolveIQ must be usable by people with different visual, motor, cognitive, and sensory needs.

Accessibility is a core engineering and product requirement. It must be considered during design, implementation, testing, and review.

The initial target is alignment with WCAG 2.2 Level AA where applicable.

---

# Core Requirements

ResolveIQ must provide:

* Keyboard-accessible controls
* Visible focus indicators
* Semantic HTML
* Clear labels
* Readable typography
* Sufficient colour contrast
* Reduced-motion support
* Screen-reader-friendly structure
* Useful validation messages
* Predictable navigation
* Non-colour status indicators

---

# Visual Comfort

ResolveIQ is intended for long working sessions.

The interface must avoid:

* Flashing content
* Blinking controls
* Strobe effects
* Rapid colour changes
* Repeated pulsing animation
* Bright neon colours
* Large areas of saturated colour
* Harsh pure-white backgrounds
* Tiny low-contrast text
* Unnecessary decorative motion

Dark mode will be the initial default theme.

Dark surfaces should use muted charcoal, slate, and blue-grey tones rather than pure black.

---

# Photosensitive Safety

ResolveIQ must not include content that flashes or changes brightness rapidly.

No component may:

* Flash repeatedly
* Produce alternating high-contrast colours
* Use strobing loading indicators
* Pulse continuously to demand attention
* Animate warning states indefinitely

Critical status must be communicated using stable text, icons, and restrained colour.

---

# Reduced Motion

ResolveIQ must respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

* Non-essential animations must be disabled
* Smooth scrolling should be disabled
* Large transitions should be removed
* Repeated motion should stop
* Loading indicators should remain subtle

Animations must never be required to understand content.

---

# Typography

Initial typography requirements:

* Body text should normally be at least 16px
* Supporting text should normally be at least 14px
* Text must support browser zoom
* Line height should remain comfortable
* Long text should not be forced into narrow columns
* Font weight must not replace proper hierarchy
* Uppercase text should be used sparingly

Important information must not rely on extremely light font weights.

---

# Colour and Contrast

Colour must never be the only way to communicate meaning.

Examples:

Bad:

```text
Red background only
```

Better:

```text
Error: Password is required
```

Status indicators should include:

* Text
* An icon where useful
* A restrained supporting colour

The design system must test contrast for:

* Body text
* Secondary text
* Buttons
* Links
* Form controls
* Focus indicators
* Status badges
* Disabled controls
* Error messages

---

# Keyboard Access

All core workflows must be operable using a keyboard.

Interactive controls must:

* Be reachable using Tab
* Follow a logical order
* Support Enter or Space where appropriate
* Display a visible focus state
* Avoid keyboard traps
* Return focus correctly after dialogs close

Custom controls must not replace native HTML controls unless there is a clear reason.

---

# Focus Indicators

Focus indicators must be clearly visible against every supported background.

They must not rely on a subtle colour change alone.

Focus styles should:

* Use sufficient contrast
* Surround or underline the focused element clearly
* Remain visible in dark mode
* Avoid causing significant layout movement

Focus indicators must not be removed without an accessible replacement.

---

# Forms

Every form control must have a persistent visible label.

Placeholder text must not be the only label.

Forms should provide:

* Clear field labels
* Required indicators
* Help text where necessary
* Specific error messages
* Error summaries for complex forms
* Logical field order
* Keyboard-friendly controls

Error messages must explain what happened and how to fix it.

Bad:

```text
Invalid input
```

Better:

```text
Enter a valid email address, such as name@example.com.
```

---

# Buttons and Links

Buttons must describe actions.

Examples:

* Create case
* Save changes
* Assign technician
* Delete comment
* Close case

Avoid unclear labels such as:

* Go
* Execute
* Process
* Submit

Links should describe their destination.

Avoid repeated links labelled only:

```text
Click here
```

Important icon buttons must include an accessible name.

---

# Navigation

Navigation must remain predictable.

ResolveIQ should provide:

* Clear page titles
* Logical heading structure
* Consistent navigation placement
* Current-page indication
* Skip navigation support when appropriate
* Breadcrumbs for deeply nested areas where useful

Navigation items should not change position unexpectedly.

---

# Screen Readers

Pages must use semantic structure.

Use:

* `header`
* `nav`
* `main`
* `section`
* `article`
* `aside`
* `footer`

Headings must follow a logical hierarchy.

Interactive elements must expose:

* Accessible name
* Role
* State
* Description where needed

Decorative icons must be hidden from assistive technology.

---

# Tables

Data tables must include:

* Proper column headers
* Clear captions or surrounding headings
* Keyboard-accessible actions
* Text equivalents for status colours
* Comfortable row heights
* Responsive behaviour

Complex tables should support simplified mobile or card views when appropriate.

---

# Dialogs

Dialogs must:

* Receive focus when opened
* Keep keyboard focus inside while active
* Close using Escape where appropriate
* Have an accessible title
* Return focus to the triggering control
* Clearly identify destructive consequences

Users must not lose unsaved work without warning.

---

# Notifications

Notifications must not rely only on visual changes.

Important notifications should:

* Use clear text
* Be announced appropriately to assistive technology
* Remain visible long enough to understand
* Avoid repeated animation
* Avoid automatically disappearing when action is required

---

# Error Handling

Errors must be understandable.

Every error should answer:

1. What happened?
2. What can the user do next?

Avoid exposing technical stack traces or internal codes without explanation.

Where a technical reference is useful, show it as supporting information.

Example:

```text
We could not save the case. Try again.

Reference: REQ-83F12
```

---

# Touch Targets

Interactive controls should provide comfortable target sizes.

Small icon-only controls should be avoided for important actions.

Touch targets must have enough spacing to reduce accidental activation.

---

# Responsive Accessibility

Responsive layouts must preserve:

* Reading order
* Keyboard order
* Labels
* Status meaning
* Visible focus
* Primary actions

Content must not become inaccessible when columns collapse or navigation changes.

---

# User Preferences

Future versions should support:

* Adjustable font size
* Interface density settings
* Reduced-colour mode
* Higher-contrast theme
* Light theme
* Reduced motion
* Saved accessibility preferences

These preferences should be stored per user where possible.

---

# Testing Requirements

Accessibility testing will include:

* Keyboard-only navigation
* Browser zoom
* Reduced-motion mode
* Screen-reader spot checks
* Colour-contrast checks
* Responsive layout checks
* Automated accessibility tooling
* Manual review of important workflows

Automated tools do not replace manual testing.

---

# Accessibility Review Checklist

Before approving a component or page, confirm:

* Can it be used with a keyboard?
* Is the focus indicator visible?
* Are controls clearly labelled?
* Is the text comfortably readable?
* Is status understandable without colour?
* Is motion restrained?
* Does reduced-motion mode work?
* Are errors specific and helpful?
* Is the heading structure logical?
* Are icons accessible?
* Does browser zoom preserve usability?
* Is flashing content absent?
* Is the mobile reading order correct?

If any answer is no, the implementation must be revised.
