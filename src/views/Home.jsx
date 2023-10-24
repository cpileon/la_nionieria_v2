//Importar Paquetes
import React, {useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

//Importar Componentes
import Steps from '../Components/Steps'
import Carrusel from '../Components/Carrusel'

//Importar Assets
import videoHome from '../assets/videoHome.mp4'
import imagebanner from '../assets/homeimg1.png'

const Home = () => {
  //Animación de entrada
  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    Aos.init({duration: 2000})
  }, [])

  return (
    <>
    <div className="home flex container section">
        <div className="mainText">
            <h1 data-aos='fade-up' data-aos-duration='2500'>¡Bienvenidos/as!</h1>
        </div>

        <div className="homeImages flex">
            <div data-aos='fade-right' data-aos-duration='2500' className="videoDiv">
                <video src= {videoHome} autoPlay muted loop className='video'></video>
            </div>

            <img src={imagebanner} data-aos='fade-left' data-aos-duration='3000' alt="" className="banner" />
            <div data-aos='fade-right' data-aos-duration='3500' className="catchPhrase1">
              <h1 className='phrase1'>Tu sitio de compras ñoñas en internet</h1>
            </div>
            <div data-aos='fade-right' data-aos-duration='3500' className="catchPhrase2">
              <p className='phrase2'>Figuras + Videojuegos + Juegos de Cartas + Accesorios + y mucho más!</p>
            </div>
        </div>
    </div>
    <Carrusel />
    <Steps />


    </>
  )
}

export default Home