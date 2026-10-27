# Digital Bloom repository instructions

## Required change reports

After every Digital Bloom website update, append the complete change report to
`/workspaces/digital-bloom/audit.md` before sending the final response. This
requirement applies to every future Codex session working in this repository.

Each entry must include:

- Date and time, including the time zone (use UTC unless requested otherwise).
- Summary of changes.
- Files modified or created.
- Features or pages affected.
- Tests performed and their results. State explicitly when checks were not run.
- Outstanding issues or next steps, or an explicit statement that there are none.

Use the same information in the audit entry and the final response to the user.
Keep the report complete: include meaningful limitations, failed checks, and
unresolved issues when relevant. Do not claim tests passed without running them.
Append entries in chronological order without overwriting, truncating, or
replacing previous entries. Create `audit.md` if it does not exist.

## Commits and pushes

Do not commit or push unless the user explicitly requests it. Editing files and
running checks do not authorize a commit or push.
