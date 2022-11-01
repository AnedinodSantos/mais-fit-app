// validacao de CPF
export function validarCPF (cpf) {

    console.log(cpf);
	cpf  = cpf.replace(/\.|-/g,"");
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

        alert('Verifique o CPF!');
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
            alert('Verifique o CPF!');
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
            alert('Verifique o CPF!');
            return false;
        }
        
        console.log("segundo d : " + soma); 
        return true;
    }
}


// localizacao de cep
export function localizarEndereco(inputCEP) {

    let url = `https://viacep.com.br/ws/${inputCEP}/json/`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', function () {

        if (xhr.status == 200) {

            console.log(xhr.status)
            let resposta = xhr.responseText;
            let endereco = JSON.parse(resposta);
            document.querySelector('#txtLogradouro').value = endereco.logradouro;
            document.querySelector('#txtBairro').value = endereco.bairro;
            document.querySelector('#txtCidade').value = endereco.localidade + ' - ' + endereco.uf;

        } else {

            alert('Informe um CEP válido!');

        };

    });

    xhr.send();

};
