import Discord from 'discord.js'
import { prefix, discord_token } from '../config.json'
import Dice from './Dice'
import DiceNotValidError from './erros/DiceNotValidError'
import ToManyDicesError from './erros/ToManyDicesError'

export default class App 
{
    private discordClient = new Discord.Client()
 
    constructor () 
    {
        this.discordClient.once('ready', () => console.log('Ready!'))
        this.discordClient.on('message', this.listener)
        this.discordClient.login(discord_token)
    }

    private async listener (message: Discord.Message)
    {
        let content = message.content.split(' ')
        
        if (content[0] === prefix) {
            const [numberOfDices, maxDiceValue] = content[1].split('d')
            if (!numberOfDices.length || !maxDiceValue.length) return
            
            try {
                const dice = new Dice(
                    parseInt(numberOfDices),
                    parseInt(maxDiceValue)
                )
                const rolled = await dice.rollDice(message)
                message.channel.send(`${rolled.author} tirou ${rolled.diceNumber}`)

            } catch (error) {
                if (error instanceof DiceNotValidError) {
                    message.channel.send(error.message)
                } else if (error instanceof ToManyDicesError) {
                    message.channel.send(error.message)
                } else {
                    message.channel.send("deu ruim")
                }

            }
        }
    }
}
