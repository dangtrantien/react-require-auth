import axios from "axios";
import BaseService from "./base.service";

export default class BlogsService extends BaseService {
    constructor() {
        super({ endpoint: 'blogs' });
    };

    async AddNewBlog(blog: any) {
        const res = await axios({
            method: 'PUT',
            url: `${this.api}/${this.endpoint}/addBlog`,
            data: {
                blog: blog
            }
        });

        return res;
    };

    async EditBlog(blog: any) {
        const res = await axios({
            method: 'PUT',
            url: `${this.api}/${this.endpoint}/editBlog`,
            data: {
                blog: blog
            }
        });

        return res;
    }
}