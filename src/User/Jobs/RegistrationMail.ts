import Mail from '../../theforceBE/lib/Mail';

interface User {
    name: string;
    email: string;
}

interface Data {
    data: User;
}

export default {
    key: 'RegistrationMail',
    async handle({ data }: Data) {

        console.log('+++', data.name, data.email);

        await Mail.sendMail({
                from: 'Queue test <queue@queuetest.com.br>',
                to: `${data.name} <${data.email}>`,
                subject: 'Cadastro de usuário',
                html: `Olá ${data.name} Bem vindo ao sistema de fila do <strong>theforceBE</strong>`});
    },
};