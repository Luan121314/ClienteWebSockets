let msgTxt = document.querySelector("#msgTxt")
let topicoMsg = document.querySelector("#topicoTxt")
let btnEnviarMsg = document.querySelector("#btnMsg")
let subscribe = document.querySelector("#subscribeTxt")
let boxMessages = document.querySelector("#messages");
let topicoAtivo = [];
let topicoShow = "";

let menssagemTxt = "";
let arrayTopicos = [];
let novoTopico = $('#listTopicos')
let cont = 0;



btnEnviarMsg.addEventListener("click", function () {
        enviarMensagem(topicoMsg.value, msgTxt.value);

})





function callBackBroker(remetente, menssagem) {
        //     // menssagemTxt += "<div class='alert alert-primary' role='alert'>"+remetente+" : "+ menssagem +"</div>"
      if (remetente == topicoShow) {
        menssagemTxt += " <div class='w-100 toast' role='alert' aria-live='polite' aria-atomic='false' data-autohide='false'>";
        menssagemTxt += "<div class='toast-header'>";
        menssagemTxt += "<strong class='w-100 mr-auto text-primary'>" + remetente + "</strong>";
        menssagemTxt += "<small class='text-muted'>" + new Date().toLocaleTimeString() + "</small>";
        menssagemTxt += "<button type='button' class='ml-2 mb-1 close' data-dismiss='toast'>&times;</button>";
        menssagemTxt += "</div>";
        menssagemTxt += "<div class='w-100 toast-body'>";
        menssagemTxt += menssagem;
        menssagemTxt += "</div>";
        menssagemTxt += "</div>";


        boxMessages.innerHTML = menssagemTxt;
      }




        $(boxMessages).ready(function () {
                $('.toast').toast('show');
        });



        if ((arrayTopicos.indexOf(remetente) == -1)) {
                arrayTopicos.push(remetente);
                novoTopico.append(
                        "<label  class='topicoAtivo btn btn-primary active'><input type='radio' name='options' autocomplete='off' checked> " + remetente + "</label>"
                )
        }


        cont++;
        scrollTop();
        topicoAtivo = document.querySelectorAll("#listTopicos label");

        for (let i = 0; i <= topicoAtivo.length - 1; i++) {
                topicoAtivo[i].addEventListener("click", function () {
                        topicoShow = topicoAtivo[i].innerText;
                })
        
        }

}


function scrollTop() {
        // let objScrDiv = document.querySelector("#messages");
        boxMessages.scrollTop = 0;
}









// function ping(host, port, pong){
//         var started = new Date().getTime();

//         var http = new XMLHttpRequest();

//         http.open("GET", "http://" + host + ":" + port, /*async*/true);
//         http.onreadystatechange = function() {
//           if (http.readyState == 4) {
//             var ended = new Date().getTime();

//             var milliseconds = ended - started;

//             if (pong != null) {
//               pong(milliseconds);
//             }
//           }
//         };
//         try {
//           http.send(null);
//         } catch(exception) {
//           // this is expected
//         }

//       }
// setInterval(()=>{
//         // novoTopico.empty()
//         // arrayTopicos = [];
//         // console.log("Limpando box topicos")
// },30000)