import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import { publicRequest } from '../requestMethods'

const Register = () => {
    const [user,setUser] = useState({})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill all required fields')
            return;
        }
        e.preventDefault();
        setLoading(true)
        const response = await publicRequest.post('/auth/register', {
            formData: formData
        })
        setUser(response.data)
        setLoading(false)
        setTimeout(()=> {
          if (response.data.status === 200) {
            navigate('/login')
          }
        }, 1000)
    };
    return (
        <div className='lg:w-[40%] w-[90%] m-auto my-20 flex flex-col items-center justify-center shadow-xl rounded-md py-2'>
            <h2 className='text-2xl font-semibold'>Register</h2>
            {error && <span className=''>{error}</span>}
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
                    <label htmlFor="email" className='w-full font-medium'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
                <button type="submit" className='p-2  text-[16px]  rounded w-[100px] m-auto bg-[#00AFEF] text-white font-[500] border hover:bg-white hover:text-[#00AFEF] hover:border border-[#00AFEF] text-center' >{loading ? '...Loading' : 'Register'}</button>
            </form>
            {user.status === 409 && <p className='bg-[#b43232] text-white p-2 rounded text-sm font-normal'>{user.status === 409 ? 'Username Or Email Already Exist' : ''}</p>}
            <p className='text-sm mt-2' >Already Member <Link to={'/login'}><span className='text-[#00AFEF]'>Sign In</span></Link></p>
        </div>
    )
}

export default Register