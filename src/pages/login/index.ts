import Block from '../../utils/block';
import template from './login.hbs';
import Input from '../../components/input';
import Button from '../../components/button';
import {Link} from "../../components/link";
import {validate} from '~utils/validation';
import AuthController from "~controllers/AuthController";

export class Login extends Block {
    constructor() {
        const content = {
            logo: 'MONOCHROME',
        };
        super(content);
    }

    init() {
        this.children.loginInput = new Input({
            type: 'text',
            name: 'login',
            placeholder: 'логин',
            add_class: 'page__input-big',
            events: {
                blur: (e) => {
                    const loginValue = e.target.value.trim();
                    validate(loginValue, ['loginForm'], e);
                },
            },
        });

        this.children.passwordInput = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'пароль',
            add_class: 'page__input-big',
            events: {
                blur: (e) => {
                    const passwordValue = e.target.value.trim();
                    validate(passwordValue, ['passwordForm'], e);
                },
            },
        });

        this.children.loginBtn = new Button({
            text: 'ВОЙТИ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const loginValue =
                        this.children.loginInput.element.value.trim();
                    const passwordValue =
                        this.children.passwordInput.element.value.trim();
                    const data = {
                        login: loginValue,
                        password: passwordValue,
                    };
                    console.log(data);
                    AuthController.signin(data)
                },
            },
        });

        this.children.regBtn = new Link({
            text: 'зарегистрироваться',
            to: '/signup',
            link_class: 'button btn-medium',
        });
    }

    onSubmit() {
        const values = Object
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Login;
