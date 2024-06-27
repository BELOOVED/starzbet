<?php
$query = $db -> query("SELECT * from banks WHERE name= 'ziraatbank'");
$query2 = $db -> query("SELECT * from cryptoacc");

$query1 = $db -> query("SELECT * from accounts WHERE id='1'")->fetch_assoc();


?>
<div class="account-page--ncXf9 opne" style="margin-top: 80px;" data-cy="player_ui__page__content" id="methods">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Yatırım</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="/my_account">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c">
      <div class="container--lhCmQ">
         <div>
            <div class="table-header--mq47D">
               <div class="table-header-content--Lwp_k">Yöntem</div>
               <div class="table-header-item--pX0T0">Min</div>
               <div class="table-header-item--pX0T0">Max</div>
            </div>
            <div class="search-container--VnTSP">
               <div class="search--OK2fV">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <g clip-path="url(#clip0_123_3871)">
                           <path d="M11.7891 10.7861L9.48287 8.4798C10.1818 7.5648 10.5652 6.45496 10.5653 5.28383C10.5653 3.87251 10.0157 2.54556 9.01754 1.54761C8.01959 0.549669 6.69282 0 5.28132 0C3.86999 0 2.54304 0.549669 1.5451 1.54761C-0.515032 3.60792 -0.515032 6.9601 1.5451 9.02005C2.54304 10.0182 3.86999 10.5678 5.28132 10.5678C6.45244 10.5677 7.56228 10.1843 8.47729 9.48539L10.7836 11.7917C10.9223 11.9306 11.1044 12 11.2864 12C11.4683 12 11.6504 11.9306 11.7891 11.7917C12.0669 11.514 12.0669 11.0637 11.7891 10.7861ZM2.55068 8.01447C1.04508 6.50887 1.04526 4.05897 2.55068 2.5532C3.28004 1.82401 4.24986 1.42226 5.28132 1.42226C6.31294 1.42226 7.28259 1.82401 8.01195 2.5532C8.74131 3.28256 9.14306 4.25238 9.14306 5.28383C9.14306 6.31546 8.74131 7.28511 8.01195 8.01447C7.28259 8.74383 6.31294 9.14558 5.28132 9.14558C4.24986 9.14558 3.28004 8.74383 2.55068 8.01447Z" fill="currentColor"></path>
                        </g>
                        <defs>
                           <clipPath id="clip0_123_3871">
                              <rect width="11.9975" height="12" fill="white"></rect>
                           </clipPath>
                        </defs>
                     </svg>
                  </span>
                  <input placeholder="Ara..." class="sb__reset_input search-input--qlNdC" value="">
               </div>
            </div>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="crypto--_gx8J"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Crypto</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">10.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">1,000,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="popypara--nVm39"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Popypara</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">250,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="sistemnakit-havale--OZCxE"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Sistemnakit Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('papara')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="vegapay--gl7Vh"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Vegapay Papara</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">200.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('papara')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="bank-transfer--AgSsw"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Sistemnakit Papara</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="mypayz--v3BOq"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Mypayz</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">25.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">250,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="vevo--e_jXr"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Vevo HAVALE/EFT/FAST</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="kolaypay-havale--wsR24"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Kolaypay Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="ceppay--B34I8"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Payco</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">10.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">1,000,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="tr-havale-eft--yPzTJ"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Havale/Eft</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="vegapay--gl7Vh"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Vegapay Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">200.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('payfix')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="payfix--YOuxh"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Payfix</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">25.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="multipay-havale--n_Mdk"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Multipay Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="vevo-parazula--rl3b4"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Vevo Parazula</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('papara')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="bank-transfer--AgSsw"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Multipay Papara</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">30,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('creditcard')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="card--NX8Qt"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Sistemnakit credit card</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">2,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('creditcard')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="kolaypay-cred--y1YKM"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Kolaypay Kredi kartı</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">5,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="multipay-pep--dSK_g"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Multipay Pep</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">20,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="multipay-hayhay--T8O2H"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Multipay HayHay</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">5,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="multipay-paycell--HCZUh"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Multipay Paycell</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">5,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="finpay--mQ3ED"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Finpay Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">200,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openmodal('errorModal')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="payqasa--t3bZO"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Payqasa</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">10.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="atm-qr--Jl7Az"></div>
                  </div>
                  <div class="ellipsis--EjZIN">ATM QR</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">5,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="ultrapay-havale--ohItw"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Ultrapay Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">250.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('papara')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="ultrapay-papara--YkATd"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Ultrapay Papara</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">200.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('havale')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="seripay1--uiCPt"></div>
                  </div>
                  <div class="ellipsis--EjZIN">SeriPay Havale</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">200.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">50,000.00 ₺</div>
            </a>
            <a class="payment-method-card--mHu5K" href="#" onclick="openpayment('papara')">
               <div class="payment-method-card-content--q2G7C">
                  <div class="method-icon--BCH9Z icon--cDHQ3">
                     <div class="ultrapay-auto-papara--s1ryr"></div>
                  </div>
                  <div class="ellipsis--EjZIN">Ultrapay Auto Papara</div>
               </div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">100.00 ₺</div>
               <div class="ellipsis--EjZIN payment-method-description-item--n6EU4">500,000.00 ₺</div>
            </a>
         </div>
      </div>
   </div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="havale">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Sistemnakit Havale</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="1">
      <div class="container--Y_FfV">
         <div>
            <div class="choose-bank-title--aW1Hu">Bankanızı seçin</div>
            <div class="bank-account-list--jiBrh">
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687339958.svg" alt="Akbank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Akbank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340773.svg" alt="Albaraka Türk" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Albaraka Türk</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687349079.svg" alt="Alternatif Bank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Alternatif Bank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687349211.svg" alt="Anadolubank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Anadolubank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo">
                     <div class="default-icon--Ufudt"></div>
                  </div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Asya Katılım Bankası</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1694859964.svg" alt="Burganbank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Burganbank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340763.svg" alt="DenizBank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">DenizBank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340190.svg" alt="Enpara" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Enpara</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340807.svg" alt="Fibabanka" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Fibabanka</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340107.svg" alt="HSBC" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">HSBC</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340183.svg" alt="İNG" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">İNG</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340116.svg" alt="Kuveyt Türk" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Kuveyt Türk</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340014.svg" alt="QNB Finansbank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">QNB Finansbank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340126.svg" alt="Şekerbank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Şekerbank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340023.svg" alt="Garanti BBVA" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Garanti BBVA</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340031.svg" alt="Halkbank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Halkbank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340785.svg" alt="İşbank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">İşbank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340210.svg" alt="VakıfBank" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">VakıfBank</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340142.svg" alt="Ziraat Bankası" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Ziraat Bankası</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340795.svg" alt="TEB" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">TEB</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687348674.svg" alt="Türkiye Finans Bankası" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Türkiye Finans Bankası</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687349140.svg" alt="Vakıf Katılım Bankası" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Vakıf Katılım Bankası</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1687340221.svg" alt="Yapı Kredi" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Yapı Kredi</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
               <div class="card--JiQ_T">
                  <div class="card-icon--P5bA1 fixed-size--rRxXo"><img src="https://www.fixfin.co/uploads/bank_logo/1692605035.svg" alt="Ziraat Katılım" loading="lazy"></div>
                  <div class="content--EI6pT">
                     <div class="card-title--mM9MT">Ziraat Katılım</div>
                  </div>
                  <div class="select-button--ubxWp">Seç</div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="2">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('havale')">
            <div>
               <div class="bank-name-title--OvV9U">Akbank</div>
               <div class="form-group--mhi_H footer--NWSIY">
                  <div class="form-group-item--iaMzP">
                     <div class="field--O6vAn">
                        <div class="field-header--Fu_9j">
                           <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                        </div>
                        <div class="input-container--wGVcQ">
                           <div class="form-item--n0mHj">
                              <div class="amount-list--xFr8v">
                                 <div class="amount--Tk4d4">
                                    <div class="ellipsis--EjZIN">₺ 50.00</div>
                                 </div>
                                 <div class="amount--Tk4d4">
                                    <div class="ellipsis--EjZIN">₺ 200.00</div>
                                 </div>
                                 <div class="amount--Tk4d4">
                                    <div class="ellipsis--EjZIN">₺ 1,000.00</div>
                                 </div>
                                 <div class="amount--Tk4d4">
                                    <div class="ellipsis--EjZIN">₺ 1,250.00</div>
                                 </div>
                              </div>
                              <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                           </div>
                        </div>
                        <div class="field-footer--MxQJp"></div>
                     </div>
                     <div class="field--O6vAn">
                        <div class="field-header--Fu_9j">
                           <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                        </div>
                        <div class="input-container--wGVcQ">
                           <div class="select--Y0e4l">
                              <div class="select-input--dIp51" data-item="select-input">
                                 <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                 <div class="icon--Z3mH6">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <g>
                                          <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                       </g>
                                       <defs>
                                          <clipPath>
                                             <rect width="10" height="6" fill="white"></rect>
                                          </clipPath>
                                       </defs>
                                    </svg>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="field-footer--MxQJp"></div>
                     </div>
                     <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                        <div class="content--zBAVh">Yatırım</div>
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="">
               <div class="form-group--mhi_H">
                  <div class="form-group-item--iaMzP">
                     <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <?php while ($row = $query -> fetch_assoc()) { ?>
                        <div class="form-item-title--DWn8Q">IBAN</div>
                        <div class="form-item-content--_NgyH">
                           <div class="ellipsis--EjZIN"><?=$row['iban']?></div>
                           <div class="copy--qGwNJ">
                              <div>
                                 <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <g clip-path="url(#clip0_1711_86883)">
                                          <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                       </g>
                                       <defs>
                                          <clipPath id="clip0_1711_86883">
                                             <rect width="16" height="16" fill="white"></rect>
                                          </clipPath>
                                       </defs>
                                    </svg>
                                 </span>
                                 <div class="message-wrapper--JG_60 hidden"><div class="message--e1dvd"><span class="wrapper--fQhcx validation-color--XSSZB tick-icon--DX9uB" style="height: 16px; width: 16px; min-width: 16px;"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.5742 38.8242C26.8477 39.5625 25.6523 39.5625 24.9258 38.8242L17.4258 31.3242C16.6875 30.5977 16.6875 29.4023 17.4258 28.6758C18.1523 27.9375 19.3477 27.9375 20.0742 28.6758L26.25 34.8516L39.9258 21.1758C40.6523 20.4375 41.8477 20.4375 42.5742 21.1758C43.3125 21.9023 43.3125 23.0977 42.5742 23.8242L27.5742 38.8242ZM60 30C60 46.5703 46.5703 60 30 60C13.4297 60 0 46.5703 0 30C0 13.4297 13.4297 0 30 0C46.5703 0 60 13.4297 60 30ZM30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75Z" fill="#19BA46"></path></svg></span><div class="ellipsis--EjZIN text--TMW3K">Panoya bir metin kopyalandı!</div><div class="rectangle--NJ2GZ rectangle-mobile--vcE9L"></div></div></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="form-item--n0mHj padding-bottom--kWh9K">
                        <div class="form-item-title--DWn8Q">ALICI ADI SOYADI</div>
                        <div class="form-item-content--_NgyH">
                           <div class="ellipsis--EjZIN"><?=$row['account_holder']?></div>
                        </div>
                     </div>
                  </div>
                  <?}?>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="papara">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Vegapay Papara</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('papara')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="payfix">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Payfix</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" action="https://kolaydeposit.com/payfix/">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="crypto">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Vegapay Papara</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('papara')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="popypara">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">PopyPara</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('popypara')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">PopyPara hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['popypara_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Popypara tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['popypara_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="hayhay">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Hayhay</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('hayhay')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Hayhay hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['hayhay_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Hayhay tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['hayhay_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="pep">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Pep</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('pep')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Pep hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['pep_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Pep tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['pep_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="payco">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Payco</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('payco')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Payco hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['payco_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Payco tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['payco_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="mypayz">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Mypayz</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('mypayz')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Mypayz hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['mypayz_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Mypayz tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['mypayz_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="parazula">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Parazula</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('parazula')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Parazula hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['parazula_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Parazula tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['parazula_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="creditcard">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Vegapay Papara</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" action="https://kolaydeposit.com/payment/creditcard">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Papara tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['papara_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="paycell">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Paycell</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('paycell')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Paycell hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['paycell_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Paycell tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['paycell_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>
