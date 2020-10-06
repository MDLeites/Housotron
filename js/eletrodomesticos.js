function eletrodomestico(value_name) {
  switch (value_name) {
    case "Máquina da Roupa":
      return "#maquina_roupa"
      break;
    case "Máquina da Loiça":
      return "#maquina_loica"
      break;
    default:

  };
};

function dateFormat (date) {
  var data = date.split('-');
  var dia = data[2];
  var mes = data[1];
  var ano = data[0];
  return dia + '-' + mes + '-' + ano;
};

function submitValues(tarefa) {
  if (tarefa == "Máquina da Loiça") {
    var programa = document.forms["maquina_loica"]["programa_loica"].value;
    $("#verificar_programa_loica").text("Programa: " + programa);
  } else {
    var tipo = document.forms["maquina_roupa"]["tipo_roupa"].value;
    var centrifugacao = document.forms["maquina_roupa"]["centrifug_roupa"].value;
    var temperatura = document.forms["maquina_roupa"]["temperatura_roupa"].value;

    $("#verificar_tipo_roupa").text("Tipo: " + tipo);
    $("#verificar_centrifug_roupa").text("Centrifugação: " + centrifugacao);
    $("#verificar_temperatura_roupa").text("Temperatura: " + temperatura);
  };
};



function main() {
  var nomeTarefa;
  var tarefa;
  var data;
  var hora;
  var temporizador;
  
  $("#eletrodomesticos li").click(function(){
    $("#eletrodomesticos li").removeClass("selected-task");
    $(this).toggleClass("selected-task");
    nomeTarefa = $(this).text();
    $("#titulo_tarefa").text(nomeTarefa);
    $("#maquina_roupa, #maquina_loica").css("display", "none");
    $("#programar_tarefa_eletrod, "+eletrodomestico(nomeTarefa)+"").css("display", "block");
  });
  
  $("#programarButton").click(function() {
    $('#programarD, #programarH').toggleClass('display-none');
    $('#programarButton i').toggleClass('fa-angle-down');
    $('#programarButton i').toggleClass('fa-angle-up');
  });

  $("#submit").click(function(){
    submitValues(nomeTarefa);
    data = document.forms["dia_hora"]["data"].value;
    data = dateFormat (data);
    hora = document.forms["dia_hora"]["hora"].value;
    

    $("#plano, #verificar").css("display", "block");

    $("#verificar_data").text("Data: " + data);
    $("#verificar_hora").text("Hora (inicio): " + hora);
  });

  $("#confirmar").click(function(){
    localStorage.setItem(nomeTarefa, "on");
    localStorage.setItem(nomeTarefa + "_local", "-");
    localStorage.setItem(nomeTarefa + "_data", data);
    localStorage.setItem(nomeTarefa + "_hora", hora);

    document.forms["dia_hora"].reset();
    $("#submit").prop("disabled", true);
  });
};

$(document).ready(main);
