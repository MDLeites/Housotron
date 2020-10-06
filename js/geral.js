function validate() {
  var inputsWithValues = 0;

  var myInputs = $("input:not([type='submit'], [type='date'], [type='time'])");

  myInputs.each(function(e) {
    if ($(this).val()) {
      inputsWithValues += 1;
    }
  });
  
  if (inputsWithValues == myInputs.length) {
    $("#submit, #addFood").prop("disabled", false);
  } else {
    $("#submit, #addFood").prop("disabled", true);
  }
};


function valueDateTime () {
  var d = new Date;
  var dia = d.getDate();
  var mes = d.getMonth();
  var ano = d.getFullYear();
  var hora = d.getHours();
  var min = d.getMinutes();
  
  if (min < 10) {min = '0'+min;}
  if (hora < 10) {hora = '0'+hora;}
  
  $("input[type='date']").val(ano+'-'+mes+'-'+dia);
  $("input[type='time']").val(hora+':'+min);
}


function main() {
  valueDateTime ();
  
  $(document).on("click", "#sucesso", function(){//$('#sucesso').on('click', function(){
    $('#sucesso, #plano').css('display', 'none');
    location.reload();
  });

  $(document).on("click", "#close", function() {
    $('#verificar, #plano').css('display', 'none');
    $('#information').toggleClass('display-none');
    $("#infoButton").removeClass("selected");
  });

  $(document).on("click", "#confirmar", function(){//$("#confirmar").click(function(){
    $('#verificar, #aviso, #programar_tarefa, #programar_tarefa_eletrod, #escolherRefeicao').css('display', 'none');
    $('#sucesso, #plano').css('display', 'block');
  });

  $(document).on("click", "#cancelar", function(){//$("#cancelar").click(function(){
    $('#plano, #verificar, #aviso, #prosseguir').css('display', 'none');
    $("#escolherRefeicao").css("display", "block");
  });

  $(document).on("click", "#infoButton", function(){//$("#infoButton").click(function(){
    $('#information').toggleClass('display-none');
    $(this).toggleClass("selected");
  });

  validate();
  $('input').on('keyup', validate);


}

$(document).ready(main);
