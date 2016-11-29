// THIS IS A TEST, DO NOT BE ALARMED!!
try {
	require('./config.json');
} catch (e) {
	console.log("Config.json is not found. Unable to start!");
  process.exit(1);
}
const config = require("./config.json");
var memuse = function() { return(Math.round(process.memoryUsage().rss / 1024 / 1000 * 100 ) / 100)};

exports.commands = {
	"ping": {
		process: function(bot, msg) {
			var d = new Date();
			var start = d.getMilliseconds();
			msg.channel.startTyping();
			var dx = new Date();
			var endx = dx.getMilliseconds();
			var end = endx - start;
			msg.channel.sendMessage("**== :zap: == **\n **    - ** **" + end + "ms**\n **    - ** Pong!")
			setTimeout(continueExecution, Math.round(0.01 * 1000));

      function continueExecution() {
			msg.channel.stopTyping(true);
	  	}
		}
	},
	"pong": {
		process: function(bot, msg) {
			msg.channel.sendMessage("**== :skull: == **\nInstead of messing with a bot, why don't you go and do something productive with your life, " + msg.author + "?")
		}
	},
	"uptime": {
		process: function(bot, msg) {
			msg.channel.sendMessage("**== :clock8: == **\n **    - ** **" + (Math.round(bot.uptime/(1000*60*60))) + "** hour(s)\n **    - ** **" + (Math.round(bot.uptime/(1000*60))%60) + "** minute(s)\n **    - ** **" + (Math.round(bot.uptime/1000)%60) + "** second(s)")
		}
	},
	"myid": {
		process: function(bot, msg) {
			var userid = msg.author.id;
			var username = msg.author.username;
			msg.channel.sendMessage("**== :busts_in_silhouette: == **\n**<** **" + username + "'s ID > **\n **    - ** " + userid)
		}
	},
	"decide": {
	    process: function(bot, msg, suffix) {
	      var split = suffix.split(" or ");
	      var rand = Math.floor(Math.random() * Choices.length);
	      if (split.length > 1) {
	        msg.channel.sendMessage(Choices[rand] + " **" + multipleDecide(split) + "**");
	        console.log("[COMMAND] decide was run")
	      } else {
	      msg.channel.sendMessage("Usage: decide *something* **or** *something* **or** *something*...");
	      }
	      function multipleDecide(options) {
	        var selected = options[Math.floor(Math.random() * options.length)];
	        if (selected === "") {
	          return multipleDecide(options);
	        } else {
	          return selected;
	        }
	      }
	    }
	  },
		"serverinfo": {
        description: "Gives server info",
        process: function(bot, msg, suffix) {
          // if we're not in a PM, return some info about the channel
        if (msg.channel.server) {
              var msgArray = [];
                msgArray.push("You are currently in " + msg.channel + " (id: " + msg.channel.id + ")");
                msgArray.push("on server **" + msg.channel.server.name + "** (id: " + msg.channel.server.id + ") (region: " + msg.channel.server.region + ")");
                msgArray.push("There are **" + msg.channel.server.members.length + "** members on this server,");
                msgArray.push("The owner of the server is: " + msg.channel.server.owner + " (id: " + msg.channel.server.owner.id + ")");
                if (msg.channel.topic) { msgArray.push("The topic for this channel is: " + msg.channel.topic); }
                msg.channel.sendMessage(msgArray);
                 console.log("[COMMAND] " + msg.sender + " requested serverinfo")
              }
          else{
            msg.channel.sendMessage("This command does not work in DMs, please use on a server where I can see it.");
          }
        }
      },
			"log": {
		usage: "<log message>",
		description: "logs message to bot console",
		process: function(bot,msg,suffix){console.log(msg.content);
			console.log("[COMMAND] " + msg.sender + " logged that last bit above this log.")
	}
},
	"say": {
		process: function(bot, msg, suffix) {
			if(!suffix) {
				msg.channel.sendMessage("**== :anger: == **\nI'm already nothing.", function(error, wMessage) { bot.deleteMessage(wMessage, {"wait": 10000}); });
				return;
			}
			if(suffix.startsWith('>') || suffix.startsWith('+') || suffix.startsWith('!') || suffix.startsWith('-') || suffix.startsWith('!apb') || suffix.startsWith('c?') || suffix.startsWith('#!') || suffix.startsWith('?') || suffix.startsWith(':') || suffix.startsWith('$$') || suffix.startsWith('t!') || suffix.startsWith('t@') || suffix.startsWith("'") || suffix.startsWith('.')) {
				msg.channel.sendMessage("**== :anger: ==**\nCommands are not permitted to be run by another command.", function(error, wMessage) { bot.deleteMessage(wMessage, {"wait": 10000}); });
				return;
			}
			else {
				msg.channel.sendMessage(suffix)
				setTimeout(continueExecution, Math.round(0.1 * 1000));

	      function continueExecution() {
				console.log("Said: " + suffix + "\nAuthor: " + msg.author.username)
				console.log("Server: " + msg.channel.guild.name + "\nChannel: " + msg.channel.name)
			}
			};
		}
	},
};
