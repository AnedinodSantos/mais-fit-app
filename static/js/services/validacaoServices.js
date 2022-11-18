// validacao de nome
export function validarNomeCompleto(nomeCompleto) {
    if (/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(nomeCompleto) && nomeCompleto.length > 8) {

        return true;

    } else {

        alert('Digite um nome válido!');
        document.querySelector("#txtNome").value = '';
        return false;

    };
};


// validacao de CPF
export function validarCPF (cpf) {

    console.log(cpf);
	cpf = cpf.replace(/\.|-/g,"");
	console.log(cpf);

    if (cpf.length != 11 || 
    cpf == "00000000000" || 
    cpf == "11111111111" || 
    cpf == "22222222222" || 
    cpf == "33333333333" || 
    cpf == "44444444444" || 
    cpf == "55555555555" || 
    cpf == "66666666666" || 
    cpf == "77777777777" || 
    cpf == "88888888888" || 
    cpf == "99999999999") {

        alert('Digite um CPF válido!');
        document.querySelector('#txtCPF').value = '';
        return false;

    } else {

        let soma = 0;
        soma += cpf[0] * 10;
        soma += cpf[1] * 9;
        soma += cpf[2] * 8;
        soma += cpf[3] * 7;
        soma += cpf[4] * 6;
        soma += cpf[5] * 5;
        soma += cpf[6] * 4;
        soma += cpf[7] * 3;
        soma += cpf[8] * 2;
        soma = (soma * 10) % 11;
        
        if(soma == 10 || soma == 11)
            soma = 0;
        console.log("Primeiro d : " + soma);
        if(soma != cpf[9]) {
            alert('Digite um CPF válido!');
            document.querySelector('#txtCPF').value = '';
            return false;
        }
        
        soma = 0;
        soma += cpf[0] * 11;
        soma += cpf[1] * 10;
        soma += cpf[2] * 9;
        soma += cpf[3] * 8;
        soma += cpf[4] * 7;
        soma += cpf[5] * 6;
        soma += cpf[6] * 5;
        soma += cpf[7] * 4;
        soma += cpf[8] * 3;
        soma += cpf[9] * 2;
        soma = (soma * 10) % 11;
        
        if(soma == 10 || soma == 11)
            soma = 0;
        if(soma != cpf[10]) {
            alert('Digite um CPF válido!');
            document.querySelector('#txtCPF').value = '';
            return false;
        }
        
        console.log("segundo d : " + soma); 
        return true;
    };
};


// validacao de maioridade
export function validarMaioridade(dataNascimento) {

    let hoje = new Date();
    let diaNascimento = new Date(dataNascimento);
    let ano = hoje.getFullYear() - diaNascimento.getFullYear();
    let mes = hoje.getMonth() - diaNascimento.getMonth();
    let dia = hoje.getDay() - diaNascimento.getDay();

    if (ano < 18 || (ano == 18 & mes < 0) || (ano == 18 & mes == 0 & dia < 2)) {

        alert('Você precisa ser maior de idade para se cadastrar!');
        document.querySelector('#txtDataNascimento').value = '';

    };

};


// validacao de e-mail
export function validarEmail(email) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

        return true;

    } else {

        alert('Digite um e-mail válido!');
        document.querySelector("#txtEmail").value = '';
        return false;

    };
};


// validacao de numero de telefone
export function validarNumeroTelefone(numeroTelefone) {

    if (/^[0-9]*\d$/.test(numeroTelefone) && numeroTelefone.length == 11) {

        return true;

    } else {

        alert('Digite um número válido!');
        document.querySelector("#txtTelefone").value = '';
        return false;

    };
};


// localizacao de endereco
export function localizarEndereco(inputCEP) {

    if (inputCEP.length == 8 && /^[0-9]*\d$/.test(inputCEP)) {

        let url = `https://viacep.com.br/ws/${inputCEP}/json/`;
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.addEventListener('load', function () {
        let resposta = xhr.responseText;
        let endereco = JSON.parse(resposta);

            if (!endereco.erro) {

                document.querySelector('#txtLogradouro').value = endereco.logradouro;
                document.querySelector('#txtBairro').value = endereco.bairro;
                document.querySelector('#txtCidade').value = endereco.localidade + ' - ' + endereco.uf;

            } else {

                console.log(endereco.erro)
                alert('Digite um CEP válido!');
                document.querySelector('#txtCEP').value = '';

            };

        });

        xhr.send();

    } else {

        alert('Digite um CEP válido!');
        document.querySelector('#txtCEP').value = '';

    };

};
