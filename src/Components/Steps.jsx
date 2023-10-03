import React, {useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

import stepOne from '../assets/step1.png'
import stepTwo from '../assets/step2.png'
import stepThree from '../assets/step3.png'
import stepFour from '../assets/step4.png'

import num1 from '../assets/num1.png'
import num2 from '../assets/num2.png'
import num3 from '../assets/num3.png'
import num4 from '../assets/num4.png'


const stepArray = [
    {
      id: 1,
      imagen: stepOne,
      numIMG: num1,
      nombre: 'REGISTRARSE',
      descripcion: 'Crea una cuenta en nuestro sitio web haciendo click en REGISTRARSE.'
    },
    {
      id: 2,
      imagen: stepTwo,
      numIMG: num2,
      nombre: 'POSTEA',
      descripcion: 'Sube a nuestra plataforma los productos que quieres vender.'
    },
    {
      id: 3,
      imagen: stepThree,
      numIMG: num3,
      nombre: 'INTERACTÚA',
      descripcion: 'Revisa las publicaciones y perfiles de otros usuarios para descubrir artículos increíbles.'
    },
    {
      id: 4,
      imagen: stepFour,
      numIMG: num4,
      nombre: 'CONCRETA',
      descripcion: '¡Conecta con otros/as usuarios/as para comprar y de forma segura y rápida!'
    }
  ]
const Steps = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <div className='steps section'>
    <div className="sectionContainer">
      <h2 data-aos='fade-up' data-aos-duration='2500'>
        ¿Quieres usar nuestra plataforma?
      </h2>
      <h4 data-aos='fade-up' data-aos-duration='2500'>
        ¡Sigue estos sencillos pasos!
      </h4>

      <div className="stepsContainer flex" data-aos='fade-right' data-aos-duration='2500'>
          {
            stepArray.map((step)=>{
              return(
                <div key={step.id} className="singleCard">
                <img src= {step.imagen} className='stepImage'/>
                  <div className="stepDetails">
                    <div className="numberPicture">
                      <img src= {step.numIMG} className='stepNumber'/>
                    </div>
                    <div className="stepName">
                      <span>{step.nombre}</span>
                      <p>{step.descripcion}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }




      </div>
    </div>

  </div>
  )
}

export default Steps