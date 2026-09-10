---
title: "miruomo.com"
description: "miruomo's portfolio site"
---

## Service Overview

This is a portfolio site for job hunting and personal branding.
It brings together my projects, background, and links to my tech articles.

Projects I released before are deployed on subdomains, and you can reach each live demo from this site.

![](./figures/app.png)

> **This site is still in development.**

## Why I Made This

I had wanted to make a portfolio site for about 3 years. After I joined Nagaoka University of Technology and NUTMEG, a senior member's site inspired me, and I finally got started.

I didn't want just a list of projects — I wanted a site that shows **who I am**. So I spent real time deciding the design direction first.
I looked at and studied many reference sites, and set the concept: "a portfolio with movement, where skill and personality live together."
I chose the accent color (`#FF301D`) because I like red, and because I wanted it to match the accent color on my business card.

This site is also being built in stages — Phase 1 (MVP launch) and Phase 2 (adding Three.js) — so I designed it with **future changes in mind** from the start.

## Development Flow with Claude

From the design stage to coding, I worked with Claude the whole way.

- **Concept design** — Talked with Claude Chat about reference sites, color choices, and the Three.js animation plan
- **Writing the specs** — Used Claude Chat to generate a design document with wireframes, design tokens, and build steps
- **Coding** — Used Claude Code to write the code

## Why I Chose These Technologies

### Astro + TypeScript
I chose this framework because it's good for a content-first static site.
I liked that I could use React Islands only where I need interaction, so the site sends less unneeded JavaScript.

### React (Islands)
I only used React for interactive parts, like the Works card list.
This follows Astro's design: add React only where it's really needed.

### GSAP
I used this for scroll-based animation.
In Phase 2, I plan to turn on ScrollTrigger and use it to control the Three.js camera object as you scroll.

## Design Choices I Care About

### Building in Phase 1 / Phase 2 stages
I added placeholder components in the Hero and Works sections, so I can add Three.js later (Phase 2) without much rework.
In Phase 2, I only need to swap in `<CameraScene />` to turn on the Three.js camera object.

### The skeleton for i18n
Since I plan to support Japanese and English (Phase 2), I never hardcoded text inside components. Instead, all text goes through `src/i18n/ui.ts` from the start.
In Phase 2, I just need to add the translated text and turn on the config.

### Image optimization
Every image uses Astro's `<Image />` component, which turns images into WebP and adds lazy loading at build time.
