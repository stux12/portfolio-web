# Portfolio Web Agent Rules

## Project intent

This is Kim JinHwan's Korean portfolio site for a full-cycle developer. It presents backend development together with infrastructure, DevOps, database, deployment, and service-operation experience.

The public site is intentionally Korean-first. Keep existing Korean copy unless the requested change requires otherwise.

## Required working style

1. Change only the area requested by the user. Do not redesign unrelated sections.
2. Before editing, inspect the smallest relevant file or component first.
3. After editing, verify only the changed behavior plus the appropriate build checks.
4. Use `apply_patch` for text-file edits. Do not overwrite unrelated user changes.
5. Do not use destructive Git commands such as `reset --hard` or `checkout --`.
6. Keep commits small and describe their purpose clearly.

## Repository map

- `app/page.tsx`: profile, hero, career summary cards, career timeline
- `app/data/projects.ts`: top-page skill groups
- `app/components/project-showcase.tsx`: project cards, flip state, README modal, project data
- `app/components/top-link.tsx`: wordmark and smooth scroll-to-top behavior
- `app/globals.css`: design tokens, layout, responsive behavior, modal styles
- `app/layout.tsx`: SEO, canonical URL, Open Graph and Twitter metadata
- `app/manifest.ts`, `app/icon.svg`: app name and browser icon
- `public/`: company logos and social sharing image assets

## Content rules

- Do not add experience, metrics, projects, or technical claims that are not provided by the user.
- When adding a project, update its `title`, `summary`, `stack`, and all four README sections together.
- Prefer data additions in `projectTemplates` over duplicating card markup.
- Use Korean labels and descriptions. English is appropriate for technology names, product names, filenames, and code.

## Design rules

- Reuse the existing color tokens: `--paper`, `--lavender`, `--mint`, `--peach`, `--blue`, `--ink`.
- Keep the friendly rounded-card visual system. Do not introduce unrelated saturated colors or a new visual language.
- Use white, lavender, mint, or peach as a new card background unless there is an explicit design request.
- Keep the footer as a visually separated neutral-gray area (`#dddcd8`).
- Keep the top navigation sticky.

## Responsive and modal invariants

- Mobile breakpoint: `760px`.
- On mobile, project cards use front/back opacity switching, not 3D `rotateY`; this prevents mirrored front-face text on mobile browsers.
- The first project card has a larger mobile minimum height because it has a long technology stack.
- When the README modal is open, lock page scrolling and allow scrolling only within the modal.
- Keep README architecture cards constrained with `minmax(0, 1fr)`, `max-width: 100%`, and word wrapping so they cannot overflow on mobile.
- Test the project card front/back state, README opening/closing, and modal internal scroll whenever their component or CSS changes.

## SEO and sharing rules

- Production canonical domain: `https://jinhwan-portfolio.vercel.app`.
- Social preview asset: `public/og-jh.png` (`1730 × 909`).
- If the preview image changes, update both `openGraph.images` and `twitter.images` in `app/layout.tsx`.
- KakaoTalk can cache link previews. Verify the deployed `og:image` before diagnosing the site; a cache-busting query string can be used for a fresh share preview.

## Verification and deployment

Run the relevant checks before committing:

```bash
npm run lint
npm run build
git diff --check
```

- `main` pushes deploy automatically to Vercel.
- For public metadata changes, confirm the deployed page exposes the expected canonical URL and Open Graph image.
- Do not claim a deployment is verified unless the deployed output or Vercel status was actually checked.

## Additional documentation

`README.md` is the human-facing maintenance guide. Keep it updated when file ownership, deployment, data-entry format, or user-visible workflow changes materially.
