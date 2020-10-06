function main() {
     var imageSrc;
     
     $("#changeImage img").click(function() {
          imageSrc = $(this).attr('src');
          $("#escolherImagem").attr('src', imageSrc);
          
          $("#plano, #definir").css("display", "block");
     });
     
     $("#definir #confirmar").click(function() {
          $("#definir").css('display', 'none');
          localStorage.setItem('imagemBloqueio', imageSrc);
     });
}

$(document).ready(main);