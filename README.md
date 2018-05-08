# Drafts 5 Template Parser

The Drafts 5 Template Parser scans a Drafts note for template tags, prompts
the user for values, and binds these values to the template. The parser
can be used directly as part of a Drafts action, or it can be imported
as a dependency for use in other projects.

## Example

A common use case for template functionality is sending boilerplate email
messages. Take the following template:

```
Nice to meet you at [[Event]]!
Hi, [[Name]]...

It was great meeting you at [[Event]]. Let's keep in touch.
If there's anything I can do to help [[Company]], please
don't hesistate to reach out to me.

Steve
```

Drafts will scan the note, and prompt the user for values for "Event",
"Name", and "Company". It will then bind these values to the template, and
set the following tag values for use in subsequent action steps:

| Text               | HTML (from Markdown)    | Description                               |
| ------------------ | ----------------------- | ----------------------------------------- |
| `parsed_draft`     | `parsed_draft_html`     | The entire Draft note                     |
| `parsed_title`     | `parsed_title_html`     | The first line of the note                |
| `parsed_body`      | `parsed_body_html`      | Everything but the first line of the note |
| `parsed_selection` | `parsed_selection_html` | The text selected by the user             |
| `parsed_clipboard` | `parsed_clipboard_html` | The contents of the user's clipboard      |

So for our "Email Parsed Template" action, a subsequent step can send an email,
with `[[parsed_title]]` as the subject, and `[[parsed_body_html]]` as the body.

This same pattern can be used for tweets, notes, etc.