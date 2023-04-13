---
title: "Alpaca Cup Architecture"
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
  - logo: https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hY2M3M2RiNTFjNmE3NzIxYTIzNDAzNTQ0OWQ4MzgwOT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.xgNJFrB8Tz89BFgDaybQOp1e54UfUv7VeqayL_Piddg
    name: "AWS CDK"
    url: https://aws.amazon.com/cdk/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png
    name: Node JS
    url: https://nodejs.org/en

image: /images/posts/alpaca-cup-architecture/alpaca-web-developer.png
demo:
  name: alpacacup.com
  url: https://alpacacup.com
description: ""
# toc:
socialShare: true
---

## Introduction

This article shows an overview of the technology and architecture behind [Alpaca Cup](https://alpacacup.com/events), an event management application for hosting and scoring competitions.

To try the Alpaca Cup yourself, visit [alpacacup.com](https://alpacacup.com/).

### Related Articles

- Click [here](/projects/alpaca-cup) for introduction and overview of app features
- Click [here](/blogs/wakeboard-competition-app) for deep dive into the original motivations for this project

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
- [LocalStack](https://docs.localstack.cloud/), to run a local DynamoDB database (deployed to a docker container using CDK)

{{< gallery match="gallery-aws/*.png" />}}

## Typescript Everywhere

Alpaca Cup is build on the [Typescript Everywhere](https://creativedesignsguru.com/typescript-everywhere/) stack this makes development much simpler. The stack consist of;

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
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to create a GraphQL api for serving requests to fetch and update event/competition data.
- [Type GraphQL](https://typegraphql.com/) is a library that extends Apollo Server, removing a lot of boilerplate code and providing a fantastic developer experience. The main idea of TypeGraphQL it to use Typescript classes and decorators to provide one source of truth by defining GraphQL schema.
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

{{< gallery match="gallery-react-app/*.png" />}}

### Infrastructure as Code (AWS CDK)

AWS Cloud Development kit is used to rapidly provision and configure cloud services.

Here are the key CDK components being utilized.

- [CDK Stages](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.Stage.html) to configure separate staging and production builds
- [CDK Pipelines](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html) are used to automatically deploy app updates safely in a consistent build environment. Merging to master triggers a staging build which is deployed if all build checks pass (typechecking/lint/build/test). There is then a manual approval step to push deployment to production.

{{< gallery match="infra/*.png" />}}

## Architecture

Here’s a map of the services and tools we are using and how they connect to each-other.

{{< figure src="/images/projects/alpaca/alpaca-cup-architecture.png" link="/images/projects/alpaca/alpaca-cup-architecture.png" title="Alpaca Cup Architecture" >}}

{{< load-photoswipe >}}
