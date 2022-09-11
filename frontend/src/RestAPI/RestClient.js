import React from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authHeader from "../services/auth/auth-header";

class RestClient {
    static getRequest = (url) => {
        const token = localStorage.getItem("token");

        return axios
            .get(url, {
                headers: {
                  'x-access-token': JSON.parse(token)
                }
            })
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    static postRequest = (url, postData) => {
        //const navigate = useNavigate()

        var cors = {
            origin: "http://127.0.0.1:8000"
        }

        const token = localStorage.getItem("token");

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin,
                'x-access-token': JSON.parse(token)
            }
        }

        return axios
            .post(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error.response.data);
                if(error.response.data == 'Invalid Token') {
                    toast.success('Please login first')
                    // navigate('/')
                    window.location.href = process.env.DOMAIN;
                }
                return error
            })
    }

    static deleteRequest = (url, postData) => {
        var cors = {
            origin: "http://127.0.0.1:8000"
        }

        const token = localStorage.getItem("token");

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin,
                'x-access-token': JSON.parse(token)
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

    static updateRequest = (url, postData) => {
        var cors = {
            origin: "http://127.0.0.1:8000"
        }

        const token = localStorage.getItem("token");

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors.origin,
                'x-access-token': JSON.parse(token)
            }
        }

        return axios
            .put(url, postData, config)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
}

export default RestClient