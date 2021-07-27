import React, { useState }from 'react';

const Login = () => {

    // State para iniciar sesion
    const [usuario, guardarUsuario] = useState(
        {
            email:'',
            password:''
        }
    );

    // extraer usuario
    const { email, password } = usuario;
    const onChange = () => {

    }
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form action="">
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingrea tú Email"
                            value={email}
                            onChange={onChange} 
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrea tú Password"
                            value={password}
                            onChange={onChange} 
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Login;