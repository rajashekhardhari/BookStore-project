import axios from 'axios';

class UserRegistrationService{
    baseUrl = "http://localhost:8080/registration";

    registerUser = (user) => {
        console.log(user);
        return axios.post(`${this.baseUrl}/register`,user);
    }

    loginUser = (user) => {
        console.log(user);
        return axios.post(`${this.baseUrl}/login`,user);
    }

    getResetLink = (email)=>{
        console.log(email);
        return axios.post(`${this.baseUrl}/forgot/password?email=${email}`);
    }

    resetPassword = (token,newPassword,confirmPassword)=>{
        return axios.post(`${this.baseUrl}/reset/password/${token}?enterPassword=${newPassword}&confirmPassword=${confirmPassword}`)
    }

    verifyOtp = (otp)=>{
        return axios.get(`${this.baseUrl}/verify/email/${otp}`);
    }
}

export default new UserRegistrationService();