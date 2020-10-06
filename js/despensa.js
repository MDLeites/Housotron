function updateList() {
  if (localStorage.getItem("alimentosLista") == null || localStorage.getItem("alimentosLista") == "") {
    $("#lista_compras tr:last").after("<tr><td colspan='2'>Por favor, adicione alimentos à lista!</td></tr>");
    $("#online").prop("disabled", true);
    return [];
  } else {
    var lista = printLista();
    return lista;
  }
}


function printLista() {
  var lista = localStorage.getItem("alimentosLista").split(",");
  var quantidades = localStorage.getItem("alimentosLista_quantidades").split(",");
  for (var i=0; i<lista.length; i++){
    $("#lista_compras tr:last").after("<tr><td id='food'>"+lista[i]+"</td><td><input type='text' id='quantidade' class='w3-right' value='"+quantidades[i]+"'></td><td><div class='w3-left'><span id='add' class='fa fa-angle-up'></span><br><span id='rem' class='fa fa-angle-down'></span></div></td><td><button class='w3-button w3-right'><i class='fa fa-close'></i></button></td></tr>");
  }
  return lista;
}

function checkDisabled(lista) {
  for(var i = 0; i<lista.length; i++) {
    $("#escolha_compras tr").each(function() {
      if ($(this).text() == lista[i]) {
        $(this).addClass("disabled");
      }
    });
  };

};

function main() {
  var escolha = [];
  var lista_compras = updateList();
  if (lista_compras.length == 0) {
    var lista_compras_quantidades = [];
  } else {
    var lista_compras_quantidades = localStorage.getItem("alimentosLista_quantidades").split(",");
  }
  
  checkDisabled(lista_compras);

  $("#escolha_compras tr").click(function(){
    $(this).toggleClass("selected-despensa");
    if ($(this).hasClass("selected-despensa") && $(this).hasClass("disabled") == false) {
      escolha.push($(this).text());
    } else {
      var position = escolha.indexOf($(this).text());
      if (position != -1) { //está na lista com selected
        escolha.splice(position, 1);
      }
    };
  });

  $("#addFood").click(function() {
    if ($("#alimentos tr:last").text() == "Por favor, adicione alimentos à lista!") {
      $("#alimentos tr:last").remove();
    }
    for (var i = 0; i < escolha.length; i++) {
      var quantity = 1;
      $("#lista_compras tr:last").after("<tr><td id='food'>"+escolha[i]+"</td><td><input type='text' id='quantidade' class='w3-right' value='"+quantity+"'></td><td><div class='w3-left'><span id='add' class='fa fa-angle-up'></span><br><span id='rem' class='fa fa-angle-down'></span></div></td><td><button class='w3-button w3-right'><i class='fa fa-close'></i></button></td></tr>");
      lista_compras.push(escolha[i]);
      lista_compras_quantidades.push(quantity);
    };
    escolha = [];
    $("#escolha_compras tr").each(function(){
      if ($(this).hasClass("selected-despensa")) {
        $(this).removeClass("selected-despensa");
        $(this).addClass("disabled");
      }
    });
    localStorage["alimentosLista"] = lista_compras;
    localStorage["alimentosLista_quantidades"] = lista_compras_quantidades;
    $("#online").prop("disabled", false);
  });

  $(document).on("click", "#add", function(){
    var quantity = $(this).closest("tr").find('input').val();
    $(this).closest("tr").find('input').val(parseInt(quantity) + 1);
    
    var alimento = $(this).closest("tr").find('#food').text();
    lista_compras_quantidades[lista_compras.indexOf(alimento)] = parseInt(quantity) + 1;
    localStorage["alimentosLista_quantidades"] = lista_compras_quantidades;
  });
  
  $(document).on("click", "#rem", function(){
    var quantity = $(this).closest("tr").find('input').val();
    if (parseInt(quantity) != 1) {
      $(this).closest("tr").find('input').val(parseInt(quantity) - 1);
      
      var alimento = $(this).closest("tr").find('#food').text();
      lista_compras_quantidades[lista_compras.indexOf(alimento)] = parseInt(quantity) + 1;
      localStorage["alimentosLista_quantidades"] = lista_compras_quantidades;
    }
  });
  
  $(document).on("click", "#lista_compras button", function(){
    $(this).closest("tr").remove();
    var remover = $(this).closest("tr").find('#food').text();
    var position = lista_compras.indexOf(remover);
    lista_compras.splice(position, 1);
    lista_compras_quantidades.splice(position, 1);
    $("#escolha_compras tr").each(function(){
      if ($(this).text() == remover) {
        $(this).removeClass("disabled");
      }
    });
    localStorage["alimentosLista"] = lista_compras;
    localStorage["alimentosLista_quantidades"] = lista_compras_quantidades;
  });

  $("#online").click(function() {
    location.href='comprar.html';
  })
};

$(document).ready(main);
