function dateFormat (date) {
  var data = date.split('-');
  var dia = data[2];
  var mes = data[1];
  var ano = data[0];
  return dia + '-' + mes + '-' + ano;
};



function checkInput(local) {
  if (local.length == 0) {
    $("#submit").prop("disabled", true);
  } else {
    $("#submit").prop("disabled", false);
  }
};

function main() {
  var nomeTarefa;
  var tarefa;
  var data;
  var hora;
  var temporizador;
  var local = [];
  checkInput(local);
  
  $("input[type=checkbox]").on("click", function(){
    var position = local.indexOf($(this).val());
    if (position == -1) {
      if ($(this).val() == "Toda a Casa") {
        $("input[type=checkbox]").prop("disabled", true);
        $(this).prop("disabled", false);
        local = ["Toda a Casa"];
      } else {
        $("input[type=checkbox]").prop("disabled", false);
        local.push($(this).val());
      }
    } else {
      if ($(this).val() == "Toda a Casa") {
        $("input[type=checkbox]").prop("disabled", false);
        $('input[type=checkbox]').prop('checked',false);
        local = [];
      } else {
        local.splice(position, 1);
      }
    }
    checkInput(local);
  });
  
  $("#programarButton").click(function() {
    $('#programarD, #programarH').toggleClass('display-none');
    $('#programarButton i').toggleClass('fa-angle-down');
    $('#programarButton i').toggleClass('fa-angle-up');
  });

  $("#limpezas li, #entertenimento button").click(function(){
    $("#limpezas li").removeClass("selected-task");
    $(this).toggleClass("selected-task");
    nomeTarefa = $(this).text();
    $("#titulo_tarefa").text(nomeTarefa);
    $("#programar_tarefa").css("display", "block");
  });

  $("#submit").click(function(){
    data = document.forms["programarData"]["data"].value;
    data = dateFormat (data);
    hora = document.forms["programarData"]["hora"].value;
    
    if (local.length == 7) {
      local = ["Toda a Casa"];
    }


    $("#plano, #verificar").css("display", "block");

    $("#verificar_local").text("Local: " + local.join(', '));
    $("#verificar_data").text("Data: " + data);
    $("#verificar_hora").text("Hora (inicio): " + hora);

  });

  $("#confirmar").click(function(){
    tarefa = nomeTarefa + ';' + local + ';' + data + ';' + hora + ',';
    if (localStorage.getItem("tarefasAtivas") == null) {
      localStorage.setItem("tarefasAtivas", tarefa);
    } else {
      localStorage["tarefasAtivas"]+=tarefa;
    };
    
    localStorage.setItem(nomeTarefa, "on");
    localStorage.setItem(nomeTarefa + "_local", local.join(', '));
    localStorage.setItem(nomeTarefa + "_data", data);
    localStorage.setItem(nomeTarefa + "_hora", hora);

    document.forms["programarData"].reset();
    document.forms["local_temp"].reset();
    $("#submit").prop("disabled", true);
  });
};

$(document).ready(main);
