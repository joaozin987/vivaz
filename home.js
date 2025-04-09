
function redirectToWhatsApp(modelo, imagemURL) {
    const phoneNumber = '82998271078'; 
    const message = `Olá, gostaria de comprar um óculos.\nModelo: ${modelo}\nImagem: ${imagemURL}`;
    
    const whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
    window.location.href = whatsappUrl; 
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