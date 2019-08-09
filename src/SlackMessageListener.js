const EventEmitter = require('events');
const { RTMClient } = require('@slack/client');
const SlackMessageDispatcher = require('./SlackMessageDispatcher');

class SlackMessageListener {
  constructor(token, logger){
    this.logger = logger;
    this.token = token;
    this.slackevents = new EventEmitter();
    this.slack = new SlackMessageDispatcher(this.token);
    const rtm = new RTMClient(token);
    this.rtm = rtm;
    this.rtm.start();
    this.rtm.on('authenticated', (event) => {
      this.log(`SlackMessageListener.constructor: Authenticated for RTM Successfully. Logged in as ${event.self.name} of team ${event.team.name}`);
    });
    this.rtm.on('ready', () => {
      this.log(`SlackMessageListener.constructor: Ready to receive RTM.`);
      this.rtm.on(`message`, (message) => {
        if(message.type==='message' && message.channel && message.user){
          this.getUser(message.user)
          .then(user => {
            if(user){
              const channel = {
                isDirect: !this.slack.channels.has(message.channel),
                id: message.channel,
                name: this.slack.channels.get(message.channel)
              };
              this.processMessage({
                channel: channel,
                from: user,
                text: message.text,
              });
            }
          })
        }
      });
    });
  }

  log(...messages){
    if(this.logger)
      this.logger.log(messages);
  }

  processMessage(message){
    this.log(`SlackMessageListener.processMessage: Processing incoming message.`);
    let eventName = `USER/${message.from.displayname.toUpperCase()}`;
    if(!message.channel.isDirect) {
      // For INDIRECT messages
      // eventName = `USER/${message.from.displayname.toUpperCase()}/CHANNEL/${message.channel.name.toUpperCase()}`;
      // this.log(`Sending event: ${eventName}`);
      // this.slackevents.emit(eventName, message);

      eventName = `CHANNEL/${message.channel.name.toUpperCase()}`;
      // this.log(`Sending event: ${eventName}`);  
      this.slackevents.emit(eventName, message);
    } else {
      // For DIRECT messages
      // this.log(`Sending event: ${eventName}`);
      this.slackevents.emit(eventName, message);
    }
  }

  onMessageInChannel(channelname, callback){
    const topic = `CHANNEL/${channelname.toUpperCase()}`;
    // this.log(`Registering for ${topic}`);
    this.slackevents.on(topic, callback);
  }

  // onIndirectMessageFrom(sender, channelname, callback){
  //   const topic = `USER/${sender.toUpperCase()}/CHANNEL/${channelname.toUpperCase()}`;
  //   // this.log(`Registering for ${topic}`);
  //   this.slackevents.on(topic, callback);
  // }

  onDirectMessageFrom(sender, callback){
    const topic = `USER/${sender.toUpperCase()}`;
    // this.log(`Registering for ${topic}`);
    this.slackevents.on(topic, callback);
  }

  getUser(name){
    return this.slack.getUser(name);
  }

  getChannel(name){
    return this.slack.getChannel(name);
  }

  sendTextToChannel(name, text){
    return this.slack.sendTextToChannel(name, text);
  }
}

module.exports = SlackMessageListener;