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

    AddNewArtist = async (artist: any) => {
        const res = await axios({
            method: 'PUT',
            url: `${this.api}/${this.endpoint}/insertArtist`,
            data: {
                artist: artist,
            },
        })

        return res;
    }

    EditArtist = async (artist: any) => {
        const res = await axios({
            method: 'POST',
            url: `${this.api}/${this.endpoint}/update`,
            data: {
                artist: artist,
            },
        })

        return res;
    }

    DeleteArtist = async (id: any) => {
        const res = await axios({
            method: 'DELETE',
            url: `${this.api}/${this.endpoint}/deleteById?id=${id}`,
            data: null,
        })

        return res;
    }
}
