document.querySelectorAll('.box').forEach(card => {
  const nome = card.querySelector('img')?.alt || 'Produto';
  const img = card.querySelector('img')?.src || '';
  const botao = card.querySelector('.btn2');

  if (botao) {
    botao.onclick = () => {
      const numero = '82998271078';
      const msg = `Olá, gostaria de comprar o produto: *${nome}*%0AImagem: ${img}`;
      const url = `https://wa.me/${numero}?text=${msg}`;
      window.open(url, '_blank');
    };
  }
});



function openImage(src) {
const lightbox = document.getElementById("lightbox");
const img = document.getElementById("lightbox-img");
img.src = src;
lightbox.style.display = "flex";
}

function closeImage() {
document.getElementById("lightbox").style.display = "none";

}

