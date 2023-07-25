async function buscarEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "";
    try {
        var buscaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        var resultado = await buscaCEP.json()
        if (resultado.erro) {
            throw Error('CEP inexistente!')
        } 
        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')
        var bairro = document.getElementById('bairro')
        
        cidade.value = resultado.localidade;
        bairro.value = resultado.bairro;
        logradouro.value = resultado.logradouro;
        estado.value = resultado.uf;
        return resultado
    }
    catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido ou inexistente. Tente novamente.</p>`
        console.log(erro)
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value))