---
title: "Alpaca Cup"
date: 2021-04-03T22:53:58+05:30
draft: false
github_link: "https://github.com/gurusabarish/hugo-profile"
author: "Simon Verhoeven"
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
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png
    name: Node JS
    url: https://nodejs.org/en

image: /images/projects/alpaca/alpaca.png
demo: https://alpacacup.com/events
description: ""
# toc:
socialShare: false
---

## Introduction

[Alpaca Cup](https://alpacacup.com/events) is an event management application for hosting and scoring competitions. So far the app has been used exclusively for waterboarding competitions in Singapore, however we hope that it may be used in other extreme sports in the future (such as skateboarding) or indeed any competition that has a suitable format.

The App serves 2 main purposes;

1. Sharing event information (who is in each round, when rounds start, who progress to the next round)
2. Sharing results for each round in realtime (i.e: live scores as they are entered by judges)

### Related Articles

- Click [here](/blogs/alpaca-cup-architecture) for deep dive into the technology behind Alpaca Cup
- Click [here](/blogs/wakeboard-competition-app) for deep dive into the original motivations for this project

## Features

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

Alpaca Cup is a state of the art web application build by professional web developers each with over 20 years' combined experience. For an in depth dive into the technology behind Alpaca Cup [see this article](/blogs/alpaca-cup-architecture/).

## Impact

See Alpaca Cup in action at the 2023 Embily Open Waterboarding Competition Live steam.

{{< youtube cnMjZtYj6us >}}

{{< load-photoswipe >}}
