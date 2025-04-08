
function redirectToWhatsApp() {
    var phoneNumber = '82998271078'; 
    var message = 'Olá, gostaria de Comprar um óculos.'; 

    var whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
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