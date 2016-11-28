// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
var commands = require('./commands.js').commands;
var counters = require('./config.json').counters
const config = require("./config.json");

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'x';

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('[[Connection Established!]]');
  console.log('Logged in as: ' + bot.user.username)
});

// create an event listener for messages
//adding replying to only the GB server, we dont want to piss people off
//server id ; 108284571144957952
bot.on('message', function(msg) {
  {
    // make sure we're in the right server, that would be bad.
    if(Guild.id === config.serverid) {
  if(msg.content[0] === config.discordjs_trigger) {
	var command = msg.content.toLowerCase().split(" ")[0].substring(1);
    var suffix = msg.content.substring(command.length + 2);
	var suffix2 = suffix.toLowerCase(command.length + 2);
    var cmd = commands[command]
    if (cmd) {
      cmd.process(bot, msg, suffix, suffix2);
      console.log("-\n[Commands]: Processing command: " + command)
    }
  }
}
}
});

// log our bot in
bot.login(token);
