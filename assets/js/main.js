const form = document.querySelector('#form');
const campos = document.querySelectorAll('.validacao');
const span = document.querySelectorAll('.spam-form');
const emailregx = /\S+@\S+\.\S+/;

var cadForm = document.getElementById('form');
var senha = document.getElementById('senha');
var email = document.getElementById('email');
var nome = document.getElementById('nome');
var cpf = document.getElementById('cpf');

cadForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cpf = document.getElementById('cpf').value;
    let usuarios = new Array();

    if (localStorage.hasOwnProperty('usuarios')) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
    }

    usuarios.push({ nome, email, senha, cpf });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Quantidade de usuários cadastrados: ' + usuarios.length);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    nomeValidacao();
    emailValidacao();
    senhaValidacao();
    cpfValidacao();
});

function erro(index) {
    campos[index].style.border = '1px solid red';
    span[index].style.display = 'block';
}

function sucesso(index) {
    campos[index].style.border = '';
    span[index].style.display = 'none';
}

function nomeValidacao() {
    if (campos[0].value.length < 3) {
        console.log('Nome inválido');
        erro(0);
    } else {
        console.log('Nome válido');
        sucesso(0);
    }
}

function emailValidacao() {
    if (emailregx.test(campos[1].value)) {
        console.log('Email válido');
        sucesso(1);
    } else {
        console.log('Email inválido');
        erro(1);
    }
}

function senhaValidacao() {
    if (campos[2].value.length < 8) {
        console.log('Senha inválida');
        erro(2);
    } else {
        console.log('Senha válida');
        sucesso(2);
    }
}

function cpfValidacao() {
    var cpfValue = campos[3].value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpfValue.length !== 11 || !validaCPF(cpfValue)) {
        console.log('CPF inválido');
        erro(3);
    } else {
        console.log('CPF válido');
        sucesso(3);
        campos[3].value = formatarCPF(cpfValue); // Formata o CPF
    }
}

function validaCPF(cpf) {
    var soma = 0;
    var resto;

    if (cpf === '00000000000') {
        return false;
    }

    for (var i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
