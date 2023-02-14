import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

const register = async (userData) => {

    const response = await axios.post(`${baseURL}/auth/signup/`, userData);

    if (response.data) {
        localStorage.setItem("user_agyl_post", JSON.stringify(response.data));
        ToastChakra('SUCCESSFUL REGISTRATION', 'Welcome to the best AGYL COMMUNITY', 'success', 2500);
    }

    return response.data;
}

const login = async (userData) => {

    const response = await axios.post(`${baseURL}/auth/login/`, userData);

    if (response.data) {
        localStorage.setItem("user_agyl_post", JSON.stringify(response.data));
        ToastChakra('BIENVENIDOS A @GYL', 'Bienvenido a la mejor COMUNIDAD - @GYL', 'loading', 2500);
    }

    return response.data;
}

const logout = () => {
    ToastChakra('Cerrando sesión', 'Hasta pronto!', 'loading', 1000);
    localStorage.removeItem("user_agyl_post");
    // localStorage.removeItem("chakra-ui-color-mode");
    // window.location.reload();
}

const authService = {
    register,
    login,
    logout,
}

export default authService;