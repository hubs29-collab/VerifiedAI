## Packages
(none needed)

## Notes
Uses next-themes (already installed) for light/dark toggle via a tiny ThemeProvider wrapper.
SEO handled via document.title + meta/OG tag updates (no react-helmet dependency).
Fetches Site Config from GET /api/site-config (expected to return { name, tagline }).
All interactive/meaningful elements include data-testid attributes.
