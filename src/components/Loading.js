import React from 'react'
import Imagen from '../assets/loader.gif'


const Loading = () => {
    return (
        <div className='loading'>
            <img src={Imagen} alt="loader" />
            <p className='text'> Por favor aguardar un instante, la aplicacion esta cargando...</p>
            <p className='text'>Recorda tener <span className='caps'>CAPS LOCK</span> desactivado :)</p>
        </div>
    )
}

export default Loading