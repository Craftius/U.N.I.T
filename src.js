var Discordie = require("discordie");
var client = new Discordie();

client.connect({
  // replace this sample token
  token: token
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});

//e.message.content.split(" ").slice(1).join(" ") --easy one suffix 


client.Dispatcher.on("MESSAGE_CREATE", e => {
	if (e.message.author.id === client.User.id) return;
	if (e.message.channel.type === 1) return;
	var eperm = client.User.can(Discordie.Permissions.Text.EMBED_LINKS, e.message.channel)
	var msg = e.message.content
	var time = new Date().toLocaleString()
	if (msg.split(" ")[0] == "-game") {
		var game = msg.split(" ").slice(1).join(" ");
		client.User.setGame(game);
		if (eperm === true){
			e.message.channel.sendMessage("", false, {
				color: 0x27bda9,
				author: {name: e.message.author.username, icon_url: e.message.author.avatarURL},
				title: "Game set to: " + game + ".",
				footer: {text: time}
			})
		} else {
		e.message.channel.sendMessage(":gear: Game set to ``" + game + "``.");
		}
	}
	if (msg.split(" ")[0] == "-testcommand") {
		e.message.channel.sendMessage("we didn't break the bot");
	}
	
	if (msg.split(" ")[0] == "-resolve") {
		var suffix = msg.split(" ").slice(1).join(" ");
		var msgchannel = e.message.channel
		try {
            var result = eval(suffix)
			  e.message.channel.sendMessage("**Output:**```js\n" + result + "\n```"); } catch (b) {
              msgchannel.sendMessage('Uh oh! Unfortunately, your eval has failed!\n' + b);
		  }
		  }
		
	if (msg.split(" ")[0] == "-say"){
		var say = e.message.content.split(" ").slice(1).join(" ");
		if (eperm === true){
			e.message.channel.sendMessage("", false, {
				color: 0x27bda9,
				author: {name: e.message.author.username, icon_url: e.message.author.avatarURL},
				title: say,
				footer: {text: time}
			})
		}
		else{
			e.message.channel.sendMessage(say);
			}
	}
	
	if (msg.split(" ")[0] === "-ping"){
		var initTime = new Date(e.message.timestamp)
	e.message.channel.sendMessage(':zap: Pong!').then((m) => {
      m.edit(':zap: Pong! ' + Math.floor(new Date(m.timestamp) - initTime) + ' ms.')
	}
	)}
	
	if (msg.split(" ")[0] === "$makerole"){
	  if (e.message.author.can(Discordie.Permissions.General.MANAGE_ROLES, e.message.guild) === false) return;
	  if (client.User.can(Discordie.Permissions.General.MANAGE_ROLES, e.message.guild) === false) return;
	  var name = msg.split(" ").slice(1).join(" ")
	  e.message.guild.createRole().then((r) => {
	  r.commit(name)  
	  })
	}
	
if (msg.split(" ")[0] == "-odds"){
	var odds = e.message.content.split(" ").slice(1).join(" ");
	var percent = Math.floor(Math.random()*100)
	if (eperm === true){
		e.message.channel.sendMessage("", false, {
			color: 0x27bda9,
				author: {name: e.message.author.username, icon_url: e.message.author.avatarURL},
				title: "Odds of " + odds + " happening.",
				description: percent + "%",
				footer: {text: time}
		})
	} else {
	e.message.channel.sendMessage(":eyes: | **" + odds + "** has a ``" + percent + "%`` chance of happening.") 
	}
	}

if (msg.split(" ")[0] === "-coin"){
	var c1 = Math.floor(Math.random()*100)
	if (c1 > 50) {
		e.message.channel.sendMessage("You landed on heads!")
	}
	if (c1 < 50){
		e.message.channel.sendMessage("You landed on tails!")
	}
}

if (msg.split("/")[2] == "discord.gg"){
	if (client.User.can(Discordie.Permissions.Text.MANAGE_MESSAGES, e.message.channel) == true) {
	console.log(e.message.author.username + "(" + e.message.author.id + ") advertised in " + e.message.guild.name + "(Channel: " + e.message.channel.name + ")");	
	e.message.channel.sendMessage(":anger: | Don't advertise!");
		e.message.delete();
		console.log("Advertisement eradicated.");
	}
	}
		});
