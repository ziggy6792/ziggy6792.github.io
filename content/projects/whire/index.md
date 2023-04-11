---
title: Whire
date: 2021-04-03T22:53:58+05:30
draft: false
github_link:
author: "Simon Verhoeven"
links:
  - icon: fab fa-whire
    url: https://whire.net/
  - icon: fab fa-linkedin
    url: https://www.linkedin.com/company/whirenet/
tags:
  - Whire
  - Web Dev
  - ReactJS
  - AWS
tech:
  - logo: https://cdn.worldvectorlogo.com/logos/react-1.svg
    name: "React"
    url: "https://react.dev/"
  - logo: https://dev-yakuza.posstree.com/assets/images/category/react/nextjs/background.jpg
    name: "Next"
    url: https://nextjs.org/
  - logo: https://graphql.org/img/logo.svg
    name: "GraphQL"
    url: https://graphql.org/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/200px-Amazon_Lambda_architecture_logo.svg.png
    name: "AWS Lambda"
    url: https://aws.amazon.com/lambda/
  - logo: https://cdn.worldvectorlogo.com/logos/aws-api-gateway.svg
    name: "AWS API Gateway"
    url: https://aws.amazon.com/api-gateway/
  - logo: /images/projects/alpaca/aws-cognito-logo.png
    name: "AWS Cognito"
    url: https://aws.amazon.com/cognito/
  - logo: https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hY2M3M2RiNTFjNmE3NzIxYTIzNDAzNTQ0OWQ4MzgwOT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.xgNJFrB8Tz89BFgDaybQOp1e54UfUv7VeqayL_Piddg
    name: "AWS CDK"
    url: https://aws.amazon.com/cdk/
  - logo: https://seeklogo.com/images/M/mongodb-logo-655F7D542D-seeklogo.com.png
    name: Mongo DB
    url: https://www.mongodb.com/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png
    name: Node JS
    url: https://nodejs.org/en

image: /images/projects/whire/whire.png
demo:
  name: app.whire.net
  url: https://app.whire.net/
description: ""
# toc:
socialShare: true
---

## Introduction

Whire is a Singaporean Tech Startup which helps companies hire great people faster through its platform and a top tier community of hiring ambassadors, saving companies hours on pre-screening and outreach efforts as well as thousands of dollars on job ads and agency fees without compromising candidate quality.

### Motivation

[Benjamin Marsili](https://www.linkedin.com/in/marsilib/) (founder of Whire) hired me to help him build a recruiting network platform for companies to;

- Broadcast jobs from LinkedIn (or other sources)
- Directly interview candidates who are referred members of the Whire network
- Make hiring decisions and then pay for successfully hired candidates

For more information visit [whire.net](https://www.whire.net/)

## My Engagement with Whire

### Initial Phase

Before engaging with me Whire already had 1 fulltime junior developer and a React (Typescript) UI component library consisting of simple UI components and some full screen layouts. The component library was also complete wth Story Book (UI Component Development Library). Up to this point, the component library was primarily used to show potential investors what they were trying to build.

Whire had also started work on a Next.JS web-app using their component library. The app to this point was also for demo purposes only; login/data/integrations were all mocked.

### Phase 1 (2 weeks)

#### Objective

For phase 1, Whire's initial aims were;

- Deploy existing web-app a cost effective and scalable way

#### Architecture

I strongly recommended to deploy to AWS for the following reasons:

- AWS can do a lot of undifferentiated heavy lifting (e.g: Fargate can be used to deploy and scale the web-app without having to do a lot of configuration)
- AWS allows a pay as you use payment model

_Note: Vercel was also considered, however as their was a future plan to integrate other Amazon services it seemed better to keep everything under one roof. Also I had read that Vercel costs are expensive for sites once traffic increases_

I proposed the following AWS architecture to Ben

{{< figure src="/images/projects/whire/whire-architecture-phase-1.png" link="/images/projects/whire/whire-architecture-phase-1.png" title="Whire Architecture Phase 1" >}}

- Web-app is containerized and pushed to ECR
- Web-app deployed managed and auto-scaled using Fargate
- AWS Code pipeline to automatically build/test and deploy code

#### Execution

In order to execute this plan I completed the following steps;

- Restructured the frontend into a mono-repo so that component library and web-app are built and tested independently (using shared extended configurations)
- Added (Jest) tests for web-app and component library
- Wrote a docker compose file to build web-app and component library into an image that could be pushed to Amazon ECR
- Created a CDK stack to deploy the planned architecture to staging and production environments
- Created a CDK pipeline to build, test and deploy the web-app and component library

#### Result

Whire web-app was successfully deployed on AWS

{{< gallery match="gallery-phase-1/*.png" />}}

### Phase 2 (4 weeks)

#### Objective

After successfully deploying their web-app to AWS. For phase 2, Whire's aims were

- Start working on a backend API to store and serve data about jobs and candidates in the whire network
- Create an authentication solution so users could login to Whire

#### Architecture

For building Whire's api I proposed creating a NodeJS GraphQL api in Typescript and deploying it to Lambda. This has the following advantages.

- Building everything in Typescript keeps development simple as skills/knowledge/tools are reusable
- Deploying to Lambda is very cheap and scalable

_Note: AppSync was also considered for the GraphQL api. However I find it very awkward to extend beyond out of the box functionality (thought maybe now it has improved)._

For storing Data I suggested using a serverless MongoDB. A schemaless DB was preferable as data such as job posts coming from different sources can be unstructured.

_Note: The reason for choosing MongoDB and not Amazon's own schemaless DB DynamoDB is that mongo has fantastic Typescript support. Namely, [typegoose](https://typegoose.github.io/typegoose/), an object document model written and managed by MongoDB's creators._

For authenticating users I suggested AWS Cognito for user login along with AWS Api Gateway to authenticate user api requests.

I proposed the following AWS architecture to Ben

{{< figure src="/images/projects/whire/whire-architecture-phase-2.png" link="/images/projects/whire/whire-architecture-phase-2.png" title="Whire Architecture Phase 2" >}}

- GraphQL api built with NodeJS/Apollo Server
- Serverless MongoDB
- AWS Code pipeline to automatically build/test and deploy code

#### Execution

In order to execute this plan I completed the following steps;

- Created a GraphQL api in NodeJS using Apollo Server and TypeGraphQL
- Configured Api Gateway (using CDK) to allow api requests from authenticated cognito users (use access) and allowed IAM roles (role access)
- Created a CDK stack to deploy the planned architecture to staging and production environments
- Created a CDK pipeline to build, test and deploy the api
- Coached Whire's junior developer so he could create his own GraphQL queries and mutations

#### Result

Whire api was successfully built and deployed on AWS

{{< gallery match="gallery-phase-2/*.png" />}}

### Phase 3 (4 weeks)

#### Objective

After successfully deploying their web-app and api to AWS. One of the key features for Whire is referring candidates. For referrals, both the referrer and referee should use LinkedIn to login and share their information.

For phase 3, Whire's aims were;

- Allow users to authenticate with Whire using LikedIn
- Users should be able to login to Whire using their LikedIn credentials
- On logging in for the first time a user should be created in Whire's database
- Users LinkedIn profile information (name, nationality, skills etc...) should be pulled into Whire

{{< load-photoswipe >}}
