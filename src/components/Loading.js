import React from 'react'
import Imagen from '../assets/loader.gif'
import '../App.css'

const Loading = () => {
    return (
        <div className='loading'>
            <img src={Imagen} alt="loader" />
            <p className='text'> Por favor aguardar un instante, la aplicación está cargando...</p>
            <p className='text'>Recordá tener <span className='caps'>CAPS LOCK</span> desactivado :)</p>
            <p className='text'>Activar aceleración por hardware en configuración del navegador.</p>
        </div>
    )
}

export default Loading