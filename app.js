const randomOrg = require('./randomOrg');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
})

client.on('message', message => {
    let content = message.content.split(' ');
    if (content[0] === config.prefix) {
        let dice = content[1].split('d');
        randomOrg
            .client(dice[0], 1, dice[1])
                .then((response) =>
                    message.channel
                        .send(
                            `${message.author} tirou ${response.data.result.random.data.toString()}`
                        )
                )
                .catch((error) => {
                    console.log(error);
                    message.channel.send("deu ruim");
                });
    }
});

client.login(config.discord_token);