<div class="account-page--ncXf9 opne hidden" style="margin-top: 80px;" data-cy="player_ui__page__content" id="payqasa">
   <div class="header--vYF1H">
      <div class="header-icon-container--YW7yB purple-header-icon--KVFt8">
         <span class="wrapper--fQhcx white--ivynY" style="height: 16px; width: 16px; min-width: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <g clip-path="url(#clip0_117_5324)">
                  <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_117_5324">
                     <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </div>
      <div class="header-content--noKvf">
         <div class="header-title--FKONC" data-cy="player_ui__page__title">
            <div class="ellipsis--EjZIN">Yatırım</div>
         </div>
         <div class="header-subtitle--iKAlD"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--TfYYn">Payqasa</span></div>
      </div>
      <a class="back-button--lzFYE" data-cy="player_ui__my_account_menu__button__go_back" href="#" onclick="closepayment1()">
         <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_9336_569)">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"></path>
               </g>
               <defs>
                  <clipPath id="clip0_9336_569">
                     <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
               </defs>
            </svg>
         </span>
      </a>
   </div>
   <div class="children-container--tgv6c" step="2">
      <div class="container--Y_FfV">
         <div>
            <form id="depositForm" novalidate="" class="formsa" onsubmit="setPayment('payqasa')">
               <div>
                  <div class="form-group--mhi_H footer--NWSIY">
                     <div class="form-group-item--iaMzP">
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Para yatırma miktarı</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="form-item--n0mHj">
                                 <div class="amount-list--xFr8v">
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 200.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 800.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 4,000.00</div>
                                    </div>
                                    <div class="amount--Tk4d4">
                                       <div class="ellipsis--EjZIN">₺ 5,000.00</div>
                                    </div>
                                 </div>
                                 <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" name="amount" value=""></div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <div class="field--O6vAn">
                           <div class="field-header--Fu_9j">
                              <div class="label-group--Bl2OB"><label class="label--UCGot">Yatırım Bonusunu Seç</label></div>
                           </div>
                           <div class="input-container--wGVcQ">
                              <div class="select--Y0e4l">
                                 <div class="select-input--dIp51" data-item="select-input">
                                    <div class="ellipsis--EjZIN select-value--S3v2z">Bonus istemiyorum</div>
                                    <div class="icon--Z3mH6">
                                       <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g>
                                             <path d="M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z" fill="#97A2AF"></path>
                                          </g>
                                          <defs>
                                             <clipPath>
                                                <rect width="10" height="6" fill="white"></rect>
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="field-footer--MxQJp"></div>
                        </div>
                        <button class="button--AFbbH orange-gradient--N2nu6 button--Xk1Ls wide--nlvc7" type="submit">
                           <div class="content--zBAVh">Yatırım</div>
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="children-container--tgv6c hidden" step="3">
   <div class="container--Y_FfV">
      <div>
         <form id="depositForm" novalidate="">
            <div class="form-group--mhi_H">
               <div class="form-group-item--iaMzP">
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Payqasa hesap numarası</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['payqasa_number']?></div>
                        <div class="copy--qGwNJ">
                           <div>
                              <span class="wrapper--fQhcx copy-icon--_9IPL" style="height: 16px; width: 16px; min-width: 16px;">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1711_86883)">
                                       <path d="M14.3877 0H5.30462C4.8775 0.00162093 4.46835 0.172009 4.16633 0.474025C3.86432 0.77604 3.69393 1.1852 3.69231 1.61231V3.69231H1.61231C1.1852 3.69393 0.77604 3.86432 0.474025 4.16633C0.172009 4.46835 0.00162093 4.8775 0 5.30462V14.3877C0.00162093 14.8148 0.172009 15.224 0.474025 15.526C0.77604 15.828 1.1852 15.9984 1.61231 16H10.6954C11.1225 15.9984 11.5317 15.828 11.8337 15.526C12.1357 15.224 12.3061 14.8148 12.3077 14.3877V12.3077H14.3877C14.8148 12.3061 15.224 12.1357 15.526 11.8337C15.828 11.5317 15.9984 11.1225 16 10.6954V1.61231C15.9984 1.1852 15.828 0.77604 15.526 0.474025C15.224 0.172009 14.8148 0.00162093 14.3877 0ZM11.0769 14.3877C11.0769 14.4889 11.0367 14.5859 10.9652 14.6575C10.8936 14.729 10.7966 14.7692 10.6954 14.7692H1.61231C1.51112 14.7692 1.41407 14.729 1.34252 14.6575C1.27097 14.5859 1.23077 14.4889 1.23077 14.3877V5.30462C1.23077 5.20343 1.27097 5.10638 1.34252 5.03483C1.41407 4.96327 1.51112 4.92308 1.61231 4.92308H10.6954C10.7966 4.92308 10.8936 4.96327 10.9652 5.03483C11.0367 5.10638 11.0769 5.20343 11.0769 5.30462V14.3877ZM14.7692 10.6954C14.7692 10.7966 14.729 10.8936 14.6575 10.9652C14.5859 11.0367 14.4889 11.0769 14.3877 11.0769H12.3077V5.30462C12.3061 4.8775 12.1357 4.46835 11.8337 4.16633C11.5317 3.86432 11.1225 3.69393 10.6954 3.69231H4.92308V1.61231C4.92308 1.51112 4.96327 1.41407 5.03483 1.34252C5.10638 1.27097 5.20343 1.23077 5.30462 1.23077H14.3877C14.4889 1.23077 14.5859 1.27097 14.6575 1.34252C14.729 1.41407 14.7692 1.51112 14.7692 1.61231V10.6954Z" fill="currentColor"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1711_86883">
                                          <rect width="16" height="16" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="form-item--n0mHj padding-bottom--kWh9K">
                     <div class="form-item-title--DWn8Q">Payqasa tam adı</div>
                     <div class="form-item-content--_NgyH">
                        <div class="ellipsis--EjZIN"><?=$query1['payqasa_holder']?></div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
</div>