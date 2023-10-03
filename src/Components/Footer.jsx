import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logosolo from '../assets/logosolo.png'

import {TiSocialFacebook} from 'react-icons/ti'
import {AiOutlineTwitter, AiFillYoutube} from 'react-icons/ai'
import {FaPinterestP} from 'react-icons/fa'
import {FiMail} from 'react-icons/fi'
import {ImWhatsapp} from 'react-icons/im'
import {BiMap} from 'react-icons/bi'

const Footer = () => {
  return (
    <div className="footer section">
    
        <Row className='container'>
            <Col className='rrssData container'>
                <img src= {logosolo} className='logo' />
                <h1>La Ñoñería.cl</h1>
                <p>Síguenos en nuestras redes sociales</p>
                <div className="socials">
                <TiSocialFacebook className='icon'/>
               <AiOutlineTwitter className='icon'/>
               <AiFillYoutube className='icon'/>
               <FaPinterestP className='icon'/>
                </div>
            </Col>
            <Col className='contactData container'>
                <h2>Contacto</h2>
                <p>Si tienes consultas con tu pedido o la plataforma, comunícate inmediatamente con nosotros/as a:</p>
                <p><FiMail className='icon'/> contacto@lanoneria.cl</p> 
                <p><ImWhatsapp className='icon'/> +569 8732345</p> 
                <p><BiMap className='icon'/> Avda. Nueva Providencia #072, Providencia, Santiago</p> 
            </Col>
        </Row>

    </div>
  )
}

export default Footer