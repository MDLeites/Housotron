function weekName (number) {
     var weekList = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
     return weekList[number];
};

function monthName(number){
     var monthList = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
     return monthList[number];
}

function printDay () {
     var d = new Date;
     var diaSemana = weekName(d.getDay());
     var dia = d.getDate();
     var mes = monthName(d.getMonth());
     var ano = d.getFullYear();
     
     $("#weekDay").text(diaSemana + " ");
     $("#day").text(mes + dia + " " + ano + ", ");
}

tarefas = ["Ar-Condicionado", "Máquina da Loiça", "Máquina da Roupa", "Aspirar", "Lavar o Chão", "Limpar o Pó", "Limpeza TOTAL", "Refeição"];


function update() {
     for (var i = 0; i<tarefas.length; i++) {
          var tarefa = localStorage.getItem(tarefas[i]);
          if (tarefa == "on") {
               if (tarefas[i] == "Ar-Condicionado") {
                    var nome = tarefas[i] + ' (' + localStorage.getItem(tarefas[i] + "_temperatura") + ')';
                    $("#notificacoes li:last").after(
                         "<li><div><i class='fa fa-thermometer-3 w3-quarter'></i><p class='w3-rest'>" + nome + " ligado.</p></div></li>");
               } else {
                    if (tarefas [i] == "Refeição") {
                         var nome = tarefas[i] + ' (' + localStorage.getItem("Refeição_prato") +')';
                         $("#notificacoes li:last").after(
                              "<li><div><i class='fa fa-cutlery w3-quarter'></i><p class='w3-rest'>" + nome + ", está em curso.</p></div></li>");
                    } else {
                         $("#notificacoes li:last").after(
                         "<li><div><i class='fa fa-circle w3-quarter'></i><p class='w3-rest'>" + tarefas[i] + ", está em curso.</p></div></li>");
                    }
               }
          }
     };
};
/*function update() {
  if (localStorage.getItem("tarefasAtivas") != null || localStorage.getItem("tarefasAtivas") != "" ) {
    var tarefasCurso = localStorage.getItem("tarefasAtivas").split(",");
    for (var i=0; i<tarefasCurso.length-1; i++){
          var tarefa = tarefasCurso[i].split(';');
          $("#notificacoes li:last").after(
          "<li><div><i class='fa fa-cutlery w3-quarter'></i><p class='w3-rest'>" + tarefa[0] + ".</p></div></li>")
     };
  };
};*/

function updateImage() {
     if (localStorage.getItem('imagemBloqueio') != null) {
          var imageSrc = localStorage.getItem('imagemBloqueio');
          var imageSrcCSS = 'url(' + imageSrc + ')';//'url(' + imageSrc[1] + '/' + imageSrc[2] + ')';
          $("#ecra_bloqueio").css('background-image', imageSrcCSS);
          if (imageSrc == "css/wallpapers/mountain.jpg" || imageSrc == "css/wallpapers/train.jpg" || imageSrc == "css/wallpapers/lights.jpg") {
               $("#date_time div").css({"color": "black", "font-weight": "900"});
          } else {$("#date_time div").css({"color": "white", "font-weight": "900"});}
     }
}

function main() {
     printDay ();
     update();
     updateImage();
     
     $("#botaoDesbloqueio").click(function() {
          var pag = localStorage.getItem('pagina');
          if (pag ==null) {
               location.href = "menu.html";
          } else {
               location.href = pag;
          }
     });
     
}

$(document).ready(main);