---
title: "Alpaca Cup"
date: 2023-02-01T22:53:58+05:30
draft: false
github_link: "https://github.com/gurusabarish/hugo-profile"
author: "Simon Verhoeven"
links:
  - icon: fab fa-instagram
    url: https://www.instagram.com/thealpacacup/
tags:
  - Alpaca Cup
  - Web Dev
  - ReactJS
  - AWS
tech:
  - logo: https://cdn.worldvectorlogo.com/logos/react-1.svg
    name: "React"
    url: "https://react.dev/"
  - logo: https://graphql.org/img/logo.svg
    name: "GraphQL"
    url: https://graphql.org/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/200px-Amazon_Lambda_architecture_logo.svg.png
    name: "AWS Lambda"
    url: https://aws.amazon.com/lambda/
  - logo: https://cdn.worldvectorlogo.com/logos/aws-api-gateway.svg
    name: "AWS API Gateway"
    url: https://aws.amazon.com/api-gateway/
  - logo: /images/projects/alpaca/dynamo-db.png
    name: "AWS DynamoDB"
    url: https://aws.amazon.com/dynamodb/
  - logo: /images/projects/alpaca/aws-cognito-logo.png
    name: "AWS Cognito"
    url: https://aws.amazon.com/cognito/
  - logo: https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hY2M3M2RiNTFjNmE3NzIxYTIzNDAzNTQ0OWQ4MzgwOT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.xgNJFrB8Tz89BFgDaybQOp1e54UfUv7VeqayL_Piddg
    name: "AWS CDK"
    url: https://aws.amazon.com/cdk/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png
    name: Node JS
    url: https://nodejs.org/en

image: /images/projects/alpaca/alpaca.png
demo:
  name: alpacacup.com
  url: https://alpacacup.com
description: ""
# toc:
socialShare: true
---

## Introduction

[Alpaca Cup](https://alpacacup.com/events) is an event management application for hosting and scoring competitions. The app has already been used in wakeboarding and wakeskating competitions all over the world, and we hope to branch out in other extreme sports in the future (such as skateboarding).

Alpaca Cup serves 2 main purposes;

1. Sharing event information (who is in each round, when rounds start, who progress to the next round)
2. Sharing results for each round in realtime (i.e: live scores as they are entered by judges)

To try the Alpaca Cup yourself, visit [alpacacup.com](https://alpacacup.com/).

### Related Articles

- Click [here](/blogs/alpaca-cup-architecture) for deep dive into the technology behind Alpaca Cup
- Click [here](/blogs/wakeboard-competition-app) for deep dive into the original motivations for this project

## Features

Alpaca Cup's main features are;

- **RealTime Updates:** All event data; competitor positions, scores, rankings, heat allocations and more is updated in realtime.
- **Live Scoring:** Competition judges enter scores in a collaborative realtime draft table before publishing. Competitors/spectators can see their scores live (immediately after judge confirmation).
- **Live Broadcast Integration:** Providing overlay screens that can be used in event live streams (e.g: using [vMix](https://www.vmix.com/))
- **Competition Building:** Event organizers can build and edit their own competitions.
- **Event Timetable:** Event organizers can organize competition rounds into a timetable and schedule custom items (such as registration and prize ceremony).
- **Responsive Mobile First Design:** Looks great on all devices.
- **Social Integration:** Users can login using Facebook.
- **Score export and backup:** Competition scores are backed up and exported to google sheets.

{{< gallery match="gallery-features/*.{jpg,png}" />}}

## Useful Terms

| Term        | Description                                                                                                                                                    | Example                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Event       | An event is put on by an organizer and usually takes place over 1 or 2 days.                                                                                   | [Embily Open 2023](https://alpacacup.com/event/embily)                                        |
| Competition | Events consist of competitions/disciplines.                                                                                                                    | [Pro Men](https://alpacacup.com/competition/3f662283-b47e-48f8-915f-bfca763ebe0b)             |
| Round       | Competitions consist of rounds. Each round will contain fewer riders than the previous. The final round winners are the competition winners.                   | [Pro Men - Round 1](https://alpacacup.com/competition/3f662283-b47e-48f8-915f-bfca763ebe0b)   |
| Heat        | Rounds consist of heats. The winners of each heat will progress to the next round.                                                                             | [Pro Men - Round 1 - Heat 1](https://alpacacup.com/heat/7d6602e7-9f48-43de-999e-09c61a0431e3) |
| Seed        | A seed is a preliminary ranking given to competitors the purposes of making a fair competition. I.e: so that the best 2 competitors do not face off in round 1 | 1                                                                                             |

Alpaca Cup has 3 main types of users (user roles)

1. Competitors / Spectators
1. Event Administrators
1. Judges. There are usually 3 judges for each heat.

### Competitors / Spectators

Competitors / Spectators use the app to see the overall competition structure (number of rounds, how many qualify to the next round etc..).

{{< gallery match="gallery-competitors/*.png" />}}

### Event Administrators

Event Administrators use the app to build and manage events.

{{< gallery match="gallery-event-administrators/*.png" />}}

### Judges

Judges use the app score competitors. Judge scoring is a collaborative process and every judge is able to see how other judges are scoring in realtime. Once the judges agree, the scores my be checked by an administrator before becoming public.

{{< gallery match="gallery-judges/*.png" />}}

## Architecture

Alpaca Cup is a state of the art web application build by professional web developers with over 20 years' combined experience. For an in depth look into the technology behind Alpaca Cup [see this article](/blogs/alpaca-cup-architecture/).

## Development Team

- [Simon](https://www.linkedin.com/in/simonverhoeven067/): system design, architecture, backend, frontend
- [Lorenzo](https://www.linkedin.com/in/lorenzoong/): frontend, ui/styling wizard

## Impact

> 42 live competitions completed

> Average 1000 active users per event

See Alpaca Cup in action at Brezel Wakeboard Contest 2023

{{< youtube o4QmmCv05Ec >}}

See Alpaca Cup in action at the 2023 Embily Open

{{< youtube cnMjZtYj6us >}}

{{< load-photoswipe >}}
