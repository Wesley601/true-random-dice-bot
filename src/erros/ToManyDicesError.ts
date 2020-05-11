export default class ToManyDicesError extends Error
{
    constructor(message) {
        super(message);
        this.name = "ToManyDicesError";
      }
}