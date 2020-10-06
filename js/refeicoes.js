var receitas = {
      Lulas: ["Arroz de Lulas"],
      Vaca: ["Bitoque", "Estufado de Vaca"],
      Frango: ["Frango Assado", "Frango à Brás"],
      Porco: ["Carne de Porco à Alentejana", "Bifinchos com Natas"],
      Atum: ["Massa de Atum"],
      //Espadarte: ["Espadarte Assado"],
      Pescada: ["Pescada Cozida", "Moqueca de Peixe"]
    };



function get_receita(alimento) {
  var pesquisa = [];
  for (var key in receitas) {
    if(receitas.hasOwnProperty(key)) {
      if (key == alimento) {
        pesquisa.push(receitas[key]);
      }
    }
  };

  return pesquisa[0];
};

function checkCooking() {
  if (localStorage.getItem("refeicaoAtiva") == null || "refeicaoAtiva" == "off") {
    $("#escolherRefeicao").css("display", "block");//$("#first_step, #progress_refeicao, #info").css("display", "block");
    $("#cooking").css("display", "none");
    return true;
  } else {
    $("#escolherRefeicao").css("display", "none");//$("#first_stage, #progress_refeicao, #info").css("display", "none");
    $("#cooking").css("display", "block");
    displayCooking();
    return false;
  }
};

function displayCooking() {
  function cookingTime(hora) {
    // formatp HH:MM
    var hour = parseInt(hora.split(':')[0]);
    var min = parseInt(hora.split(':')[1]);
    var finish = min + 45;
    if (finish >= 60) {
      min = finish - 60;
      hour += 1;
      if (hour >= 24) {
        hour -= 24;
      }
    }
    return hour + ':' + min;
  }
  var ativa = localStorage.getItem("refeicaoAtiva").split(";");
  $("#refeicao_ativa").text("Refeição: " + ativa[0]);
  $("#refeicao_inicio").text("Hora (inicio): " + ativa[1]);
  $("#refeicao_fim").text("Refeição Pronta (aproximadamente): " + cookingTime(ativa[1]));
}

function dateFormat (date) {
  var data = date.split('-');
  var dia = data[2];
  var mes = data[1];
  var ano = data[0];
  return dia + '-' + mes + '-' + ano;
};


