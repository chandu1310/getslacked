const { RTMClient } = require('@slack/client');
const SlackMessageDispatcher = require('./SlackMessageDispatcher');

class SlackMessageListener {
  constructor(token){
    this.token = token;
    this.channels = new Map();
    this.messagelisteners = new Map();
    this.slack = new SlackMessageDispatcher(this.token);
    const rtm = new RTMClient(token);
    this.rtm = rtm;
    this.rtm.start();
    this.rtm.on('authenticated', (event) => {
      console.debug(`SlackMessageListener.constructor: Authenticated for RTM Successfully. Logged in as ${event.self.name} of team ${event.team.name}`);
    });
    this.rtm.on('ready', () => {
      console.debug(`SlackMessageListener.constructor: Ready to receive RTM.`);
      this.rtm.on(`message`, (message) => {
        console.log(message)
        if(message.type==='message' && message.channel && message.user){
          this.getUser(message.user)
          .then(user => {
            if(user){
              const channel = {
                isDirect: !this.channels.has(message.channel),
                id: message.channel,
                name: this.channels.get(message.channel)
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

  processMessage(message){
    console.debug(`SlackMessageListener.processMessage: Processing incoming message.`, message);
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