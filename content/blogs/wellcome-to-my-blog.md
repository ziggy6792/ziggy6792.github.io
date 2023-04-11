---
title: "Welcome to my blog"
date: 2020-03-15T09:07:48+07:00
authors:
  - Simon Verhoeven
authorbox: true
image: /images/wellcome-to-my-blog/wellcome.jpg

# thumbnail: "img/placeholder.jpg" # Optional, thumbnail
# lead: "EKS in a Terraform way"
toc: true # Optional, enable Table of Contents for specific post
categories:
  - "Web Development"
tags:
  - "AWS"
  - "Amplify"
  - "DynamoDB"
  - "Lambda"
  - "Cloud Formation"
menu: side # Optional, add page to a menu. Options: main, side, footer

draft: false
description:
summary: "In this blog I aspire to detail my journey in adopting AWS Amplify, Cognito, AppSync and DynamoDb."
---

## Introduction

In this blog I aspire to detail my journey in adopting AWS Serverless Architecture;

- Amplify
- Lambda
- Cognito
- AppSync
- DynamoDB
- API Gateway

I am creating a Competition Management App for event organizers and competitors at [Singapore Wakepark](http://www.singaporewakepark.com/home/). This is a full stack serverless web application (ReactJS front-end, GraphQL API (AppSync + Node JS Lambda) back-end. I chose these technologies for the job because I believe them to be a good fit to my needs;

- Easy scalability
- Pay for what you use (when no competitions are running the cost of running the application will be negligible)
- Lots of good online documentation

But also because they are exciting technologies which I am keen to work with.

Most of my explanations and sample code will in someway showcase my Competition Management App (such as DynamoDB tables with names like Event, Competition, Heat...). However I aim to distill the topics I am learning into blog posts that demonstrate my work in a way that can benefit all developers (building a variety of applications) using AWS. \
I will cover widely applicable topics such as;

- Accessing DynamoDB tables from Lambdas
- Setting up DynamoDB event triggers
- Creating a cognito user pool with some mock users

## Why

In all areas of software development there is more than one way to skin a fish. However, I believe this is particularly prevalent when it comes to AWS due to the vast array of features and possibilities in this space.

I hope I can get some feedback from other developers on my approach and design decisions and maybe benefit from learning alternate approaches, as well as their pros and cons through discussions.

Most importantly, I hope that other people who are looking at adopting these technologies can benefit from a documented report of someone building up their AWS skills and mastering Serverless Application development.
