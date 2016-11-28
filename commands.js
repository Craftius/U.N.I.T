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
			msg.channel.sendMessage("pong");
		}
	},
};