function main() {
  var pratoPrincipal;
  var numero_pessoas;
  var bebida;
  var sobremesa;
  var data;
  var hora;
  //var voltar = true; //se o aviso deve ser apresentado
  var voltar = checkCooking();
  
  $("#pesquisar_receita").click(function(){
    var alimento = document.forms["second"]["alimento"].value;
    $("table").find("tr:gt(0)").remove();
    //$("#resultados").css("display", "block");
    var pesquisa = get_receita(alimento);
    if (pesquisa != undefined) {
      for (var i = 0; i < pesquisa.length; i++) {
        $("table tr:last").after("<tr><td>"+pesquisa[i]+"</td><td><button class='w3-button w3-right'>Escolher</button></td></tr>");
      };
    } else {
      $("table tr:last").after("<tr><td colspan='2'>Não há receitas para este prato.</td></tr>");
    }
    $("#resultados").css("display", "block");
  });

  $(document).on("click", "table button", function(){
    $("table button").removeClass("selected-receita");
    $(this).toggleClass("selected-receita");

    var cols = [];
    $(this).closest('tr').find('td').each(function (colIndex, c){
      cols.push(c.textContent);
    });
    pratoPrincipal = cols[0];
    
    $("#2").removeClass("active-half");
    $("#2").addClass("active");
    $("#second_stage #proximo").prop("disabled", false);
  });

  $("#first_stage #proximo").click(function() {
    numero_pessoas = document.forms["first"]["num_pessoas"].value;
    $("#first_stage").css("display", "none");
    $("#second_stage").css("display", "block");
    $("#2").addClass("active-half");
  });
  
  $("#second_stage #proximo").click(function() {
    if (pratoPrincipal == undefined) {
      $("#second_stage #proximo").prop("disabled", true);
    } else {
      $("#second_stage #proximo").prop("disabled", false);
      $("#second_stage").css("display", "none");
      $("#third_stage").css("display", "block");
      $("#2").removeClass("active-half");
      $("#2, #3").addClass("active");
    }
  });
  $("#second_stage #anterior").click(function(){
    $("#first_stage").css("display", "block");
    $("#second_stage").css("display", "none");
    $("#2").removeClass("active");
  });
  
  $("#third_stage #proximo").click(function() {
    bebida = document.forms["third"]["bebida"].value;
    sobremesa = document.forms["third"]["sobremesa"].value;
    $("#third_stage").css("display", "none");
    $("#fourth_stage").css("display", "block");
    $("#4").addClass("active");
    
  });
  $("#third_stage #anterior").click(function(){
    $("#second_stage").css("display", "block");
    $("#third_stage").css("display", "none");
    $("#3").removeClass("active");
  });
  
  $("#fourth_stage #proximo").click(function() {
    data = document.forms["programarData"]["data"].value;
    hora = document.forms["programarData"]["hora"].value;
    
    data = dateFormat(data);
    
    
    $("#fourth_stage, #progress_refeicao").css("display", "none");
    $("#plano, #verificar").css("display", "block");
    
    $("#verificar_numero").text("Número de Pessoas: " + numero_pessoas);
    $("#verificar_prato").text("Prato Principal: " + pratoPrincipal);
    $("#verificar_bebida").text("Bebida: " + bebida);
    $("#verificar_sobremesa").text("Sobremesa: " + sobremesa);
    $("#verificar_data").text("Data: " + data);
    $("#verificar_hora").text("Hora (inicio): " + hora);
  });
  $("#fourth_stage #anterior").click(function(){
    $("#third_stage").css("display", "block");
    $("#fourth_stage").css("display", "none");
    $("#4").removeClass("active");
  });
  
  $("#1").click(function(){
    $("#second_stage, #third_stage, #fourth_stage").css("display", "none");
    $("#first_stage").css("display", "block");
  });
  
  $("#2").click(function(){
    $("#first_stage, #third_stage, #fourth_stage").css("display", "none");
    $("#second_stage").css("display", "block");
    if ($(this).hasClass("active") == false) {
      $(this).addClass("active-half");
    }
  });
  
  $("#3").click(function(){
    $("#first_stage, #second_stage, #fourth_stage").css("display", "none");
    $("#third_stage").css("display", "block");
    $(this).addClass("active");
  });
  
  $("#4").click(function(){
    $("#first_stage, #second_stage, #third_stage").css("display", "none");
    $("#fourth_stage").css("display", "block");
    $(this).addClass("active");
  });
  
  $("#proximo, #progress_refeicao li").click(function(){
    var isAtive = [$("#1").hasClass("active"), $("#2").hasClass("active"), $("#3").hasClass("active"), $("#4").hasClass("active")];
    if (isAtive.indexOf(false) == -1) {$("#fourth_stage #proximo").prop("disabled", false);} 
  });

  
  $("#confirmar").click(function(){
    var refeicaoAtiva = pratoPrincipal +';'+ hora;
    if (localStorage.getItem("refeicaoAtiva") == null) {
      localStorage.setItem("refeicaoAtiva", refeicaoAtiva);
    } else {
      localStorage["refeicaoAtiva"]+=refeicaoAtiva;
    }
    localStorage.setItem("Refeição", "on");
    localStorage.setItem("Refeição_prato", pratoPrincipal);
    
    voltar = checkCooking();
  });
  
  $("#verificar #cancelar").click(function() {
    $("#fourth_stage, #progress_refeicao").css("display", "block");
  });
  
  $("#nova_refeicao").click(function(){
    $("#escolherRefeicao, #first_stage, #progress_refeicao").css("display", "block");
    $("#cooking").css("display", "none");
    voltar = true;
  });
  
  $("#voltar").click(function(){
    if (voltar == true) {
      $("#escolherRefeicao").css("display", "none");
      $("#plano, #aviso").css("display", "block");
    } else {location.href='menu.html';}
  });
  
  $("#programarButton").click(function() {
    $('#programarData').toggleClass('display-none');
    $('#programarButton i').toggleClass('fa-angle-down');
    $('#programarButton i').toggleClass('fa-angle-up');
  });
  
  /*$("#modificar_refeicao").click(function(){
    
  });*/
  
};

$(document).ready(main);
