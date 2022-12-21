import React from 'react'
import Imagen from '../assets/loader.gif'
import '../App.css'

const Loading = () => {
    return (
        <div className='loading'>
            <img src={Imagen} alt="loader" />
            <p className='text'> Por favor aguardar un instante, la aplicacion esta cargando...</p>
            <p className='text'>Recorda tener <span className='caps'>CAPS LOCK</span> desactivado :)</p>
            <p className='text'>Activar aceleracion por hardware en configuracion del navegador.</p>
            <p className='text'>Permanecer en la pantalla de carga para evitar errores.</p>
        </div>
    )
}

export default Loading