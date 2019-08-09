# getslacked
[![npm latest version](https://img.shields.io/npm/v/nodeneeds-npm/latest.svg)](https://www.npmjs.com/package/nodeneeds-npm) 
[![Build Status](https://travis-ci.org/chandu1310/nodeneeds-npm.svg?branch=master)](https://travis-ci.org/chandu1310/nodeneeds-npm) 
[![Maintainability](https://api.codeclimate.com/v1/badges/726be829a5b79fed192a/maintainability)](https://codeclimate.com/github/chandu1310/nodeneeds-npm/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/726be829a5b79fed192a/test_coverage)](https://codeclimate.com/github/chandu1310/nodeneeds-npm/test_coverage)

This is a simple nodejs library to create slack bots or send slack messages easily.
Typical scenarios where once needs to send a message to a slack user or a channel can be done with
single line code.

Also, a slack bot can be created avoiding all the setup and message handling details, and by just focussing on 
what the bot has to do on various requests.

## Installation

Run the following command to install as a dependency in your project.

```
npm install getslacked
```

## Usage

This version consists of two main functionalities.
- SlackMessageDispatcher: The messaging module

  Implemented using slack web client, it lets us send messages (only text as of version 1) to user/channel.
  This functions as an on invoke feature and serve most of the purposes.
  
- SlackMessageListener: The listener module

  Implemented as a wrapper around slack RTM Client, this module lets us create subscriptions for various messages 
  sent on slack, both direct and for a channel. When a message is sent the listener disptaches the message to all the 
  subscribers and provides ways to respond back if necessary.


## Credits
[Chandra Shekar Chennamsetty](https://github.com/chandu1310)

This project was bootstrapped using [Nodeneeds](https://www.npmjs.com/package/@chandu1310/nodeneeds) utility.

**Free Software, Hell Yeah!**
