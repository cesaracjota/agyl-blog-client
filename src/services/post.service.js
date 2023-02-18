import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const GETALL = async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
}

const GET = async (slug) => {
    const response = await axios.get(`${API_URL}/posts/${slug}`);
    return response.data.data;
}

const CREATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/posts`, data, config);
    
    if (response.status === 201 || response.status === 200) {
        ToastChakra('ARTICULO REGISTRADO', 'El articulo se ha creado correctamente', 'success', 1500, 'bottom');
    }

    return response.data;
    
}

// Update libro

const UPDATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/posts/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ARTICULO MODIFICADO', 'El articulo ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const UPLOAD_IMAGE_POST = async (data, token) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }

    const formData = new FormData();

    formData.append("profile", data);

    const response = await axios.post(`${API_URL}/users/post-photo-upload/`, formData, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('UPLOATED PHOTO', 'Your profile photo has been successfully uploaded', 'success', 1500, 'bottom');
    }
    return response.data.data;

}

// Delete libro

const DELETE = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/posts/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('POST ELIMINADO', 'El post se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const postService = {
    GETALL,
    GET,
    CREATE,
    UPDATE,
    DELETE,
    UPLOAD_IMAGE_POST,
}

export default postService;