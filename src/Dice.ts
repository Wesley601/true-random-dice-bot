import RandomClient from './randomOrg'
import { Message, User } from 'discord.js'
import DiceNotValidError from './erros/DiceNotValidError'
import ToManyDicesError from './erros/ToManyDicesError'

interface DiceResult {
    author: User
    diceNumber?: number
}

export default class Dice
{
    private _diceNumber: number
    private _numberOfDices: number
    private _diceResult: DiceResult
    private static validDices = [
        4,
        6,
        8,
        10,
        12,
        20,
        100
    ]

    constructor (numberOfDices: number, diceNumber: number)
    {
        this.numberOfDices = numberOfDices
        this.diceNumber = diceNumber
    }

    get diceNumber ()
    {
        return this._diceNumber
    }

    set diceNumber (diceNumber: number)
    {
        if (!Dice.validDices.find(dice => dice === diceNumber)) {
            throw new DiceNotValidError(`Dado inválido!`)
        }
        this._diceNumber = diceNumber
    }

    get numberOfDices ()
    {
        return this._numberOfDices
    }

    set numberOfDices (numberOfDices: number)
    {
        if (numberOfDices >= 20) {
            throw new ToManyDicesError(`Joga no máximo 20 dados!`)
        }
        this._numberOfDices = numberOfDices
    }

    public async rollDice (message: Message): Promise<DiceResult>
    {
        this._diceResult = {
            author: message.author
        }

        return RandomClient
            .client(this.numberOfDices, this.diceNumber)
                .then(
                    (response) => {
                        this._diceResult.diceNumber = response.data.result.random.data.toString()
                        return this._diceResult
                    }
                )
                .catch((error) => {
                    throw new Error(error)
                })
    }
}