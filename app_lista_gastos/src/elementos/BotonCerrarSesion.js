import React from 'react';
import {ReactComponent as IconoCerrarSesion} from '../imagenes/log-out.svg';
import Boton from './Boton';
import {auth} from '../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';

const BotonCerrarSesion = () => {
    const history = useHistory();

    const cerrarSesion = async () => {
        try {
            await auth.signOut();
            history.push('/iniciar-sesion')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Boton iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrarSesion />
        </Boton>
    );
}

export default BotonCerrarSesion;