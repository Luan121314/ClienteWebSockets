let statusConexao = document.querySelector("#statusConexao");
// ------------------variaveis do mqtt-----------------
let host = "191.252.195.128";
let port = 9001;
let reconnectTimeout = 5000;
let mqtt;
let menssagemBroker;
let remetente;
let dadoRecebido = false;
let testeMqtt = false;
let ip = "";
let cliente = "";
let tryConnected =0;

// Iniciando conexão com mqtt
if (navigator.onLine) {
    MQTTconnect();
    statusConexao.style.background = "Green";
    statusConexao.innerHTML = "Conetado !";
} else {
    console.log("Sem internet");
    statusConexao.style.background = "red";
    statusConexao.innerHTML = "Sem internet *_*"
}
window.onbeforeunload = function () {
    disconnect();
};

 $(function () {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
     async   function (json) {
            ip = json.ip
            return  await ip
        }
    );
});

// -------------------------Funções nativas mqtt--------------------------



function onConnect() {
    console.log("Conectado ");


    if (!dadoRecebido) {
        mqtt.subscribe("Iniciando");
        console.log("Teste webSokets Iniciado...");
        message = new Paho.Message("Teste webSokets OK !");
        message.destinationName = "Iniciando";
        mqtt.send(message);
        subscribeTopicos();

    }
}

function MQTTconnect() {
    cliente ="cliente web: " + ip+ " idConexao: "+ Math.floor(Math.random()*10000);
    try {
        console.log("connecting to " + host + " " + port);
        mqtt = new Paho.Client(host, port, cliente);
        var options = {
            timeout: 4,
            onSuccess: onConnect,
            onFailure: onFailure
        };
        //verifica se recebeu alguma mensagem em uns dos tópicos cadastrado
        mqtt.onMessageArrived = onMessageArrived;
        //Passa o dados de login para o servidor mqtt
        mqtt.connect(options);
    } catch (error) {
        console.log("Erro ao tentar se conectar !")
        console.log(error)
    }
}

function onFailure(message) {
    
    tryConnected++;
    console.log("Conection Failed");
    console.log("Menssagem: " + message.payloadString);
    tryConnected = reconnectTimeout+tryConnected;

    console.log("reconectantando em ", tryConnected, "segundos");
    setTimeout(MQTTconnect, tryConnected);
}

function enviarMensagem(topicp, messagem) {
    // mqtt.subscribe(topicp);
    message = new Paho.Message(messagem);
    message.destinationName = topicp;
    mqtt.send(message);
    console.log(message.payloadString);

}


// chamado quando uma mensagem chega
function onMessageArrived(r_message) {
    if (r_message.destinationName == "Iniciando") {
        console.log("Menssagem teste recebida ");
        console.log(r_message.payloadString);
        if (("Teste webSokets OK !").indexOf(r_message.payloadString) >= 0) {
            dadoRecebido = true;
            testeMqtt = true;
        }
    } else {
        console.log("Menssagem recebida em acão");
        callBackBroker(r_message.destinationName, r_message.payloadString);
    }
}

function subscribeTopicos() {

    mqtt.subscribe("#");
}

function disconnect() {
    mqtt.disconnect();
}

setInterval(function () {

    if (navigator.onLine) {
        statusConexao.style.background = "Green";
        statusConexao.innerHTML = "Conetado !";
        if (!mqtt.isConnected()) {
            onFailure({payloadString: "Aplicação deconectada do servidor"});
            console.log("Reconectando Mqqt");
            console.log("Mqqt desconectado");
            statusConexao.style.background = "yellow";
            statusConexao.innerHTML = "Servidor desconectado ";
        }
    } else {
        console.log("Sem internet");
        statusConexao.style.background = "red";
        statusConexao.innerHTML = "Sem internet *_*";
    }
}, 10000);


