---
title: "Accessing Amplify GraphQL API objects from Lambda functions"
date: 2020-03-20T09:07:48+07:00
authors:
  - Simon Verhoeven
authorbox: true
image: /images/posts/Accessing-DynamoDB-Tables/Amplify.png
# thumbnail: "img/placeholder.jpg" # Optional, thumbnail
# lead: "code first serverless"
toc: true # Optional, enable Table of Contents for specific post
categories:
  - "Web Development"
tags:
  - "AWS"
  - "Amplify"
  - "AppSync"
  - "DynamoDB"
  - "Lambda"
  - "CloudFormation"
menu: side # Optional, add page to a menu. Options: main, side, footer

draft: false
description:
summary: "Amplify offers the ability to add Lambda functions which use other configured resources including AppSync API DynamoDB Tables. This article focuses on creating a Lambda function with Amplify CLI that has access to these tables."
---

## Introduction

Amplify offers the ability to add Lambda functions which use other configured resources including API objects backed by DynamoDb. This article will focus on creating a lambda function with the Amplify CLI that has access to the DynamoDB tables setup for an [AppSync GraphQL API](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js#create-the-graphql-api). \
Specifically we will look at;

- Creating a Lambda function with Amplify CLI configured to use DynamoDB table resources
- The resource provisioning mechanism and potential problems with creating Lambdas created through Amplify
- Writing & testing a sample Lambda handler to demonstrate its capabilities

**WHY?**

- Perhaps you want to write some custom graphQL [@function](https://docs.amplify.aws/cli/graphql-transformer/directives#function) resolvers that interact with your API DynamoDB tables directly (e.g. add a batch of items to a table)
- Or, set up triggers on your tables (e.g. to cascade deletes to orphaned items)

## Pre-requisites

- Install Amplify CLI (version 4.16.1 or higher)
- Run Amplify Init
- Create GraphQL API

## Creating a Lambda function with Amplify CLI

Use the following commands to create a Lambda function with the Amplify CLI. After selecting the category `storage`, you will be prompted to select DynamoDB tables wich exist for the GraphQL API [@model](https://docs.amplify.aws/cli/graphql-transformer/directives#model).

**NOTE**: You will need Amplify CLI version 4.16.1 or higher.

<!-- {{< gist ziggy6792 f8ea26516f51fbb7bf2ee024f9d054f0 "createLambdaFunction.txt" >}} -->

```
NBMAC0056:SwtNinja verhoeven$ amplify add function
Using service: Lambda, provided by: awscloudformation
? Provide a friendly name for your resource to be used as a label for this category in the project: doSomethingToDBTables
? Provide the AWS Lambda function name: doSomethingToDBTables
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources created in this project from your Lambda function? Yes
? Select the category storage
? Storage has 8 resources in this project. Select the one you would like your Lambda to access Event:@model(appsync), Competition:@model(appsync), Heat:@model(appsync), SeedSlot:@model(appsync), Ride
rAllocation:@model(appsync), User:@model(appsync)
? Select the operations you want to permit for Event:@model(appsync) create, read, update, delete
? Select the operations you want to permit for Competition:@model(appsync) create, read, update, delete
? Select the operations you want to permit for Heat:@model(appsync) create, read, update, delete
? Select the operations you want to permit for SeedSlot:@model(appsync) create, read, update, delete
? Select the operations you want to permit for RiderAllocation:@model(appsync) create, read, update, delete
? Select the operations you want to permit for User:@model(appsync) create, read, update, delete

You can access the following resource attributes as environment variables from your Lambda function
        API_COMPAPI_COMPETITIONTABLE_ARN
        API_COMPAPI_COMPETITIONTABLE_NAME
        API_COMPAPI_EVENTTABLE_ARN
        API_COMPAPI_EVENTTABLE_NAME
        API_COMPAPI_GRAPHQLAPIIDOUTPUT
        API_COMPAPI_HEATTABLE_ARN
        API_COMPAPI_HEATTABLE_NAME
        API_COMPAPI_RIDERALLOCATIONTABLE_ARN
        API_COMPAPI_RIDERALLOCATIONTABLE_NAME
        API_COMPAPI_SEEDSLOTTABLE_ARN
        API_COMPAPI_SEEDSLOTTABLE_NAME
        API_COMPAPI_USERTABLE_ARN
        API_COMPAPI_USERTABLE_NAME
        ENV
        REGION
? Do you want to invoke this function on a recurring schedule? No
? Do you want to edit the local lambda function now? Yes
Please edit the file in your editor: <project-dir>/amplify/backend/function/doSomethingToDBTables/src/index.js
? Press enter to continue
Successfully added resource doSomethingToDBTables locally.

Next steps:
Check out sample function code generated in <project-dir>/amplify/backend/function/doSomethingToDBTables/src
"amplify function build" builds all of your functions currently in the project
"amplify mock function <functionName>" runs your function locally
"amplify push" builds all of your local backend resources and provisions them in the cloud
"amplify publish" builds all of your local backend and front-end resources (if you added hosting category) and provisions them in the cloud

NBMAC0056:SwtNinja verhoeven$ amplify push
✔ Successfully pulled backend environment compapi from the cloud.

Current Environment: compapi

| Category | Resource name         | Operation | Provider plugin   |
| -------- | --------------------- | --------- | ----------------- |
| Function | doSomethingToDBTables | Create    | awscloudformation |
| Api      | compapi               | No Change | awscloudformation |
? Are you sure you want to continue? Yes
```

## Potential maximum policy size issue when running amplify push

When running amplify push at the end of the last step you may see the following [issue](https://github.com/aws-amplify/amplify-cli/issues/1699).

> "Maximum policy size of 10240 bytes exceeded for role `<apiName>LambdaRole26741da9-<apiName>`"

This issue occurs when the policy created for the lambda role (the IAM role created to run your new lambda function) exceeds the maximum size allowed for role inline policies.

### Option1: Reducing the number of tables added to the role policy

If possible, you should reduce the tables and actions granted in the previous step (following the best practice that each lambda only has access to the actions and resources it expressly needs). However, this may not be possible. In my case, I wanted to write a lambda function that cascaded deletes through my table schema. Therefore, my lambda function needs to have access to all of my API tables.

### Option2: Customizing local CloudFormation template generated by Amplify

To understand a work around for this issue, it is important to explain in more detail what `amplify add function` is actually doing. This method creates a local folder for the function containing a CloudFormation template. E.g;

{{< highlight go >}}
amplify/backend/function/doSomethingToDBTables/doSomethingToDBTables-cloudformation-template.json
{{< / highlight >}}

This template describes the lambda to be created when amplify push is next run. However, Amplify is not very clever when it comes to creating the templates which create role inline policies. The Amplify created CloudFormation template creates a separate inline policy statement for each DynamoDB table (even if the allowed actions are the same).

For example; granting these actions;

- `"dynamodb:Put*"`
- `"dynamodb:Create*"`
- `"dynamodb:BatchWriteItem"`
- `"dynamodb:Get*"`
- `"dynamodb:BatchGetItem"`
- `"dynamodb:List*"`
- `"dynamodb:Describe*"`
- `"dynamodb:Scan"`
- `"dynamodb:Query"`
- `"dynamodb:Update*"`
- `"dynamodb:RestoreTable*"`
- `"dynamodb:Delete*"`

To these tables;

- Competition-xl3qodhqsfdmhe5psj4vqa7wsy-compapi
- User-xl3qodhqsfdmhe5psj4vqa7wsy-compapi
- Event-xl3qodhqsfdmhe5psj4vqa7wsy-compapi
- Heat-xl3qodhqsfdmhe5psj4vqa7wsy-compapi
- RiderAllocation-xl3qodhqsfdmhe5psj4vqa7wsy-compapi
- SeedSlot-xl3qodhqsfdmhe5psj4vqa7wsy-compapi

Will create the following access policy list of statements;

<!-- {{< gist ziggy6792 f8ea26516f51fbb7bf2ee024f9d054f0 "accessPolicyExample1.json" >}} -->

```
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Action": [
              "dynamodb:Put*",
              "dynamodb:Create*",
              "dynamodb:BatchWriteItem",
              "dynamodb:Get*",
              "dynamodb:BatchGetItem",
              "dynamodb:List*",
              "dynamodb:Describe*",
              "dynamodb:Scan",
              "dynamodb:Query",
              "dynamodb:Update*",
              "dynamodb:RestoreTable*",
              "dynamodb:Delete*"
          ],
          "Resource": [
              "arn:aws:dynamodb:ap-southeast-1:694710432912:table/Competition-xl3qodhqsfdmhe5psj4vqa7wsy-compapi",
              "arn:aws:dynamodb:ap-southeast-1:694710432912:table/Competition-xl3qodhqsfdmhe5psj4vqa7wsy-compapi/index/*"
          ],
          "Effect": "Allow"
      },{
        "Action": [
            "dynamodb:Put*",
            "dynamodb:Create*",
            "dynamodb:BatchWriteItem",
            "dynamodb:Get*",
            "dynamodb:BatchGetItem",
            "dynamodb:List*",
            "dynamodb:Describe*",
            "dynamodb:Scan",
            "dynamodb:Query",
            "dynamodb:Update*",
            "dynamodb:RestoreTable*",
            "dynamodb:Delete*"
        ],
        "Resource": [
            "arn:aws:dynamodb:ap-southeast-1:694710432912:table/User-xl3qodhqsfdmhe5psj4vqa7wsy-compapi",
            "arn:aws:dynamodb:ap-southeast-1:694710432912:table/User-xl3qodhqsfdmhe5psj4vqa7wsy-compapi/index/*"
        ],
        "Effect": "Allow"
    },
    ...Repeat For Each Table
  ]
}
```

Which is actually equivalent to the following single statement (using the pattern resource identifier: `*-xl3qodhqsfdmhe5psj4vqa7wsy-compapi` matching every table for **this particular GraphQL API Environment**);

<!-- {{< gist ziggy6792 f8ea26516f51fbb7bf2ee024f9d054f0 "accessPolicyExample2.json" >}} -->

```
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Action": [
              "dynamodb:Put*",
              "dynamodb:Create*",
              "dynamodb:BatchWriteItem",
              "dynamodb:Get*",
              "dynamodb:BatchGetItem",
              "dynamodb:List*",
              "dynamodb:Describe*",
              "dynamodb:Scan",
              "dynamodb:Query",
              "dynamodb:Update*",
              "dynamodb:RestoreTable*",
              "dynamodb:Delete*"
          ],
          "Resource": [
              "arn:aws:dynamodb:ap-southeast-1:694710432912:table/*-xl3qodhqsfdmhe5psj4vqa7wsy-compapi",
              "arn:aws:dynamodb:ap-southeast-1:694710432912:table/*-xl3qodhqsfdmhe5psj4vqa7wsy-compapi/index/*"
          ],
          "Effect": "Allow"
      }
  ]
}
```

The difference with using the second example however is that; generating policies this way will not cause policies to grow in size with the number of API tables and therefore will not easily hit the maximum policy size and cause the maximum policy size issue.

Therefore, a workaround for the maximum policy size issue is to modify your CloudFormation template to consolidate the assignment of actions to tables. Exactly how to modify the CloudFormation template will depend on the specific access rights you want to grant to your lambda. A common example however would be if you wanted to grant the same access to all API tables for a particular environment as shown above.

## Modify CloudFormation template to give access to all Amplify API tables

Using [jq](https://stedolan.github.io/jq) we can first remove all but the first policy statement from the generated `doSomethingToDBTables-cloudformation-template.json`:

{{< highlight bash >}}
jq '.Resources.AmplifyResourcesPolicy.Properties.PolicyDocument.Statement[0] as $stmt0 |
    .Resources.AmplifyResourcesPolicy.Properties.PolicyDocument.Statement = [$stmt0]' \
 doSomethingToDBTables-cloudformation-template.json >output.json
{{< / highlight >}}

**NOTE**: `jq` currently does not support in-place editing of files

This will create a new file `output.json` in the same directory, manually edit this file replacing the tableName specific resource identifier with the pattern identifier (`*-<ApiName>-<EnvName>`). Here's a sample diff;

{{< gist ziggy6792 f8ea26516f51fbb7bf2ee024f9d054f0 "editCloudFormationTemplate.diff" >}}

Next, replace original `doSomethingToDBTables-cloudformation-template.json` with `output.json`.

{{< highlight bash "linenos=inline,hl_lines=2" >}}
rm doSomethingToDBTables-cloudformation-template.json
mv output.json doSomethingToDBTables-cloudformation-template.json
{{< / highlight >}}

[Here](https://gist.github.com/ziggy6792/f8ea26516f51fbb7bf2ee024f9d054f0#file-dosomethingtodbtables-cloudformation-template-json) is an example of my final CloudFormation template.

Finally, run `amplify push`.

Go to your ec2 console. You should see the following created lambda function;

{{< figure src="/images/posts/Accessing-DynamoDB-Tables/Created-Function.png" title="Created Lambda Function" >}}

Along with the following attached role and access policy.

{{< figure src="/images/posts/Accessing-DynamoDB-Tables/Created-Role.png" title="Created Role" >}}

## Test your new function. Write to DynamoDB from Lambda Function

To test access to dynamoDB from your new Lambda function, copy the following code (from line 23) into your local lambda function index.js, replacing the hello world function that was created [here](/posts/amplify-lambda-dynamodb/#creating-a-lambda-function-with-amplify-cli).

<!-- {{< gist ziggy6792 f8ea26516f51fbb7bf2ee024f9d054f0 "lambda-function-index.js" >}} -->

```
/* Amplify Params - DO NOT EDIT
	API_COMPAPI_BPOSTTABLE_ARN
	API_COMPAPI_BPOSTTABLE_NAME
	API_COMPAPI_COMPETITIONTABLE_ARN
	API_COMPAPI_COMPETITIONTABLE_NAME
	API_COMPAPI_CUSTOMERTABLE_ARN
	API_COMPAPI_CUSTOMERTABLE_NAME
	API_COMPAPI_EVENTTABLE_ARN
	API_COMPAPI_EVENTTABLE_NAME
	API_COMPAPI_GRAPHQLAPIIDOUTPUT
	API_COMPAPI_HEATTABLE_ARN
	API_COMPAPI_HEATTABLE_NAME
	API_COMPAPI_RIDERALLOCATIONTABLE_ARN
	API_COMPAPI_RIDERALLOCATIONTABLE_NAME
	API_COMPAPI_SEEDSLOTTABLE_ARN
	API_COMPAPI_SEEDSLOTTABLE_NAME
	API_COMPAPI_USERTABLE_ARN
	API_COMPAPI_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.update({ region: process.env.REGION });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event, context, callback) => {
	let items = [{id:uuid.v4(),name:"Hello World"}];
	try {
		await write(process.env.API_COMPAPI_EVENTTABLE_NAME,items)
	} catch (err) {
		callback(err)
	}
	return callback(null,items);
};

async function write(tableName, items) {
	var itemsToWrite = items
	var params = {
		RequestItems: {
			[tableName]:
				itemsToWrite.map((item) => {
					return ({
						PutRequest: {
							Item: AWS.DynamoDB.Converter.marshall(item)
						}
					})
				})
		}

	};
	const data = await ddb.batchWriteItem(params).promise();
}
```

**IMPORTANT**:

- Do not replace/edit the Amplify auto generated variables (lines 1 to 21), keep your own variables separate from this auto-generated code to ensure they are not overwritten.
- Replace tableName (line 33) with one of your own resource attributes as environment variables that was created [here](/posts/amplify-lambda-dynamodb/#creating-a-lambda-function-with-amplify-cli)
- You will also need to cd to you local lambda function directory and install npm package uuid locally

{{< highlight bash "linenos=inline,hl_lines=2" >}}
cd "amplify/backend/function/doSomethingToDBTables/src/"
npm i --save uuid
{{< / highlight >}}

Next run `amplify push`

Now you can test your function in the AWS console;

{{< figure src="/images/posts/Accessing-DynamoDB-Tables/Test-Function.png" title="Test Function" >}}

And then verify that an item was created in the specified table;

{{< figure src="/images/posts/Accessing-DynamoDB-Tables/Test-Function-Created-Item.png" title="Test Function Success - Created Item" >}}

<!-- {{< highlight json "linenos=inline,hl_lines=8 15-17" >}}
{
  "name": "doSomethingToDBTables",
  "version": "2.0.0",
  "description": "Lambda function generated by Amplify",
  "main": "index.js",
  "license": "Apache-2.0",
  "dependencies": {
    "lodash": "latest"
  }
}
{{< / highlight >}} -->
