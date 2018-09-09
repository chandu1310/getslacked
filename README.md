# getslacked

This is a simple nodejs library to create slack bots or send slack messages easily.
Typical scenarios where once needs to send a message to a slack user or a channel can be done with
single line code.

Also, a slack bot can be created avoiding all the setup and message handling details, and by just focussing on 
what the bot has to do on various requests.

## Version 1.0
This version consists of two main functionalities.
- SlackMessageDispatcher: The messaging module

  Implemented using slack web client, it lets us send messages (only text as of version 1) to user/channel.
  This functions as an on invoke feature and serve most of the purposes.
  
- SlackMessageListener: The listener module

  Implemented as a wrapper around slack RTM Client, this module lets us create subscriptions for various messages 
  sent on slack, both direct and for a channel. When a message is sent the listener disptaches the message to all the 
  subscribers and provides ways to respond back if necessary.

