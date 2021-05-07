import React, {useState, useContext, useEffect} from 'react';
import {auth} from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();
    const [cargando, cambiarCargando] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext, useAuth};