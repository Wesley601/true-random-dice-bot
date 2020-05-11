export default class DiceNotValidError extends Error
{
    constructor(message) {
        super(message);
        this.name = "DiceNotValidError";
      }
}