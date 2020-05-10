import axios, { AxiosPromise } from 'axios';
import { random_url, random_key } from '../config.json';


class RandomClient {
    public static client (numberOfDices: string, max: string, min = "1"): AxiosPromise 
    {
        return axios({
            method: 'post',
            url: random_url,
            data: {
                jsonrpc: "2.0",
                method: "generateSignedIntegers",
                params: {
                    apiKey: random_key,
                    n: numberOfDices,
                    min: min,
                    max: max,
                    replacement: true
                },
                id: 1,
            }
        });
    }
}

export default RandomClient
