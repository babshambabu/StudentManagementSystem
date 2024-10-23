import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
  

    const INITIAL_LOGIN_OBJ = {
        password : "a",
        username : "admin"
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = async (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(loginObj.username.trim() === "")return setErrorMessage("Username is required! (use any value)")
        if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
        else{
            setLoading(true)
            try {
                await dispatch(login({ "username":loginObj.username , "password":loginObj.password }));
                navigate('/app/dashboard');
                setLoading(false)
              } catch (err) {
                console.error('Login failed');
                navigate("/login");
                setLoading(false)
              }
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLoginObj({...loginObj, [updateType] : value})
    }



    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">

                            <InputText
                            defaultValue="" 
                            updateType="username" 
                            containerStyle="mt-4" 
                            labelTitle="Username" 
                            updateFormValue={updateFormValue}/>

                            <InputText 
                            defaultValue=""
                            type="password" 
                            updateType="password" 
                            containerStyle="mt-4" 
                            labelTitle="Password" 
                            updateFormValue={updateFormValue}/>

                        </div>

                        <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"" + (loading ? "mt-2 w-4 loading h-4" : "btn mt-2 w-full btn-primary")}>Login</button>

                        <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login