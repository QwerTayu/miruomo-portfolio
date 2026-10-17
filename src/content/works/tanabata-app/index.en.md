---
title: "Tanabata Online Tanzaku"
description: "An icebreaker web app where everyone writes tanzaku wishes and hangs them up, no login needed"
---

## Service Overview

This is a web app for icebreakers at in-person study groups and meetings. You write Tanabata wishes on paper strips (tanzaku) online and hang them up together.
There is no login screen. You just enter a nickname and a 6-character room key to join a "room."
Your tanzaku shows up on a shared board as a card with vertical text, and when people send likes with the heart, the card starts to glow.

![](./figures/app.png)

The person who creates a room is the admin. They can share the room with a QR code, show or delete tanzaku, and change the posting limits.

![](./figures/app2.png)

## Why I Made This

I wanted to run a Tanabata event as an icebreaker at my computer club's meeting, where everyone writes tanzaku on the day of Tanabata.
I saw an article about a Tanabata event made by hand with a form tool and a design tool.
I thought that if I turned it into one web app, I could create an experience where tanzaku get hung up in real time, right there in the room.

My goal was to finish it in six hours on the day, so the first version was simple: no auth and only the free tier.
After we used it in a real meeting, we decided to open it to people outside the club, so in October 2026 I rebuilt it as v2 with stronger protection against cheating.

## Why I Chose These Technologies

### Next.js + TypeScript + Tailwind CSS
I chose a setup I was used to, so I could finish in six hours.
There are three screens — top, participant, and admin — and the room key is used directly in the URL (`/{roomId}`, `/{roomId}/admin`).

### Firebase (Firestore + Anonymous Auth)
I used Firestore's `onSnapshot` to show new tanzaku in real time without writing a server.
The app reads and writes only from the Firebase client, with no API Routes or `firebase-admin`.
In v2, I added Anonymous Authentication so each browser gets an ID that can't be faked, still without a login screen.

## What I Cared About Most

### A Tanabata look and feel
Tanzaku text is shown vertically with `writing-mode: vertical-rl`, and you can pick a red, yellow, or blue tanzaku when you post.
The more likes a tanzaku gets, the more it glows, so you can see popular wishes at a glance.

### A "reveal" toggle to stay in the free tier
Until the admin presses "Show to everyone," participants only subscribe to their own tanzaku.
If everyone kept subscribing to every tanzaku, Firestore reads would add up, so this keeps the app within the free Spark plan.
It also makes a nice moment: when the admin reveals, everyone else's tanzaku appear on all screens in real time.

### Easy sharing on the spot
From "Share" on the admin screen, you can show the room key in large text along with a QR code for the join link.
The QR code is made in the browser with `qrcode.react`, without any external API.

## Problems I Faced

### The posting and like limits could be bypassed
In the first version, the limits — up to 5 tanzaku per person and up to 3 likes per tanzaku — were only counted in localStorage.
Anyone could get past them by editing the values in developer tools, and the Firestore rules were fully open, so I rebuilt it before opening it outside the club.

In v2, the poster ID is the Anonymous Auth `uid`. Post and like counters go up by one in the same transaction that creates the tanzaku, and the Firestore security rules check those values.
To block a trick where one batch write raises the counter once but creates many tanzaku, I fixed each tanzaku's document ID to `{uid}__{counter value}`.
I wrote tests for the rules and ran them on the Firestore emulator.
