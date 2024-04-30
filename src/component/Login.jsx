import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { publicRequest } from '../requestMethods'

const Login = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await publicRequest.post('/auth/login', {
                formData: formData
            })
            setUser(response.data)
            setMessage(() => {
                if (response.data.msg) {
                    return response.data.msg
                }
            })
            setLoading(false)
            if (response.data.status === 200) {
                const token = response.data.accessToken
                const expirationTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);
                localStorage.setItem("accessToken", token);
                localStorage.setItem("user", JSON.stringify(response.data))
                localStorage.setItem("accessTokenExpiration", expirationTime);
            }
            setTimeout(() => {
                if (response.data.status === 200) {
                    navigate('/')
                }
            }, 1000)
        } catch (error) {
            setMessage("Something went wrong try again later")
            setLoading(false)
        }
    };
    return (
        <div className='lg:w-[40%] w-[90%] m-auto my-20 flex flex-col items-center justify-center shadow-xl rounded-md py-2'>
            <h2 className='text-2xl font-semibold'>Login</h2>
            <form onSubmit={handleSubmit} className='w-full py-2 px-4 rounded flex flex-col gap-3'>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="username" className='w-full font-medium'>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className='w-full outline-none'
                        style={{ borderBottom: '1px solid #D1D1D1' }}
                    />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="password" className='w-full font-medium'>Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='w-full outline-none'
                        style={{ borderBottom: '1px solid #D1D1D1' }}
                    />
                </div>
                <button type="submit" className='p-2  text-[16px] text-center rounded w-[100px] m-auto bg-[#00AFEF] text-white font-[500] border hover:bg-white hover:text-[#00AFEF] hover:border border-[#00AFEF]' >{loading ? '...Loading' : 'Login'}</button>
                <div className='flex items-center justify-center'>
                    {message && <p className='bg-[#b43232] text-white p-2 rounded text-sm font-normal'>{message}</p>}
                </div>
            </form>
            <p className='text-sm mt-2' >Not A Member <Link to={'/register'}><span className='text-[#00AFEF]'>Register Now</span></Link></p>
        </div>
    )
}

export default Login