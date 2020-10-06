function displayForm (taskName) {
  if (taskName == "Máquina da Loiça") { $("#maquina_loica").css("display", "block"); }
  if (taskName == "Máquina da Roupa") { $("#maquina_roupa").css("display", "block"); }
  if (taskName == "Aspirar" || taskName == "Lavar o Chão" || taskName == "Limpar o Pó" || taskName == "Limpeza TOTAL") {
    $("#local_temp").css("display", "block");
  }
  
  var verifyClima = "";
  for (var i=0; i<15; i++) {verifyClima += taskName.charAt(i);}
  if (verifyClima == "Ar-Condicionado") { $("#local_temp, #temperatura_setting").css("display", "block"); taskName = verifyClima;}
  
  return taskName;
}

function submitValues(tarefa, local, submit) {
  if (tarefa == "Máquina da Loiça") {
    var programa = document.forms["maquina_loica"]["programa_loica"].value;
    if (submit == true) {
      localStorage.setItem(tarefa, "on");
      localStorage.setItem(tarefa + "_local", '-');
    } else {
      $("#verificar_programa_loica").text("Programa: " + programa);
    }
  }
  
  if (tarefa == "Máquina da Roupa") {
    var tipo = document.forms["maquina_roupa"]["tipo_roupa"].value;
    var centrifugacao = document.forms["maquina_roupa"]["centrifug_roupa"].value;
    var temperatura = document.forms["maquina_roupa"]["temperatura_roupa"].value;
    
    if (submit == true) {
      localStorage.setItem(tarefa, "on");
      localStorage.setItem(tarefa + "_local", '-');
    } else {
      $("#verificar_tipo_roupa").text("Tipo: " + tipo);
      $("#verificar_centrifug_roupa").text("Centrifugação: " + centrifugacao);
      $("#verificar_temperatura_roupa").text("Temperatura: " + temperatura);
    }
  }
  
  if (tarefa == "Aspirar" || tarefa == "Lavar o Chão" || tarefa == "Limpar o Pó" || tarefa == "Limpeza TOTAL") {
    if (submit == true) {
      localStorage.setItem(tarefa, "on");
      localStorage.setItem(tarefa + "_local", local.join(', '));
    } else {
      $("#verificar_local").text("Local: " + local.join(', '));
    }
  }
  
  if (tarefa == "Ar-Condicionado") {
    var temperatura_clima = document.forms["temperatura_setting"]["temperatura"].value;
    if (submit == true) {
      localStorage.setItem(tarefa, "on");
      localStorage.setItem(tarefa + "_local", local.join(', '));
      localStorage.setItem(tarefa + "_temperatura", temperatura_clima +'ºC');
    } else {
      $("#verificar_local").text("Local: " + local.join(', '));
      $("#verificar_temperatura").text("Temperatura (graus Calsius): " + temperatura_clima);
    }
  }
};

function checkInput(local, taskName) {
  if (taskName == "Máquina da Loiça" || taskName == "Máquina da Roupa") {$("#submit").prop("disabled", false);}
  else {
    if (local.length == 0) {
      $("#submit").prop("disabled", true);
    } else {
      $("#submit").prop("disabled", false);
    }
  }
};





function main() {
  var taskName = localStorage.getItem("designacao");
  var data;
  var hora;
  var local = [];
  checkInput(local, taskName);
  
  $("#designacao").text("Designação: " + taskName);
  taskName = displayForm (taskName);
  
  $(document).on("input", "#temperatura", function(){
    $("#celsius").text($(this).val() + ' º');
  });
  
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
    checkInput(local, taskName);
  });
  
  $("#programarButton").click(function() {
    $('#programarD, #programarH').toggleClass('display-none');
    $('#programarButton i').toggleClass('fa-angle-down');
    $('#programarButton i').toggleClass('fa-angle-up');
  });
  
  $("#submit").click(function(){
    data = document.forms["programarData"]["data"].value;
    hora = document.forms["programarData"]["hora"].value;
    
    if (local.length == 7) {
      local = ["Toda a Casa"];
    }

    
    submitValues(taskName, local, false);
    $("#plano, #verificar").css("display", "block");
    
    $("#verificar_data").text("Data: " + data);
    $("#verificar_hora").text("Hora (inicio): " + hora);
  });
  
  $("#confirmar").click(function(){
    submitValues(taskName, local, true);
    localStorage.setItem(taskName + "_data", data);
    localStorage.setItem(taskName + "_hora", hora);

    document.forms.reset();
    $("#submit").prop("disabled", true);
  });
    
  
  $("#voltar").click(function(){
    $("#plano, #aviso").css("display", "block");
  });

  
};

$(document).ready(main);
