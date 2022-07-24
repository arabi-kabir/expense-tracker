import axios from "axios";

class RestClient {
    static getRequest = (url) => {
        return axios
            .get(url)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    static postRequest = (url, postData) => {
        var cors = {
            origin: "http://127.0.0.1:8000"
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin
            }
        }

        return axios
            .post(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    static deleteRequest = (url, postData) => {
        var cors = {
            origin: "http://127.0.0.1:8000"
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin
            }
        }

        return axios
            .delete(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
}

export default RestClient