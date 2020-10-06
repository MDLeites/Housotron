tarefas = ["Ar-Condicionado", "Máquina da Loiça", "Máquina da Roupa", "Aspirar", "Lavar o Chão", "Limpar o Pó", "Limpeza TOTAL"];

function orderTarefas(tarefas) {
  var result = []; //tarefas on
  for (var i=0; i<tarefas.length; i++) {
    var tarefa = localStorage.getItem(tarefas[i]);
    if (tarefa == "on") {result.push(localStorage.getItem(tarefas[i] + "_data") +', '+ tarefas[i]);}
  }
  result.sort(); // ordenar por data [menor, maior]
  var ordenarHoras = [];
  for (i=0; i<result.length; i++) {
    var resultado = result[i].split(', ');
    ordenarHoras.push(localStorage.getItem(resultado[1] + "_hora") +', '+ resultado[1]);
  };
  
  ordenarHoras.sort();
  tarefas = [];
  for (i=0; i<ordenarHoras.length; i++) {
    var ordenado = ordenarHoras[i].split(', ');
    var nome = ordenado[1];
    tarefas.push(nome);
  }
  return tarefas;
}

function update(tarefas) {
  var tarefasON = 0;
  for (var i = 0; i<tarefas.length; i++) {
    var tarefa = localStorage.getItem(tarefas[i]);
    if (tarefa == "on") {
      if (tarefas[i] == "Ar-Condicionado") {
        var nome = tarefas[i] + ' (' + localStorage.getItem(tarefas[i] + "_temperatura") + ')';
        $("#curso tbody tr:last").after(
        "<tr><td>"+nome+"</td><td>"+localStorage.getItem(tarefas[i] + "_local")+"</td><td>"+localStorage.getItem(tarefas[i] + "_data")+"</td><td>"+localStorage.getItem(tarefas[i] + "_hora")+"</td><td>"+getEndHour(localStorage.getItem(tarefas[i] + "_hora"))+"</td><td><button id='modify' class='w3-button'><i class='fa fa-pencil green-text w3-xlarge'></i></button><button id='remove' class='w3-button w3-right w3-margin-right'><i class='fa fa-remove red-text w3-xlarge'></i></button></td></tr>");
     
      } else {
        $("#curso tbody tr:last").after(
        "<tr><td>"+tarefas[i]+"</td><td>"+localStorage.getItem(tarefas[i] + "_local")+"</td><td>"+localStorage.getItem(tarefas[i] + "_data")+"</td><td>"+localStorage.getItem(tarefas[i] + "_hora")+"</td><td>"+getEndHour(localStorage.getItem(tarefas[i] + "_hora"))+"</td><td><button id='modify' class='w3-button'><i class='fa fa-pencil green-text w3-xlarge'></i></button><button id='remove' class='w3-button w3-right w3-margin-right'><i class='fa fa-remove red-text w3-xlarge'></i></button></td></tr>");
      }
      
      tarefasON ++;
    }
  }
  
  if (tarefasON == 0) {
    $("#curso tbody tr:last").after("<tr><td colspan='6'>De momento não há tarefas em curso !</td></tr>");
  }
};


function getEndHour(hora) {
    // formatp HH:MM
    var hour = parseInt(hora.split(':')[0]);
    var min = parseInt(hora.split(':')[1]);
    var finish = min + 59;
    if (finish >= 60) {
      min = finish - 60;
      hour += 1;
      if (hour >= 24) {
        hour -= 24;
      }
    }
    if (min < 10) {min = '0'+min;}
    if (hour < 10) {hour = '0'+hour;}
    return hour + ':' + min;
  }

function main() {
  tarefas = orderTarefas(tarefas);
  update(tarefas);
  var cols = [];
  $(document).on("click", "table #remove", function(){//$("table #remove").click(function(){
    if (cols.length != 0) {
      cols = []
    }
    $(this).closest('tr').find('td').each(function (colIndex, c){
      cols.push(c.textContent);
    });
    $("#plano, #aviso").css("display", "block");
    $("#tarefa").text("TAREFA: " + cols[0]);//$("#tarefa").text(cols.join(", "));
  });

  $("#confirmar").click(function(){
    var nome_tarefa = $("#tarefa").text().split(", ", 1);
    $("td").filter(function() {
      return $.text([this]) == nome_tarefa;
    }).closest("tr").remove();

    for (var i = 0; i<tarefas.length; i++) {
      var patt = new RegExp(tarefas[i]);
      if (patt.exec(nome_tarefa) != null) {
        localStorage[tarefas[i]] = "off";
      }
    }
    
    $('#plano').css('display', 'none');
    $('#plano').toggleClass('display-none');
  });

  $(document).on("click", "table #modify", function(){//$("table #modify").click(function(){
    if (cols.length != 0) {
      cols = []
    }
    $(this).closest('tr').find('td').each(function (colIndex, c){
      cols.push(c.textContent);
    });
    localStorage.setItem("designacao", cols[0]);

    location.href='modify.html';
  });
  
  
};

$(document).ready(main);
