import RandomClient from './randomOrg'
import Discord from 'discord.js'
import { prefix, discord_token } from '../config.json'

export default class App {
    private discordClient = new Discord.Client()
    constructor () {
        this.discordClient.once('ready', () => console.log('Ready!'))
        this.discordClient.on('message', this.listener)
        this.discordClient.login(discord_token)
    }

    private listener (message: Discord.Message)
    {
        let content = message.content.split(' ')
    
        if (content[0] === prefix) {
            let [numberOfDices, maxDiceValue] = content[1].split('d')
            
            RandomClient.client(numberOfDices, maxDiceValue)
                    .then((response) =>
                        message.channel
                            .send(
                                `${message.author} tirou ${response.data.result.random.data.toString()}`
                            )
                    )
                    .catch((error) => {
                        console.log(error)
                        message.channel.send("deu ruim")
                    })
        }
    }
}
