# Moozie's Blog

This repository contains the source for my personal blog, built with Hexo and deployed via GitHub Pages.

## Stack

- Hexo 7
- NexT theme
- GitHub Pages
- GitHub Actions for deployment

## Local development

Install dependencies:

```bash
npm install
```

Start the local preview server:

```bash
npm run server
```

The default local address is [http://localhost:4000](http://localhost:4000).

## Build

Clean generated files and build the site:

```bash
npm run clean
npm run build
```

Generated static files will be written to `public/`.

## Deployment

This blog is deployed through GitHub Actions.

- Push to `main`
- GitHub Actions builds the site
- GitHub Pages publishes the `public/` artifact

The old `gh-pages` branch and `.deploy_git` workflow are no longer used.
