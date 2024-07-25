---
title: "TypeScript Journey - Web Series"
date: 2024-01-20T22:53:58+05:30
draft: false
github_link: "https://github.com/gurusabarish/hugo-profile"
author: "Simon Verhoeven"
tags:
  - Web Series
  - TypeScript
  - Next
  - AWS
  - Cloud Development Kit
  - SST
tech:
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/250px-Typescript_logo_2020.svg.png
    name: "TypeScript"
    url: https://www.typescriptlang.org/
  - logo: https://cdn.worldvectorlogo.com/logos/react-1.svg
    name: "React"
    url: "https://react.dev/"
  - logo: https://dev-yakuza.posstree.com/assets/images/category/react/nextjs/background.jpg
    name: "Next"
    url: https://nextjs.org/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/200px-Amazon_Lambda_architecture_logo.svg.png
    name: "AWS Lambda"
    url: https://aws.amazon.com/lambda/
  - logo: /images/projects/alpaca/aws-cognito-logo.png
    name: "AWS Cognito"
    url: https://aws.amazon.com/cognito/
  - logo: https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hY2M3M2RiNTFjNmE3NzIxYTIzNDAzNTQ0OWQ4MzgwOT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.xgNJFrB8Tz89BFgDaybQOp1e54UfUv7VeqayL_Piddg
    name: "AWS CDK"
  - logo: https://avatars.githubusercontent.com/u/66570915?s=200&v=4
    name: "SST"
    url: https://sst.dev/
  - logo: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png
    name: Node JS
    url: https://nodejs.org/en

image: /images/posts/typescript-journey/meetup.png
demo:
  name: Web Series
  url: https://www.youtube.com/playlist?list=PLz7EK8bcbCdDEcoa0cz4DNXjsFaxCVOfs
description: ""
# toc:
socialShare: true
---

## Introduction

Modern web development is an exciting challenge, with a myriad of languages, runtimes, and AWS services to conquer. Dive into this interactive workshop, where we'll explore cutting-edge frontend and backend development, all while staying firmly in the TypeScript world.

Highlights:

- Create modern TypeScript web apps with React, Vite, and Next.JS.
- Master TypeScript CI/CD with SST and AWS CDK.
- Deploy a fullstack application to AWS complete with; Next.js frontend, Node.JS apis, cognito login, S3 upload/download and TypeScript IAC.
- Ensure type safety from backend to frontend through the capabilities of tRPC.
- Get a glimpse of the future with Deno and Bun.

Join us for an action-packed TypeScript adventure! 🚀🌟

### Target Audience

Are you interested in web development with TypeScript? Maybe you already know some React but want to level up to deploying and running fullstack web applications to AWS. This web series is for you!

### Links

- [Web Series](https://www.youtube.com/playlist?list=PLz7EK8bcbCdDEcoa0cz4DNXjsFaxCVOfs) (YouTube private link, email me for access)
- [Meetup](https://www.meetup.com/tech-meetup/events/296204384) This web series is based off a workshop delivered in Ho Chi Minh, October 2023.
- [Slides](https://docs.google.com/presentation/d/1mYOBD6kO1uWB57J3P9wYvQVRdLzKPNj-/edit?usp=sharing&ouid=115437333129535741316&rtpof=true&sd=true)
- [Code](https://github.com/ziggy6792/typeScript-journey)

## Course Outline

### 1 - Welcome

Welcome to my web series “TypeScript Journey” a journey into Modern Web Development, CI/CD and AWS Magic!
<br/>
<br/>

### 2 - Demo Intro & Prerequisites

A look at what we will be building in this web series and prerequisites to get started.
<br/>
<br/>

### 3 - Intro TS Mono-Repo

Introduction to a modern TypeScript Mono-Repository using; Turborepo, yarn workspaces, Eslint, CDK, SST.
<br/>
<br/>

### 4 - Add and deploy Vite React App

Creating a Vite React App in a TypeScript Mono-Repo deploying to AWS using Cloud Development Kit (SST).
<br/>
<br/>

### 5 - Add Next JS App

Creating a Next JS App in a TypeScript Mono-Repo using Create T3 App.
<br/>
<br/>

### 6 - Add Next Auth (Cognito)

Deploying Cognito Userpool to AWS using Cloud Development Kit (SST) and configuring sign in with Next Auth.
<br/>
<br/>

### 7 - Deploy Next App to AWS

Deploying Next App to AWS using Open Next. Next App runs serverless on AWS lambda which is a very cheap way to deploy a Next App. We also configure AWS Cognito to accept signin redirect requests from the deployed site. And this highlights the issue of dependency cycles that can occur in IAC.
<br/>
<br/>

### 8 - Why I Like this Stack

An overview of some of the advantages of using this stack. Cheap run costs due to serverless architecture, bleeding edge features, fine grained access control through NextAuth and tRPC and Type Safe APIs.
<br/>
<br/>

### 9 - Fix tRPC Mutations

Open Next does not support streaming tPRC mutations out of the box. This short video shows a fix.
<br/>
<br/>

### 10 - Upload Download Demo

Implementing upload/download functionality to the Next app. Adding an S3 bucket to SST app, importing the bucket into Next App and creating an api to generate pre-signed urls. In this demo, bucket name is defined in a common package and imported into SST app and Next app.
<br/>
<br/>

### 11 - Using SST Bind and Summary

Using SST bind to refactor the approach from the previous video. In this demo, bucket name is defined in SST app and then SST bind is run in Next app to generate types and the bucket name to use. Finally a summary of what we have built.
