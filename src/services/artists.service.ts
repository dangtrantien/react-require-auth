import BaseService from "./base.service";
import axios from "axios";

export default class ArtistService extends BaseService {
    constructor() {
        super({ endpoint: 'artists' });
    }

    async FindByName(filter: String) {
        const res = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/findByName?filter=${filter}`,
            data: null,
        })

        return res;
    }

    Count = async () => {
        const res = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/count`,
            data: null,
        })

        return res;
    }
}
