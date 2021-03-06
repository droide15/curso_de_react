import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import Boton from '../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import {ReactComponent as SvgLogin} from '../imagenes/login.svg';
import styled from 'styled-components';
import {auth} from '../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {
    const history = useHistory();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [estadoAlerta, cambiarEstadoAlerta] =useState('');
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if (e.target.name ==='email') {
            establecerCorreo(e.target.value);
        } else if (e.target.name ==='password') {
            establecerPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarEstadoAlerta({});

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (!expresionRegular.test(correo)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'correo invalido'
            });
            return;
        }

        if (correo === '' || password === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'datos incompletos'
            });
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(correo, password)
            history.push('/');
        } catch(error) {
            cambiarEstadoAlerta(true);

            let mensaje;
            switch (error.code) {
                case 'auth/wrong-password':
					mensaje = 'La contrase??a no es correcta.'
					break;
                case 'auth/user-not-found':
					mensaje = 'No se encontro ninguna cuenta con este correo electronico.'
					break;
				default:
					mensaje = 'Hubo un error al intentar iniciar sesion.'
				    break;
            }

            cambiarAlerta({tipo: 'error', mensaje: mensaje});
        }
    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contrase??a"
                    value={password}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </>
    );
}

export default InicioSesion;