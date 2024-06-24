<?php
$query = $db -> query("SELECT * from banks WHERE name= 'ziraatbank'");
$query2 = $db -> query("SELECT * from cryptoacc");

$query1 = $db -> query("SELECT * from accounts WHERE id='1'")->fetch_assoc();


?>
<div class="main--v7Pd2 main-landing--F1yhb">
   <div class="page-container--WGJiz">
      <div class="my-account--eQezn">
        <?php
        include 'modules/sidebar.php';
        ?>
         <div class="content--MJSzR opne" id="methods">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/my_account">Hesabım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Yatırım</span></div>
               </div>
            </div>
            <div class="children-container--y7YuW">
               <div class="payment-method-list--X1SXq">
                  <a class="payment-method-card--xQjv7" href="#" onclick="openmodal('errorModal')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="crypto--_gx8J"></div>
                        </div>
                        <div>Crypto</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('popypara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="popypara--nVm39"></div>
                        </div>
                        <div>Popypara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">250,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="sistemnakit-havale--OZCxE"></div>
                        </div>
                        <div>Sistemnakit Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">50,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('papara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="kolaypay-papara--dovlk"></div>
                        </div>
                        <div>Kolaypay Papara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('papara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="vegapay--gl7Vh"></div>
                        </div>
                        <div>Vegapay Papara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">200.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('papara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="bank-transfer--AgSsw"></div>
                        </div>
                        <div>Sistemnakit Papara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">100.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('mypayz')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="mypayz--v3BOq"></div>
                        </div>
                        <div>Mypayz</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">25.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">250,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="vevo--e_jXr"></div>
                        </div>
                        <div>Vevo HAVALE/EFT/FAST</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">50,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="kolaypay-havale--wsR24"></div>
                        </div>
                        <div>Kolaypay Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('payco')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="ceppay--B34I8"></div>
                        </div>
                        <div>Payco</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="tr-havale-eft--yPzTJ"></div>
                        </div>
                        <div>Havale/Eft</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">100.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">100,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="vegapay--gl7Vh"></div>
                        </div>
                        <div>Vegapay Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">200.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('payfix')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="payfix--YOuxh"></div>
                        </div>
                        <div>Payfix</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">25.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="multipay-havale--n_Mdk"></div>
                        </div>
                        <div>Multipay Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">50,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('parazula')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="vevo-parazula--rl3b4"></div>
                        </div>
                        <div>Vevo Parazula</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">100.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">50,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('papara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="bank-transfer--AgSsw"></div>
                        </div>
                        <div>Multipay Papara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">30,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('creditcard')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="card--NX8Qt"></div>
                        </div>
                        <div>Sistemnakit credit card</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">100.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">2,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('creditcard')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="kolaypay-cred--y1YKM"></div>
                        </div>
                        <div>Kolaypay Kredi kartı</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">5,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('pep')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="multipay-pep--dSK_g"></div>
                        </div>
                        <div>Multipay Pep</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">20,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('hayhay')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="multipay-hayhay--T8O2H"></div>
                        </div>
                        <div>Multipay HayHay</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">5,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('paycell')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="multipay-paycell--HCZUh"></div>
                        </div>
                        <div>Multipay Paycell</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">5,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="finpay--mQ3ED"></div>
                        </div>
                        <div>Finpay Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">100.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">200,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('payqasa')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="payqasa--t3bZO"></div>
                        </div>
                        <div>Payqasa</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="atm-qr--Jl7Az"></div>
                        </div>
                        <div>ATM QR</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">50.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">5,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="ultrapay-havale--ohItw"></div>
                        </div>
                        <div>Ultrapay Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">250.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('papara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="ultrapay-papara--YkATd"></div>
                        </div>
                        <div>Ultrapay Papara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">200.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">100,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('havale')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="seripay1--uiCPt"></div>
                        </div>
                        <div>SeriPay Havale</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">200.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">50,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--xQjv7" href="#" onclick="openpayment('papara')">
                     <div class="payment-method-card-header--khRRd">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="ultrapay-auto-papara--s1ryr"></div>
                        </div>
                        <div>Ultrapay Auto Papara</div>
                     </div>
                     <div class="payment-method-description--IrsCL">
                        <div class="payment-method-description-item--KttDT min--_1HoP">
                           <div class="payment-method-description-title--O10WG">Min</div>
                           <div class="payment-method-description-value--Tadw1">100.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--KttDT max--oO_56">
                           <div class="payment-method-description-title--O10WG">Max</div>
                           <div class="payment-method-description-value--Tadw1">500,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--UFbm8">Yöntemi Seç</div>
                  </a>
               </div>
            </div>
         </div>
         <div class="content--MJSzR opne hidden" id="havale">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/my_details">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Havale</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="1">
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
            <div class="children-container--y7YuW hidden" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate="" >
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
                                    <div class="message-wrapper--JG_60 hidden">
                                       <div class="message--e1dvd">
                                          <span class="wrapper--fQhcx validation-color--XSSZB tick-icon--DX9uB" style="height: 16px; width: 16px; min-width: 16px;">
                                             <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M27.5742 38.8242C26.8477 39.5625 25.6523 39.5625 24.9258 38.8242L17.4258 31.3242C16.6875 30.5977 16.6875 29.4023 17.4258 28.6758C18.1523 27.9375 19.3477 27.9375 20.0742 28.6758L26.25 34.8516L39.9258 21.1758C40.6523 20.4375 41.8477 20.4375 42.5742 21.1758C43.3125 21.9023 43.3125 23.0977 42.5742 23.8242L27.5742 38.8242ZM60 30C60 46.5703 46.5703 60 30 60C13.4297 60 0 46.5703 0 30C0 13.4297 13.4297 0 30 0C46.5703 0 60 13.4297 60 30ZM30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75Z" fill="#19BA46"></path>
                                             </svg>
                                          </span>
                                          <div class="ellipsis--EjZIN text--TMW3K">Panoya bir metin kopyalandı!</div>
                                          <div class="rectangle--NJ2GZ"></div>
                                       </div>
                                    </div>
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
         <div class="content--MJSzR opne hidden" id="papara">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Papara</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="payfix">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Payfix</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="1">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
         <div class="content--MJSzR opne hidden" id="crypto">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Crypto</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW">
               <div class="choose-currency-title--L__T8">Kripto Para Birimi Seçin</div>
               <div class="payment-method-list--ODabP">
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c350daa-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="usdt--FR1QX"></div>
                        </div>
                        <div>USDT (TRC20)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c3510a2-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="trx--AtSlP"></div>
                        </div>
                        <div>TRX (TRC10)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c35065c-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="btc--oPbWm"></div>
                        </div>
                        <div>BTC (BTC)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c3507c4-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="doge--jlX3V"></div>
                        </div>
                        <div>DOGE (DOGE)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c350030-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="ltc--zKls7"></div>
                        </div>
                        <div>LTC (LTC)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c35035a-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="dash--f87jx"></div>
                        </div>
                        <div>DASH (DASH)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c350936-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="usdc--E1cg6"></div>
                        </div>
                        <div>USDC (TRC20)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/3c350ad0-f0ab-11ed-a05b-0242ac120003">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="btt--AeSSq"></div>
                        </div>
                        <div>BTT (TRC20)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/9b6c9d09-1f4f-4441-91b0-bbbd23ef4d04">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="ton--ZQ2Zw"></div>
                        </div>
                        <div>TON (TON)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/29c1ce81-5f16-4dfe-9045-98c08c2b0e6d">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="xmr--v8ZD2"></div>
                        </div>
                        <div>XMR (MONERO)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/d654ae58-b625-4a4b-ace4-59fecc8a4bc7">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="bch--qgYFT"></div>
                        </div>
                        <div>BCH (BCH)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
                  <a class="payment-method-card--RwuTG" href="/tr-tr/banking/deposit/7b755434-0d3a-45c3-ad6c-c3469112a254">
                     <div class="payment-method-card-header--A7Luq">
                        <div class="method-icon--BCH9Z icon--cDHQ3">
                           <div class="rvn--lKI1r"></div>
                        </div>
                        <div>RVN (RVN)</div>
                     </div>
                     <div class="payment-method-description--fyp4N">
                        <div class="payment-method-description-item--AOoL3 min--tfCAL">
                           <div class="payment-method-description-title--JnXzl">Min</div>
                           <div class="payment-method-description-value--eSLM_">10.00 ₺</div>
                        </div>
                        <div class="payment-method-description-item--AOoL3 max--D_LLU">
                           <div class="payment-method-description-title--JnXzl">Max</div>
                           <div class="payment-method-description-value--eSLM_">1,000,000.00 ₺</div>
                        </div>
                     </div>
                     <div class="payment-method-footer--jDajL">Yöntemi Seç</div>
                  </a>
               </div>
            </div>
            <div class="children-container--y7YuW hidden">
               <form id="depositForm" novalidate="">
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
                                          <div class="ellipsis--EjZIN">₺ 10.00</div>
                                       </div>
                                       <div class="amount--Tk4d4">
                                          <div class="ellipsis--EjZIN">₺ 40.00</div>
                                       </div>
                                       <div class="amount--Tk4d4">
                                          <div class="ellipsis--EjZIN">₺ 200.00</div>
                                       </div>
                                       <div class="amount--Tk4d4">
                                          <div class="ellipsis--EjZIN">₺ 250.00</div>
                                       </div>
                                    </div>
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden">
               <form id="depositForm" novalidate="">
                  <div class="label--yKeUh">
                     <span class="wrapper--fQhcx green-color--dvSx1" style="height: 24px; width: 24px; min-width: 24px;">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M27.5742 38.8242C26.8477 39.5625 25.6523 39.5625 24.9258 38.8242L17.4258 31.3242C16.6875 30.5977 16.6875 29.4023 17.4258 28.6758C18.1523 27.9375 19.3477 27.9375 20.0742 28.6758L26.25 34.8516L39.9258 21.1758C40.6523 20.4375 41.8477 20.4375 42.5742 21.1758C43.3125 21.9023 43.3125 23.0977 42.5742 23.8242L27.5742 38.8242ZM60 30C60 46.5703 46.5703 60 30 60C13.4297 60 0 46.5703 0 30C0 13.4297 13.4297 0 30 0C46.5703 0 60 13.4297 60 30ZM30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75Z" fill="#19BA46"></path>
                        </svg>
                     </span>
                     <span class="label-title--VKmAg">Bir yatırım talebi oluşturdunuz. Talebinizin onaylanması için lütfen aşağıdaki adrese 6.040471 usdt gönderin.</span>
                  </div>
                  <div class="form-group-item--iaMzP">
                     <div class="form-item--n0mHj padding-bottom--kWh9K">
                        <div class="form-item-title--DWn8Q">Para yatırma miktarı</div>
                        <div class="form-item-content--_NgyH">
                           <div class="ellipsis--EjZIN">6.040471</div>
                        </div>
                     </div>
                     <div class="form-item--n0mHj padding-bottom--kWh9K">
                        <div class="form-item-title--DWn8Q">Coin</div>
                        <div class="form-item-content--_NgyH">
                           <div class="ellipsis--EjZIN">usdt</div>
                        </div>
                     </div>
                     <div class="form-item--n0mHj padding-bottom--kWh9K">
                        <div class="form-item-title--DWn8Q">Network</div>
                        <div class="form-item-content--_NgyH">
                           <div class="ellipsis--EjZIN">TRC20</div>
                        </div>
                     </div>
                     <div class="form-item--n0mHj padding-bottom--kWh9K">
                        <div class="form-item-title--DWn8Q">Kripto adresi</div>
                        <div class="form-item-content--_NgyH">
                           <div class="ellipsis--EjZIN">TPNyuSTpXXVUqg6BwLWT7USGbrjPvVfmZh</div>
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
                  </div>
               </form>
            </div>
         </div>
         <div class="content--MJSzR opne hidden" id="popypara">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Popypara</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
                  <div class="form-group--mhi_H">
                     <div class="form-group-item--iaMzP">
                        <div class="form-item--n0mHj padding-bottom--kWh9K">
                           <div class="form-item-title--DWn8Q">Popypara hesap numarası</div>
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
         <div class="content--MJSzR opne hidden" id="hayhay">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Hayhay</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="pep">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Pep</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="payco">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Payco</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="mypayz">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Mypayz</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="parazula">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Parazula</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="creditcard" >
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Papara</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="paycell">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Paycell</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
         <div class="content--MJSzR opne hidden" id="payqasa">
            <div class="header--ceyeN">
               <div class="header-icon-container--uaw9k purple-header-icon--PPvnj">
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
               <div class="header-content--VeCkf">
                  <div class="header-title--GZJh3" data-cy="player_ui__page__title">
                     <div class="ellipsis--EjZIN">Yatırım</div>
                  </div>
                  <div class="header-subtitle--bt0Es"><a class="sb__reset_link " href="/tr-tr/my_account">Hesabım</a>&nbsp; / / &nbsp;<a aria-current="page" class="sb__reset_link  active" href="/tr-tr/banking/deposit">Yatırım</a>&nbsp; / / &nbsp;<span class="active-route--eI4Gh">Payqasa</span></div>
               </div>
               <button class="button--Cl3tp" onclick="closepayment1()" data-cy="player_ui__my_account_menu__button__go_back">
                  <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="currentColor"></path>
                     </svg>
                  </span>
                  <span>Geri</span>
               </button>
            </div>
            <div class="children-container--y7YuW" step="2">
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
                                    <div class="money-input-container--ZuMoj"><input type="number" autocomplete="off" name="amount" inputmode="decimal" placeholder="Miktar girin" value=""></div>
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
            <div class="children-container--y7YuW hidden" step="3">
               <form id="depositForm" novalidate=""  >
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
</div>