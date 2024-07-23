//scss
import "./assets/scss/socialv.scss"
import './assets/scss/custom.scss'
import "./assets/scss/customizer.scss"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "choices.js/public/assets/styles/choices.min.css";
import "flatpickr/dist/flatpickr.css";


// Redux Selector / Action
import { useDispatch } from 'react-redux';

// import state selectors
import { setSetting } from './store/setting/actions'
import "./assets/custom/scss/socialv-custom.scss"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { loadUser } from "./store/setting/reducers"


function App({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  dispatch(setSetting())

  return (
    <div className="App">
      {/* <IndexRouters /> */}
      {children}

    </div>
  );
}

export default App;
