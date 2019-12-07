import axios from 'axios'

const util = {
    imgPath: "http://127.0.0:8011/img/",
    apiPath: "http://127.0.0.1:8010/"
}

util.ajax = axios.create({
    baseURL: util.apiPath
})

util.ajax.interceptors.response.use(res => {
    return res.data;
})

export default util;