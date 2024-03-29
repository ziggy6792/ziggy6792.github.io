---
title: "Wakeboard Competition App Project"
date: 2020-03-19T09:07:48+07:00
authors:
  - Simon Verhoeven
authorbox: true
image: /images/posts/wakeboard-competition-app/wakeboard-bw.jpg

# thumbnail: "img/placeholder.jpg" # Optional, thumbnail
# lead: "EKS in a Terraform way"
toc: true # Optional, enable Table of Contents for specific post
categories:
  - "Web Development"
tags:
  - Alpaca Cup
  - Web Dev
  - ReactJS
  - AWS
menu: side # Optional, add page to a menu. Options: main, side, footer

draft: false
description:
summary: "A short write up the Wakeboard Competition Management App; motivation, requirements, tools and design."
---

## Introduction

<!-- ### About Us

Simon + Vincent -->

### Motivation

Cable Wakeboarding is an extreme water sport where participants (riders) are pulled (at speeds of 30+ kph) around a lake by an overhead cable (very similar to a cable car system). Much like skate parks, wake parks have obstacles (such as jumps and rails) built along the cable path. In competition, riders are judged subjectively on their ability to perform ticks (such as flips) both on and off these obstacles. There are 700+ Wakeparks in the world (60+ in Asia).

[Singapore Wakepark](http://www.singaporewakepark.com/home/) (SWP) and other parks host about 4 competitions per year with an average turn out of 100 riders and 300 spectators with a SGD 60 admission fee. A typical competition consists of several disciplines (e.g. “Men’s Beginner”) containing rounds and heats (e.g. “Round 2 - Semi Final 1”). Riders are scored and ranked in each round, hoping to progress to the final, where the top 3 are awarded a price (1st place upwards of SGD 1000).

For competition organizers there are currently 2 options when it comes to managing a competition;

1. Pay a federation like the IWWF to manage the competition and use their event management system. Disadvantages;
   - Yearly member subscription fees
   - Percentage taken from rider admission fees
   - Can only use judges affiliated with the federation (sometimes judges need to be flown in at an expense to the park)
   - Little control over the structure of competition
   - The applications provided by federations are not very good; not mobile optimized, results are not pushed automatically (need to refresh page), results are not real-time
2. Manage the competition on your own. Receiving admissions by email, manually creating heat tables using excel, sharing screen shots of start lists on Facebook, then printing round results and pinning them on a notice board. Disadvantages;
   - Very time consuming and rigid format
   - Very little feedback to interested parties on the state of the competition as it takes place (e.g. current round results, next round start list)

### Our Goals

We are building a web application to be used by organizers, riders, judges and spectators with the following goals;

- Provide a cheap, intuitive and flexible workflow to organizers for creating and hosting competitions
- Give maximum control to organizers over their competition structure (number of disciplines, number of heats per round etc.)
- Give real-time monitoring metrics to interested parties. E.g. how long will a competition take, is it running behind schedule (adverse weather can delay a schedule)
- Give real-time feedback to interested parties on the state of a competition (e.g: how many points the current rider needs to proceed to the next round). This is particularly useful for competition commentators who rely on this real-time information to keep the spectators engaged and excited.

## Solution

### Our Stakeholders

All those involved in Wakeboard Competitions;

- Organizers e.g. Singapore Wakepark Owner
- Riders
- Spectators (mostly the families of riders, especially younger riders who often have a whole family to support them)
- Judges

### Requirements

After talking to our stakeholders, here are some of the key features of the app we are building;

- As an organizer I want to create competitions and heats
- As an organizer I want to assign starting [seeds](<https://en.wikipedia.org/wiki/Seed_(sports)>) to riders
- As an organizer I want to allocate registered riders into the first round [heats](https://www.merriam-webster.com/dictionary/qualifying%20heat)
- As a rider I want to sign up to a competition
- As a rider I want to see all the competitions and heats I am assigned to
- As a rider I want to track my overall progression in real-time (as soon as a result comes in from the judges I should receive a notification with my updated place on the scoreboard)
- As a judge I want to see the current heat I am scoring
- As a judge I want to be able to input scores for riders as they compete
- As a judge I want to be able to end a heat and have riders allocated automatically to the next round (based on the competition structure defined by the organizer)
- As a user I want to track the overall progression of all riders in real-time
- As a user I want to see real-time metrics. E.g. is a competition running behind schedule
