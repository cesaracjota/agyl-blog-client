import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const GETALL = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
}

const GET = async (id) => {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
}


const CREATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/categories`, data, config);
    
    if (response.status === 201 || response.status === 200) {
        ToastChakra('REGISTERED CATEGORY', 'The category has been successfully registered', 'success', 1500, 'bottom');
    }

    return response.data;
    
}

const UPDATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/posts/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('MODIFIED CATEGORY', 'The category has been successfully modified', 'success', 1500, 'bottom');
    }
    return response.data;
}

const DELETE = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/posts/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('DELETED CATEGORY', 'The category has been successfully deleted', 'success', 1500, 'bottom');
        return response.data;
    }
}

const categoryService = {
    GETALL,
    GET,
    CREATE,
    UPDATE,
    DELETE,
}

export default categoryService;