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
function openusermenu(){
$("#user-settings").toggleClass("active");
} 
function openbalancemenu(){
$("#balance-menu").toggleClass("active");
} 
function openmodals(id){
closemodals();
$(".user-profile-container").removeClass("hidden");
 
$("#"+id).removeClass("hidden");

}
function closemodals(id){
$(".my-profile-info-block").addClass("hidden");

}