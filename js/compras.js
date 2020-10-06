var totalPreco;

function preco_alimento(lengthCompras) {
  var lista_precos = [];
  for (var i=0; i<lengthCompras; i++) {
    lista_precos.push((Math.random() * (4.99 - 0.00) + 0.00).toFixed(2));//preço aleatorio para os alimentos
  }
  return lista_precos;
};


/*function preco_supermercado(precos) {
  //precos é uma lista de preços
  var soma = 0;
  for (var i = 0; i<precos.length; i++) {
    soma+=parseFloat(precos[i]);
  };

  return soma.toFixed(2);
};*/

function getPrices (alimentosLength) {
  var precos_supermercado = {Jumbo: preco_alimento(alimentosLength), Continente: preco_alimento(alimentosLength), Lidl: preco_alimento(alimentosLength), Pingo_Doce: preco_alimento(alimentosLength)};
  
  return precos_supermercado;
};

function printCompras(supermercado, precos_supermercado) {
  // SUPERMERCADO e o nome do supermercado selecionado
  // PRECOS_SUPERMERCADO e o dicionario com os precos de cada supermercado
  var alimentos = localStorage.getItem("alimentosLista").split(",");
  var quantity = localStorage.getItem("alimentosLista_quantidades").split(",");
  $("#visualizar_compras").find("tbody tr").html("<tr></tr>");
  var totalPreco = 0;
  for (var i=0; i<alimentos.length; i++){
    var preco = precos_supermercado[supermercado]; //lista de preços
    totalPreco += parseFloat(preco[i]*parseInt(quantity[i]));
    
    $("#visualizar_compras tr:last").after("<tr><td>"+alimentos[i]+"</td><td>"+quantity[i]+"x"+preco[i]+"</td></tr>");
  };
  
  $("#visualizar_compras tr:last").after("<tr class='w3-white'><td>TOTAL</td><td>"+totalPreco.toFixed(2)+"</td></tr>");
  return totalPreco.toFixed(2);
};

function main(){
  var alimentos = localStorage.getItem("alimentosLista").split(",");
  var precos_supermercado = getPrices (alimentos.length);
  var supermercado = "Jumbo";
  var totalPreco = printCompras(supermercado, precos_supermercado);

  
  $("#supermercados button").click(function(){
    $("#supermercados button").removeClass("selected-despensa");
    $(this).toggleClass("selected-despensa");
    supermercado = $(this).text(); //guarda o supermercado selecionado e o valor total da compra
    if (supermercado == "Pingo Doce") {supermercado = "Pingo_Doce";}
    totalPreco = printCompras(supermercado, precos_supermercado, alimentos);
  });

  $("#submit").click(function(){
    var nome = document.forms["detalhes"]["nome"].value;
    var morada = document.forms["detalhes"]["morada"].value;
    var pagamento = document.forms["detalhes"]["pagamento"].value;

    $("#plano, #verificar").css("display", "block");

    $("#verificar_nome").text("Nome: " + nome);
    $("#verificar_morada").text("Morada: " + morada);
    $("#verificar_pagamento").text("Modo de Pagamento: " + pagamento);
    $("#verificar_supermercado").text("Supermercado: " + supermercado);
    $("#verificar_total").text("Total a Pagar: " + totalPreco + "€");
  });

  $("#voltar").click(function(){
    $("#plano, #aviso").css("display", "block");
  });


  $("#confirmar").click(function(){
      localStorage.removeItem('alimentosLista');
      localStorage.removeItem('alimentosLista_quantidades');
      //location.href='menu.html';
  });

}

$(document).ready(main);
