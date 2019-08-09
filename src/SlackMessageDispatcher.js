const { WebClient } = require('@slack/client');

class SlackMessageDispatcher {
  constructor(token, logger){
    this.logger = logger;
    this.token = token;
    this.channels = new Map();

    this.web = new WebClient(token);
    this.web.channels.list().then((res) => {
      res.channels.forEach(c => {
        if(c.is_channel && !c.is_archived){
         this.channels.set(c.name, c.id);
         this.channels.set(c.id, c.name);
        }
      });
      this.log(`SlackMessageDispatcher.constructor: Channels List\n`,this.channels);
    });
  }

  log(...messages){
    if(this.logger)
      this.logger.log(messages);
  }

  getUser(id) {
    return this.web.users.info({ user: id })
    .then((res) => {
      if(res.ok && res.user){
        return {
          id: res.user.id,
          name: res.user.real_name,
          displayname: res.user.name,
          email: res.user.profile.email,
          admin: res.user.is_admin,
          owner: res.user.is_owner,
          primaryOwner: res.user.is_primary_owner,
          restrictedUser: res.user.is_restricted,
          ultraRestrictedUser: res.user.is_ultra_restricted,
          bot: res.user.is_bot,
          appUser: res.user.is_app_user,
        };
      }else {
        return null;
      }
    });
  }

  getChannel(name){
    return Promise.resolve(this.channels.get(name));
  }

  sendTextToChannel(name, text){
    this.log(`SlackMessageDispatcher.sendTextToChannel: Request to send message to ${name}: ${text}`);
    const web = this.web;
    return this.getChannel(name).then(
      (id)=>{
        web.chat.postMessage({ channel: id, text })
        .then(() => {
          return true;
        })
        .catch((er)=>{
          this.log('SlackMessageDispatcher.sendTextToChannel: Failed to send message.\nReason:', er);
          return false;
        });    
      }
    );
  }
}

module.exports = SlackMessageDispatcher;