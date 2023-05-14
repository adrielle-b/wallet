import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.habilitaButtonEntrar();
  };

  habilitaButtonEntrar = () => {
    const { email, senha } = this.state;
    const caracteresMin = 5;
    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const tamanhoSenhaValido = senha.length >= caracteresMin;
    const desabilitado = !(formatoEmailValido && tamanhoSenhaValido);
    this.setState(() => ({ disabled: desabilitado }));
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    dispatch(saveLogin({ ...this.state }));
    history.push('/carteira');
  };

  render() {
    const { email, senha, disabled } = this.state;

    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            name="senha"
            value={ senha }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ disabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
