import axios from "axios"

const initializeApp = () => {
    
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

}

export default initializeApp