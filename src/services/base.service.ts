import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

export default class BaseService {
    api: string;
    endpoint: String;
    constructor(props: { endpoint: String; }) {
        this.api = API_URL;

        this.endpoint = props.endpoint;
    };

    GetAll = async (param: { skip: any; take: any; orderBy: any; }) => {
        // const token = sessionStorage.getItem('token');
        const res = await axios({
            // headers: {
            //     "Authorization": `Bearer ${token}`
            // },
            method: 'GET',
            url: `${this.api}/${this.endpoint}?skip=${param.skip}&limit=${param.take}&orderBy=${param.orderBy}`,
            data: null,
        });

        return res;
    };

    Count = async () => {
        const res = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/count`,
            data: null,
        });

        return res;
    };

    FindById = async (id: string | undefined) => {
        const res = await axios({
            method: 'GET',
            url: `${this.api}/${this.endpoint}/findById?id=${id}`,
            data: null,
        });

        return res;
    };
    
    DeleteById = async (id: any) => {
        const res = await axios({
            method: 'DELETE',
            url: `${this.api}/${this.endpoint}/deleteById?id=${id}`,
            data: null,
        });

        return res;
    };
}