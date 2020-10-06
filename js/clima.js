function dateFormat (date) {
  var data = date.split('-');
  var dia = data[2];
  var mes = data[1];
  var ano = data[0];
  return dia + '-' + mes + '-' + ano;
};


function checkClimatizando() {
  if (localStorage.getItem("Ar-Condicionado") == null || localStorage.getItem("Ar-Condicionado") == "off") {
    $("#climatizacao").css("display", "block");
    $("#climatizando").css("display", "none");
  } else {
    $("#local_corrente").text("Local: " + localStorage.getItem("Ar-Condicionado_local"));
    $("#temperatura_corrente").text("Temperatura: " + localStorage.getItem("Ar-Condicionado_temperatura"));
    
    $("#climatizacao").css("display", "none");
    $("#climatizando").css("display", "block");
  };
};

function checkInput(local) {
  if (local.length == 0) {
    $("#submit").prop("disabled", true);
  } else {
    $("#submit").prop("disabled", false);
  }
};


function main() {
  checkClimatizando();
  var nomeTarefa;
  var data;
  var hora;
  var local = [];
  var temperatura;
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
  
  $("#submit").click(function(){
    nomeTarefa = "Ar-Condicionado";
    temperatura = document.forms["local-temp"]["temperatura"].value;
    data = document.forms["programarData"]["data"].value;
    hora = document.forms["programarData"]["hora"].value;
    
    data = dateFormat(data);
    if (local.length == 7) {local = ["Toda a Casa"];}
    

    $("#plano, #verificar").css("display", "block");
    $("#temperatura").css("display", "none");

    $("#verificar_local").text("Local: " + local.join(', '));
    $("#verificar_temperatura").text("Temperatura (graus Calsius): " + temperatura);
    $("#verificar_data").text("Data: " + data);
    $("#verificar_hora").text("Hora (inicio): " + hora);

  });

  $("#confirmar").click(function(){
    localStorage.setItem(nomeTarefa, "on");
    localStorage.setItem(nomeTarefa + "_local", local.join(', '));
    localStorage.setItem(nomeTarefa + "_temperatura", temperatura +'ºC');
    localStorage.setItem(nomeTarefa + "_data", data);
    localStorage.setItem(nomeTarefa + "_hora", hora);

    document.forms["programarData"].reset();
    document.forms["local-temp"].reset();
    $("#submit").prop("disabled", true);
    checkClimatizando();
  });
  
  $("#cancelar").click(function(){
    $("#temperatura").css("display", "block");
  });
  
  $("#novo_clima").click(function(){
    $("#climatizacao, #temperatura").css("display", "block");
    $("#climatizando").css("display", "none");
  });

  $(document).on("input", "#temperatura", function(){
    $("#celsius").text($(this).val() + ' º');
  });

}

$(document).ready(main);
