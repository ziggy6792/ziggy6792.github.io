---
title: "Alpaca Cup"
date: 2021-04-03T22:53:58+05:30
draft: false
github_link: "https://github.com/gurusabarish/hugo-profile"
author: "Simon Verhoeven"
tags:
  - Emoji support
  - Sample
  - example
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

For a deep dive into the original motivations for this project please see [this blog post](/blogs/wakeboard-competition-app).

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

Alpaca Cup is a state of the art web application build by professional web developers with over 10 years' experience. For an in depth dive into the technology behind Alpaca Cup [see this blog post](/)

<!-- {{< figure src="judge scoring.png"
    width="200"
    height="300"
    caotion="Bla bla bla"
    caption-position="center"
    attr="Bla bla bla"
    target="_blank" alt="Lighthouse Amrum" >}}
{{< figure src="judge scoring.png"
    width="200"
    height="300"
    caotion="Bla bla bla"
    caption-position="center"
    attr="Bla bla bla"
    target="_blank" alt="Lighthouse Amrum" >}} -->

## Tools

### Amazon Web Services

Alpaca Cup makes use of several cloud services and tools provided by Amazon Web Services (AWS), which offer;

- High scalability and availability
- Pay as you use payment model (when no competitions are running the cost of running the application will be negligible)
- Many libraries, packages and tools available to do much of the heavy lifting involved in building modern, robust applications

Here are the key AWS tools being utilized;

- [Cloud Development kit](https://aws.amazon.com/cdk/), to rapidly provision and configure cloud services using a CI/CD pipeline
- [Cognito](https://aws.amazon.com/cognito/), to handle user sign up authorization
- [DynamoDB](https://aws.amazon.com/dynamodb/), to provide millisecond response times to API queries for competition and rider data
- [Lambda](https://aws.amazon.com/lambda/), for hosting application api / executing requests serverlessly
- [API Gateway](https://aws.amazon.com/api-gateway/), to handle backend authentication

### Typescript Everywhere

Alpaca Cup is build on the [Typescript Everywhere](https://creativedesignsguru.com/typescript-everywhere/) this makes development much simpler. The stack consist of;

- NodeJS Backend
- ReactJS Frontend
- Infrastructure as Code (AWS CDK)

### NodeJS Backend

The backend is built using NodeJS, which offers;

- Very fast execution times on AWS Lambda
- Great simplicity when working with asynchronous operations. Alpaca Cup has to interface with many AWS services asynchronously (Dynamo DB calls, fetching keys from Secrets Manager, auth requests to Cognito).

Here are the key ReactJS libraries tools being utilized;

- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/) to integrate with AWS services
- [Jest](https://jestjs.io/), to run integration tests that run against a local test db
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to create a GraphQL api for serving requests to fetch and update event/competition data. The main idea is to have only one source of truth by defining the schema using classes and a bit of decorator help.
- [Type GraphQL](https://typegraphql.com/) is a library that extends Apollo Server, removing a lot of boilerplate code and providing a fantastic developer experience. The main idea of Type GraphQL it to use Typescript classes and decorator to provide one source of truth by defining GraphQL schema.
- [Dynamo Easy](https://github.com/shiftcode/dynamo-easy) provides a Object Data Model as an abstraction layer for working with Dynamo DB tables

### ReactJS Frontend

The frontend is built using ReactJS, which offers;

- A robust and flexible approach to handling dynamic content and rich stateful interactions (e.g. managing and rendering competition state)
- A really fun development experience. Many developers, including myself, really enjoy ReactJS programming. This also ensures a rich and growing ecosystem of React libraries and tools to support present and future development
- Potential to create a React Native Mobile App in the future, while reusing (and not replacing) a lot of solution code

Here are the key ReactJS libraries tools being utilized;

- [AWS Amplify](https://docs.amplify.aws/), to connect to cloud resources
- [Jest](https://jestjs.io/), to test critical app components
- [Apollo Client](https://www.apollographql.com/docs/react/), to store api state coming from GraphQL api
- [Redux](https://aws-amplify.github.io/), to store app global state (such as user authentication state)
- [Material UI](https://material-ui.com/), to make use of many out of the box UI components with a common theme and appearance
- [Axios](https://www.npmjs.com/package/axios), to wrap calls to api and apply middleware (such as adding AWS authentication credentials)

### Infrastructure as Code (AWS CDK)

AWS Cloud Development kit is used to rapidly provision and configure cloud services.

Here are the key CDK components being utilized.

- [CDK Stages](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.Stage.html) to configure separate staging and production builds
- [CDK Pipelines](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html) are used to automatically deploy app updates safely in a consistent build environment. Merging to master triggers a staging build which is deployed if all build checks pass (typechecking/lint/build/test). There is then a manual approval step to push deployment to production.

{{< gallery match="infra/*.png" />}}

## Architecture

Here’s a map of the services and tools we are using and how they connect to each-other.

{{< figure src="/images/projects/alpaca/alpaca-cup-architecture.png" link="/images/projects/alpaca/alpaca-cup-architecture.png" title="Alpaca Cup Architecture" >}}

# Impact

{{< youtube cnMjZtYj6us >}}

{{< load-photoswipe >}}
