function deopa(){
    $(".dropdown-wrapper").removeClass("inactive");
    $(".dropdown-wrapper").removeClass("is-active");

 }
 function guncelleniyor(){
    swal.fire('Hata!','Bu ödeme yöntemi güncelleniyor','warning');
 }
 function yetersiz(){
    swal.fire('Hata!','Yetersiz Bakiye, Canlı Desteke İletişime Geçiniz','warning');
 }
 function openmodal(id){
closesmodal();

$("#"+id).removeClass("hidden");
$(".full-screen-container--tDOkN").removeClass("hidden");

}
function closesmodal(){
 $(".full-screen-container--tDOkN").addClass("hidden");

 $(".modal--Pplvp").addClass("hidden");
}
function closemodal(){
 $(".modal--with-banner").addClass("hidden");
}
function backModal(id){
if (id === "notifications" || id === "favourites"|| id === "settings") {
closemodal();
} 

else{
closemodal();
openmodal('profile');
}
}
function openmenu(){
   $("#burgerbutton").toggleClass("hidden");
   $("#xbutton").toggleClass("hidden");
   $("#xmenu").toggleClass("navbar-active--HCx__");
   } 
function openusermenu(){
   $(".icon--Z3mH6").toggleClass("expanded--W2OFu");
   $(".side-menu-wrapper--OD41n").toggleClass("not-visible--iK0Vj");
} 
function openbalancemenu(){
$(".dropdown--HJjq7").toggleClass("not-visible--ARwS7"); 
$(".icon--Z3mH6").toggleClass("expanded--W2OFu");
} 
function openmodals(id){
closemodals();
$(".user-profile-container").removeClass("hidden");
 
$("#"+id).removeClass("hidden");

}
function closemodals(id){
$(".my-profile-info-block").addClass("hidden");

}

 function destek(){
   Swal.fire({
    title: 'Hata!',
    icon: 'error',
    html: 'Hesap Hatası!, Canlı Desteke İletişime Geçiniz. <br> <button onclick="maximizeTawkToWidget()" class="swal2-confirm swal2-styled"><a href="#">Desteğe Bağlan</a></button>',
    showConfirmButton: false
});
}