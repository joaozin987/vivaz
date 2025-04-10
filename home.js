
  function redirectToWhatsApp(modelo, imagemURL) {
    const numero = '82998271078';
    const mensagem = `Olá, gostaria de comprar um óculos.\nModelo: ${modelo}\nVeja a imagem: ${imagemURL}`;
    const url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem);
    window.open(url, '_blank');
  }




function openImage(src) {
const lightbox = document.getElementById("lightbox");
const img = document.getElementById("lightbox-img");
img.src = src;
lightbox.style.display = "flex";
}

function closeImage() {
document.getElementById("lightbox").style.display = "none";

}
