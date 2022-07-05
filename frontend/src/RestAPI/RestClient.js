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
        let config = {
            headers: {
                'Content-Type': 'application/json'
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
}

export default RestClient