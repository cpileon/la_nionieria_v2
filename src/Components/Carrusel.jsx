import React, {useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

import Carousel from 'react-bootstrap/Carousel';

//Importar imágenes
import img1 from '../assets/c1.png'
import img2 from '../assets/c2.png'
import img3 from '../assets/c3.png'

const Carrusel = () => {
    //Animación de entrada
    useEffect(()=>{
      Aos.init({duration: 2000})
    }, [])

  return (
    <div className='Carrusel section' data-aos='fade-up' data-aos-duration='2500'>
       <Carousel>
        <Carousel.Item>
          <img className="d-block w-100"
            src={img1}
            alt="Seguridad"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100"
            src={img2}
            alt="Delivery"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100"
            src={img3}
            alt="Interacción"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Carrusel