import React from 'react';
import api from '../api/Api.js'
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = React.useState(false)
    const [OTP, setOTP] = React.useState()
    const [user, setUser] = React.useState(localStorage.getItem('tokens'));

    const register = async (name, email, password, role) => {
        try {
            setLoading(true)
            const { data } = await api.post('/api/v1/auth/register', { name, email, password, role });
            // console.log(data)
            return data
        } catch (err) {
            // console.log(err)
            const message = err.response?.data?.message || 'something went wrong'
            // console.log(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async (email, otp) => {
        try {
            const res = await api.post('/api/v1/auth/verifyotp', { email, otp });
            return res
        } catch (err) {
            console.log(err)
            const msg = err.response?.data?.message || 'Something went wrong while verifying otp'
            throw new Error(msg)
        }
    }

    const login = async (email, password) => {
        try {
            setLoading(true);
            const resLogin = await api.post('/api/v1/auth/login', { email, password });
            // console.log(resLogin.data?.createToken);
            // setUser(resLogin.data?.createToken);
            return resLogin
        } catch (err) {
            // console.log(err)
            // console.log(err.response)
            // console.log(err.response?.data)
            const msg = err.response?.data?.message || 'Something went wrong while login'
            throw new Error(msg)
        } finally {
            setLoading(false)
        }
    }

    const getUsernameAndRole = async () => {
        try {
            const res = await api.get('/name');
            // console.log(res);
            return res
        } catch (err) {
            console.log(err.response?.data)
        }
    }


    return (
        <>
            <AuthContext.Provider value={{ register, verifyOtp, setLoading, login, loading, user, setUser, setOTP, OTP, getUsernameAndRole }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
