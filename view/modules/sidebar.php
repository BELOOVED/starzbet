<div class="sidebar--sXkeV" data-cy="player_ui__my_account_menu__container__menu">
            <div class="my-account--dzmfB" data-cy="player_ui__my_account_menu__container__profile">
               <div class="avatar--B42th"></div>
               <div class="username-container--xBcuW">
                  <div class="username--CzgA_">
                     <div class="ellipsis--EjZIN" data-cy="player_ui__my_account_menu__value__username"><?=$us['login']?></div>
                     <div>
                        <span class="wrapper--fQhcx blue-color--piLBm" style="height: 12px; width: 12px; min-width: 12px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <g clip-path="url(#clip0_3287_12354)">
                                 <path d="M15.6296 6.93069L14.5103 5.66337C14.2705 5.42574 14.1106 4.95049 14.1106 4.63366V3.36634C14.1106 2.49505 13.3911 1.86139 12.5916 1.86139H11.2325C10.9127 1.86139 10.433 1.70297 10.1932 1.46535L8.91405 0.356436C8.35442 -0.118812 7.47501 -0.118812 6.91538 0.356436L5.71618 1.46535C5.47634 1.70297 4.99666 1.86139 4.67688 1.86139H3.31778C2.43837 1.86139 1.7988 2.57426 1.7988 3.36634V4.71287C1.7988 5.0297 1.63891 5.50495 1.39907 5.74257L0.35976 7.0099C-0.11992 7.56436 -0.11992 8.43564 0.35976 8.9901L1.39907 10.2574C1.63891 10.495 1.7988 10.9703 1.7988 11.2871V12.6337C1.7988 13.5049 2.51832 14.1386 3.31778 14.1386H4.67688C4.99666 14.1386 5.47634 14.297 5.71618 14.5347L6.99533 15.6436C7.55496 16.1188 8.43437 16.1188 8.99399 15.6436L10.2731 14.5347C10.513 14.297 10.9927 14.1386 11.3124 14.1386H12.6715C13.551 14.1386 14.1905 13.4257 14.1905 12.6337V11.2871C14.1905 10.9703 14.3504 10.495 14.5903 10.2574L15.7095 8.9901C16.1092 8.43564 16.1092 7.48515 15.6296 6.93069ZM11.3124 6.45545L7.47501 10.2574C7.39506 10.3366 7.23517 10.4158 7.07528 10.4158C6.91538 10.4158 6.75549 10.3366 6.67554 10.2574L4.75682 8.35643C4.51698 8.11881 4.51698 7.72277 4.75682 7.48515C4.99666 7.24752 5.3964 7.24752 5.63624 7.48515L7.15522 8.9901L10.433 5.58416C10.6729 5.34653 11.0726 5.34653 11.3124 5.58416C11.5523 5.82178 11.5523 6.21782 11.3124 6.45545Z" fill="currentColor"></path>
                              </g>
                              <defs>
                                 <clipPath id="clip0_3287_12354">
                                    <rect width="16" height="16" fill="white"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                     </div>
                  </div>
                  <div class="amount--Ex7vp balance--jXXVM"><span>₺ <?=$us['balance']?></span><span>••••</span></div>
               </div>
            </div>
            <div class="menu--prt93" data-cy="player_ui__my_account_menu__container__navigation">
               <div>
                  <div class="expand-preview--OZ8md" data-cy="player_ui__my_account_menu__node__banking" onclick="openmenuu('mn1')">
                     <div class="expand-title--JUGJ0">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <g clip-path="url(#clip0_2476_20519)">
                                 <path d="M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z" fill="url(#paint0_linear_2476_20519)"></path>
                              </g>
                              <defs>
                                 <linearGradient id="paint0_linear_2476_20519" x1="0" y1="8" x2="16" y2="8" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#4891FF"></stop>
                                    <stop offset="1" stop-color="#7949FF"></stop>
                                 </linearGradient>
                                 <clipPath id="clip0_2476_20519">
                                    <rect width="16" height="16" fill="white"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                        <div class="ellipsis--EjZIN name--_kxYR">Finans İşlemleri</div>
                     </div>
                     <div class="icon--Z3mH6 expanded--W2OFu">
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
                  <div class="expand-items--iMOpi" id="mn1">
                     <a aria-current="page" class="expended-item--kxkpS active--dEiMl active" data-cy="player_ui__my_account_menu__menu_element__deposit" href="/deposit">
                        <div class="dot--Jp8NZ"></div>
                        <div class="expended-item-text--CcSre">
                           <div class="ellipsis--EjZIN">Yatırım</div>
                        </div>
                     </a>
                     <a class="expended-item--kxkpS" data-cy="player_ui__my_account_menu__menu_element__withdraw" href="/withdraw">
                        <div class="dot--Jp8NZ"></div>
                        <div class="expended-item-text--CcSre">
                           <div class="ellipsis--EjZIN">Çekim</div>
                        </div>
                     </a>
                     <a class="expended-item--kxkpS" data-cy="player_ui__my_account_menu__menu_element__payment_accounts" href="/payment_accounts">
                        <div class="dot--Jp8NZ"></div>
                        <div class="expended-item-text--CcSre capitalize--KW62w">
                           <div class="ellipsis--EjZIN">Ödeme hesapları</div>
                        </div>
                     </a>
                     <a class="expended-item--kxkpS" data-cy="player_ui__my_account_menu__menu_element__banking_history" href="/history">
                        <div class="dot--Jp8NZ"></div>
                        <div class="expended-item-text--CcSre">
                           <div class="ellipsis--EjZIN"> Geçmiş</div>
                        </div>
                     </a>
                  </div>
               </div>
               <div>
                  <div class="expand-preview--OZ8md" data-cy="player_ui__my_account_menu__node__my_account" onclick="openmenuu('mn2')">
                     <div class="expand-title--JUGJ0">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.00035 0C3.58234 0 0 3.58164 0 8C0 12.4184 3.58199 16 8.00035 16C12.4191 16 16.0007 12.4184 16.0007 8C16.0007 3.58164 12.4191 0 8.00035 0ZM8.00035 2.39209C9.46224 2.39209 10.6469 3.57707 10.6469 5.03826C10.6469 6.4998 9.46224 7.68443 8.00035 7.68443C6.53916 7.68443 5.35454 6.4998 5.35454 5.03826C5.35454 3.57707 6.53916 2.39209 8.00035 2.39209ZM7.99859 13.9084C6.54057 13.9084 5.20518 13.3774 4.17518 12.4985C3.92427 12.2845 3.77949 11.9707 3.77949 11.6414C3.77949 10.1595 4.97887 8.97342 6.46115 8.97342H9.54026C11.0229 8.97342 12.2177 10.1595 12.2177 11.6414C12.2177 11.971 12.0736 12.2841 11.8224 12.4981C10.7927 13.3774 9.45697 13.9084 7.99859 13.9084Z" fill="url(#paint0_linear_3248_25935)"></path>
                              <defs>
                                 <linearGradient id="paint0_linear_3248_25935" x1="-5.96073e-08" y1="8" x2="16.0007" y2="8" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FF9E00"></stop>
                                    <stop offset="1" stop-color="#FF6D00"></stop>
                                 </linearGradient>
                              </defs>
                           </svg>
                        </span>
                        <div class="ellipsis--EjZIN name--_kxYR">Hesabım</div>
                     </div>
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
                  <div class="expand-items--iMOpi hidden" id="mn2"><a class="expended-item--kxkpS" data-cy="player_ui__my_account_menu__menu_element__details" href="/my_details"><div class="dot--Jp8NZ"></div><div class="expended-item-text--CcSre"><div class="ellipsis--EjZIN">Detaylar</div></div></a></div>
               </div>
               <div>
                  <div class="expand-preview--OZ8md" data-cy="player_ui__my_account_menu__node__security" onclick="openmenuu('mn3')">
                     <div class="expand-title--JUGJ0">
                        <span class="wrapper--fQhcx dark-text-color--f1um7" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                              <g clip-path="url(#clip0_1002_92338)">
                                 <path d="M7.22071 5.31128C7.71291 5.52821 8.16812 5.81317 8.58098 6.16064V3.70447C8.58098 1.66196 6.98606 0 5.02594 0H4.97124C3.01288 0 1.41797 1.66196 1.41797 3.70447V6.16064C1.83081 5.81319 2.286 5.52823 2.77823 5.31128C2.91056 5.25245 3.04641 5.19913 3.18226 5.15133V3.70447C3.18226 2.67494 3.98501 1.83845 4.97301 1.83845H5.0277C6.0157 1.83845 6.81845 2.67494 6.81845 3.70447V5.15317C6.95252 5.19913 7.08839 5.25245 7.22071 5.31128Z" fill="currentColor"></path>
                                 <path d="M0 10.7901C0 13.6673 2.23888 16.0003 4.99999 16.0003C7.7611 16.0003 10 13.6691 10 10.7901C10 9.37636 9.45835 8.09312 8.58151 7.15366C8.08751 6.62604 7.48765 6.20686 6.81722 5.93295C6.25442 5.70314 5.64043 5.57812 5.00001 5.57812C4.35957 5.57812 3.7456 5.70314 3.18279 5.93295C2.51236 6.20504 1.91251 6.6242 1.4185 7.15366C0.539872 8.09312 0 9.37636 0 10.7901ZM3.71204 9.73853C3.72969 9.02705 4.28544 8.44794 4.96822 8.43138C5.69332 8.41299 6.2879 9.02154 6.2879 9.77345C6.2879 9.85252 6.28085 9.92971 6.2685 10.0033C6.20495 10.3838 5.98797 10.7111 5.68448 10.9096C5.55922 10.9924 5.49572 11.1468 5.5275 11.2957L5.91036 13.1875C5.93332 13.3014 5.85038 13.4099 5.73745 13.4099H4.26252C4.1496 13.4099 4.06667 13.3033 4.08962 13.1875L4.47245 11.2957C4.50244 11.1449 4.44069 10.9905 4.31545 10.9078C4.01199 10.7092 3.79498 10.3838 3.73145 10.0014C3.71734 9.91686 3.7103 9.82862 3.71204 9.73853Z" fill="currentColor"></path>
                              </g>
                              <defs>
                                 <clipPath id="clip0_1002_92338">
                                    <rect width="10" height="16" fill="white"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                        <div class="ellipsis--EjZIN name--_kxYR">Şifre Değiştir</div>
                     </div>
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
                  <div class="expand-items--iMOpi hidden" id="mn3"><a class="expended-item--kxkpS" data-cy="player_ui__my_account_menu__menu_element__security" href="/password"><div class="dot--Jp8NZ"></div><div class="expended-item-text--CcSre"><div class="ellipsis--EjZIN">Güvenlik</div></div></a><a class="expended-item--kxkpS" href="/2_fa"><div class="dot--Jp8NZ"></div><div class="expended-item-text--CcSre"><div class="ellipsis--EjZIN">2FA</div></div></a><a class="expended-item--kxkpS" href="/devices"><div class="dot--Jp8NZ"></div><div class="expended-item-text--CcSre"><div class="ellipsis--EjZIN">Cihazlar</div></div></a></div>
               </div>
               <div>
                  <div class="expand-preview--OZ8md" data-cy="player_ui__my_account_menu__node__help" onclick="openmenuu('mn4')">
                     <div class="expand-title--JUGJ0">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M14.6713 5.50441H14.0941C13.9362 5.50441 13.9309 5.39572 13.9254 5.34163C13.6227 2.34355 11.2027 0 8.27168 0H7.72832C4.819 0 2.41311 2.30894 2.0816 5.27519C2.07314 5.35118 2.06871 5.50441 1.93575 5.50441H1.32861C0.930136 5.50441 0 5.94518 0 8.17114V9.33936C0 10.9903 0.930136 11.371 1.32861 11.371H3.26024C3.65872 11.371 3.98473 11.0283 3.98473 10.6095V6.26599C3.98473 5.84711 3.65872 5.50441 3.26024 5.50441C3.26024 5.50441 3.1693 5.49602 3.19247 5.32574C3.51122 2.98144 5.41417 1.16476 7.72832 1.16476H8.27168C10.5701 1.16476 12.4781 2.95461 12.8011 5.27799C12.8116 5.3529 12.8504 5.50441 12.7398 5.50441C12.3413 5.50441 12.0153 5.84711 12.0153 6.26599V10.6095C12.0153 11.0283 12.3413 11.371 12.7398 11.371H13.1025C13.2022 11.371 13.1853 11.4548 13.1764 11.497C12.8809 12.8995 12.2174 14.4906 10.7282 14.4906H9.62516C9.51258 14.4906 9.4848 14.4039 9.46339 14.3628C9.28469 14.0196 8.93816 13.7868 8.53972 13.7868H7.52334C6.94196 13.7868 6.47062 14.2822 6.47062 14.8934C6.47062 15.5046 6.94196 16 7.52334 16H8.53972C8.94356 16 9.29418 15.7609 9.47066 15.4101C9.48608 15.3794 9.49871 15.3157 9.61784 15.3157H10.7282C11.7397 15.3157 13.0933 14.7873 13.7978 12.2701C13.8728 12.0018 13.9337 11.7345 13.9833 11.4768C13.9901 11.4414 13.9944 11.3711 14.0997 11.3711H14.6714C15.0699 11.3711 16 10.9903 16 9.3394V8.17119C16 5.97691 15.0698 5.50441 14.6713 5.50441Z" fill="currentColor"></path>
                           </svg>
                        </span>
                        <div class="ellipsis--EjZIN name--_kxYR">Yardım</div>
                     </div>
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
                  <div class="expand-items--iMOpi hidden" id="mn4"><a aria-current="page" class="expended-item--kxkpS active--dEiMl active" data-cy="player_ui__my_account_menu__menu_element__request_call_back" href="/call_requests"><div class="dot--Jp8NZ"></div><div class="expended-item-text--CcSre"><div class="ellipsis--EjZIN">Aranma talep et</div></div></a></div>
               </div>
               <div class="menu--eQSVE button-list--G78Bp">
                  <a class="menu-element--ITJgP with-icon-menu-element--JMwvG list-item--BFlho" data-cy="player_ui__my_account_menu__menu_element__notifications" href="/notifications">
                     <div class="icon--hFega">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_5259_98815)">
                                 <path d="M10.7707 17.373C10.7707 18.368 10.2426 19.1295 9.38493 19.6273C8.52753 20.1248 7.47106 20.1248 6.61526 19.6273C5.75733 19.1295 5.22949 18.368 5.22949 17.373" fill="currentColor"></path>
                                 <path d="M7.99973 0C8.75546 0 9.36415 0.468002 9.36415 1.1877C9.36415 1.64069 9.3799 1.97869 9.6633 2.06527C12.0732 2.79622 13.6186 4.50955 13.6186 6.73457V10.4743C13.6186 12.1876 14.3164 12.5345 15.1946 13.1898C16.4664 14.1374 16.1761 16.1104 14.7167 16.1091H1.28331C-0.176112 16.1104 -0.466448 14.1374 0.805374 13.1898C1.68252 12.5345 2.38141 12.1876 2.38141 10.4743V6.73457C2.38141 4.50955 3.92675 2.79622 6.33671 2.06527C6.6193 1.97869 6.63585 1.64069 6.63585 1.1877C6.63611 0.468002 7.24507 0 7.99973 0Z" fill="currentColor"></path>
                              </g>
                              <defs>
                                 <clipPath id="clip0_5259_98815">
                                    <rect width="16" height="20" fill="white"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                     </div>
                     <div class="ellipsis--EjZIN name--ZBoJI">Bildirimler</div>
                     <div class="counter--Wt5vy">
                        <div class="ellipsis--EjZIN counter-text--FJcLN">7</div>
                     </div>
                  </a>
                  <a class="menu-element--ITJgP with-icon-menu-element--JMwvG list-item--BFlho" data-cy="player_ui__my_account_menu__menu_element__messages" href="/tickets">
                     <div class="icon--hFega">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.9997 5C21.9997 6.10457 21.1042 7 19.9997 7C18.8951 7 17.9997 6.10457 17.9997 5C17.9997 3.89543 18.8951 3 19.9997 3C21.1042 3 21.9997 3.89543 21.9997 5Z" fill="currentColor"></path>
                              <path d="M17.0667 3.08906C16.708 3.63847 16.4995 4.29489 16.4995 5C16.4995 6.20645 17.1099 7.27032 18.0388 7.89963C16.6129 9.32276 15.5428 10.3684 14.6066 11.0827C13.5811 11.8651 12.805 12.1789 11.9994 12.1789C11.1938 12.1789 10.4176 11.8651 9.39213 11.0827C8.34932 10.287 7.1403 9.08027 5.45864 7.39861L3.51538 5.45535L3.10836 5.09007L2.99951 5C3.30791 4.57553 3.63611 4.26331 4.06059 3.95491C5.37491 3 7.24978 3 10.9995 3H12.9995C14.7 3 16.0148 3 17.0667 3.08906Z" fill="currentColor"></path>
                              <path d="M19.5844 8.47564L19.5602 8.49986C17.9279 10.1321 16.6487 11.4113 15.5165 12.2752C14.3576 13.1594 13.2648 13.6789 11.9994 13.6789C10.7339 13.6789 9.64119 13.1594 8.48226 12.2752C7.35 11.4113 6.07082 10.1321 4.43855 8.49984L2.48337 6.54466L2.33273 6.40947C1.99951 7.64946 1.99951 9.36008 1.99951 12C1.99951 15.7497 1.99951 17.6246 2.95443 18.9389C3.26282 19.3634 3.63611 19.7367 4.06059 20.0451C5.37491 21 7.24978 21 10.9995 21H12.9995C16.7492 21 18.6241 21 19.9384 20.0451C20.3629 19.7367 20.7362 19.3634 21.0446 18.9389C21.9995 17.6246 21.9995 15.7497 21.9995 12C21.9995 10.2996 21.9995 8.98474 21.9105 7.93286C21.4081 8.26082 20.8163 8.4632 20.1796 8.49545C20.1237 8.49828 20.0674 8.4998 20.0108 8.49998C20.0071 8.49999 20.0034 8.5 19.9997 8.5C19.8939 8.5 19.7892 8.49531 19.6859 8.48614C19.6519 8.48312 19.6181 8.47962 19.5844 8.47564Z" fill="currentColor"></path>
                           </svg>
                        </span>
                     </div>
                     <div class="ellipsis--EjZIN name--ZBoJI">Dekont Gönder</div>
                  </a>
                  <a class="menu-element--ITJgP with-icon-menu-element--JMwvG list-item--BFlho" data-cy="player_ui__my_account_menu__menu_element__offers" href="/available">
                     <div class="icon--hFega">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <g clip-path="url(#clip0_3248_25537)">
                                 <path d="M1.33325 9.67847H7.49992V15.9999H2.49992C1.85992 15.9999 1.33325 15.4743 1.33325 14.8355V9.67847Z" fill="currentColor"></path>
                                 <path d="M14.6667 9.67847V14.8355C14.6667 15.4743 14.14 15.9999 13.5 15.9999H8.5V9.67847H14.6667Z" fill="currentColor"></path>
                                 <path d="M0 5.85235V7.5159C0 8.1547 0.526667 8.68038 1.16667 8.68038H1.33333H7.5V7.68225V4.68787H1.16667C0.526667 4.68787 0 5.21355 0 5.85235Z" fill="currentColor"></path>
                                 <path d="M14.8333 4.68787H8.5V7.68225V8.68038H14.6667H14.8333C15.4733 8.68038 16 8.1547 16 7.5159V5.85235C16 5.21355 15.4733 4.68787 14.8333 4.68787Z" fill="currentColor"></path>
                                 <path d="M8.00006 5.38257C7.85473 5.38257 7.71606 5.31936 7.62206 5.20957C7.52673 5.09977 7.48473 4.95404 7.5054 4.81031C7.75207 3.14677 9.05407 0 12.2194 0C14.0261 0.000665419 14.6667 0.974839 14.6667 1.80927C14.6667 3.29249 12.5981 5.38257 8.00006 5.38257ZM12.2194 0.998794C9.8314 0.998794 8.92473 3.26455 8.62406 4.36981C10.5081 4.28197 11.6961 3.8062 12.3801 3.40096C13.3287 2.83868 13.6667 2.20986 13.6667 1.80861C13.6667 1.21106 12.9194 0.998794 12.2194 0.998794Z" fill="currentColor"></path>
                                 <path d="M8.00065 5.38252C3.40265 5.38252 1.33398 3.29244 1.33398 1.80922C1.33398 0.974784 1.97532 0.000610352 3.78198 0.000610352C6.94665 0.000610352 8.24865 3.14738 8.49532 4.81092C8.51599 4.95465 8.47398 5.10038 8.37865 5.21018C8.28465 5.3193 8.14598 5.38252 8.00065 5.38252ZM3.78198 0.998739C3.08198 0.998739 2.33398 1.21167 2.33398 1.80922C2.33398 2.65896 3.82265 4.20739 7.37598 4.37042C7.07598 3.26449 6.16932 0.998739 3.78198 0.998739Z" fill="currentColor"></path>
                              </g>
                              <defs>
                                 <clipPath id="clip0_3248_25537">
                                    <rect width="16" height="16" fill="white"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                     </div>
                     <div class="ellipsis--EjZIN name--ZBoJI">Bonuslar</div>
                  </a>
                  <a class="menu-element--ITJgP with-icon-menu-element--JMwvG list-item--BFlho" data-cy="player_ui__my_account_menu__menu_element__vip_club" href="/vip">
                     <div class="icon--hFega">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_6704_660094)">
                                 <path d="M19.2853 5.71456L14.9996 10.0003L9.99958 2.85742L4.99958 10.0003L0.713867 5.71456V15.0003C0.713867 15.5686 0.939632 16.1136 1.3415 16.5155C1.74336 16.9174 2.2884 17.1431 2.85672 17.1431H17.1424C17.7108 17.1431 18.2558 16.9174 18.6577 16.5155C19.0595 16.1136 19.2853 15.5686 19.2853 15.0003V5.71456Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              </g>
                              <defs>
                                 <clipPath id="clip0_6704_660094">
                                    <rect width="20" height="20" fill="white"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                     </div>
                     <div class="ellipsis--EjZIN name--ZBoJI">VIP Kulüp</div>
                  </a>
                  <a class="menu-element--ITJgP with-icon-menu-element--JMwvG list-item--BFlho" data-cy="player_ui__my_account_menu__menu_element__history" href="/account">
                     <div class="icon--hFega">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M0.468054 12.1999H12.7186C12.8285 12.1999 12.9347 12.1617 13.0189 12.0919C13.1366 11.9938 15.8206 9.69518 15.9843 4.73328H2.82747C2.66443 9.23735 0.19251 11.3544 0.166821 11.3755C0.0162208 11.5022 -0.0391879 11.7091 0.0285651 11.8932C0.0958494 12.0769 0.271201 12.1999 0.468054 12.1999Z" fill="url(#paint0_linear_3248_25797)"></path>
                              <path d="M15.5311 1.93333H13.1872V1.46667C13.1872 1.20533 12.981 1 12.7185 1C12.4559 1 12.2497 1.20533 12.2497 1.46667V1.93333H9.87458V1.46667C9.87458 1.20533 9.66832 1 9.40581 1C9.1433 1 8.93704 1.20533 8.93704 1.46667V1.93333H6.59319V1.46667C6.59319 1.20533 6.38693 1 6.12441 1C5.8619 1 5.65564 1.20533 5.65564 1.46667V1.93333H3.31179C3.04928 1.93333 2.84302 2.13866 2.84302 2.4V3.79999H15.9999V2.4C15.9999 2.13866 15.7936 1.93333 15.5311 1.93333Z" fill="url(#paint1_linear_3248_25797)"></path>
                              <path d="M13.621 12.8075C13.3665 13.0185 13.0469 13.1333 12.7187 13.1333H2.84326V14.5333C2.84326 14.7913 3.05293 15 3.31203 15H15.5313C15.7904 15 16.0001 14.7913 16.0001 14.5333V9.30212C15.0963 11.5095 13.8351 12.629 13.621 12.8075Z" fill="url(#paint2_linear_3248_25797)"></path>
                              <defs>
                                 <linearGradient id="paint0_linear_3248_25797" x1="-5.95462e-08" y1="8.4666" x2="15.9843" y2="8.4666" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="currentColor"></stop>
                                    <stop offset="1" stop-color="currentColor"></stop>
                                 </linearGradient>
                                 <linearGradient id="paint1_linear_3248_25797" x1="2.84302" y1="2.4" x2="15.9999" y2="2.4" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="currentColor"></stop>
                                    <stop offset="1" stop-color="currentColor"></stop>
                                 </linearGradient>
                                 <linearGradient id="paint2_linear_3248_25797" x1="2.84326" y1="12.1511" x2="16.0001" y2="12.1511" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="currentColor"></stop>
                                    <stop offset="1" stop-color="currentColor"></stop>
                                 </linearGradient>
                              </defs>
                           </svg>
                        </span>
                     </div>
                     <div class="ellipsis--EjZIN name--ZBoJI"> Geçmiş</div>
                  </a>
                  <a aria-current="page" class="menu-element--ITJgP with-icon-menu-element--JMwvG list-item--BFlho active" href="#" onclick="maximizeTawkToWidget()">
                     <div class="icon--hFega">
                        <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                           <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_1775_148867)">
                                 <path d="M31.5 7H24.5V8.75H31.5C32.4647 8.75 33.25 9.53531 33.25 10.5V21C33.25 21.9647 32.4647 22.75 31.5 22.75H28V25.4609L23.2094 22.75H17.5C16.5353 22.75 15.75 21.9647 15.75 21V19.25L14 19.2498V20.9987C14 22.9264 15.5723 24.4495 17.4508 24.4495L22.75 24.5L28.7055 27.8704C28.8258 27.9617 28.9625 28 29.0938 28C29.4383 28 29.75 27.732 29.75 27.3438V24.4984H31.5C33.4277 24.4984 35 22.9261 35 21.0476V10.4508C35 8.56953 33.4305 7 31.5 7ZM22.75 14V3.45078C22.75 1.57227 21.1805 0 19.25 0H3.5C1.57227 0 0 1.57227 0 3.45078V13.9508C0 15.9305 1.57227 17.5 3.5 17.5L5.25 17.5006V20.3438C5.25 20.732 5.56719 21 5.90625 21C6.03613 21 6.17285 20.959 6.2959 20.8701L12.25 17.5L19.25 17.4959C21.1805 17.4945 22.75 15.9305 22.75 14ZM11.7906 15.75L7 18.4625V15.75H3.5C2.53531 15.75 1.75 14.9625 1.75 14V3.5C1.75 2.53531 2.53531 1.75 3.5 1.75H19.25C20.2147 1.75 21 2.53531 21 3.5V14C21 14.9647 20.2147 15.75 19.25 15.75H11.7906Z" fill="currentColor"></path>
                              </g>
                              <defs>
                                 <clipPath id="clip0_1775_148867">
                                    <rect width="35" height="28" fill="currentColor"></rect>
                                 </clipPath>
                              </defs>
                           </svg>
                        </span>
                     </div>
                     <div class="ellipsis--EjZIN name--ZBoJI">Canlı Sohbet</div>
                  </a>
               </div>
               <div class="logout--rzYJm logout--y9_Ct" onclick="logOut()">
                  <div>
                     <span class="wrapper--fQhcx" style="height: 16px; width: 16px; min-width: 16px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                           <g clip-path="url(#clip0_2480_31712)">
                              <path d="M11.852 15.25C11.852 15.4489 11.7613 15.6397 11.5997 15.7803C11.4382 15.921 11.2191 16 10.9907 16H2.87101C2.10984 15.9993 1.38008 15.7356 0.841845 15.2669C0.30361 14.7983 0.000854884 14.1628 0 13.5V2.5C0.000854884 1.83719 0.30361 1.20173 0.841845 0.733055C1.38008 0.264376 2.10984 0.000744409 2.87101 0L10.9907 0C11.2191 0 11.4382 0.0790176 11.5997 0.21967C11.7613 0.360322 11.852 0.551088 11.852 0.75C11.852 0.948912 11.7613 1.13968 11.5997 1.28033C11.4382 1.42098 11.2191 1.5 10.9907 1.5H2.87101C2.56654 1.50029 2.27463 1.60574 2.05934 1.79321C1.84404 1.98069 1.72294 2.23487 1.72261 2.5V13.5C1.72293 13.7651 1.84403 14.0193 2.05933 14.2068C2.27462 14.3943 2.56654 14.4997 2.87101 14.5H10.9907C11.2191 14.5 11.4382 14.579 11.5997 14.7197C11.7613 14.8603 11.852 15.0511 11.852 15.25ZM15.7477 7.46969L11.6547 3.90556C11.5751 3.83464 11.48 3.77819 11.3752 3.73946C11.2703 3.70074 11.1576 3.68052 11.0437 3.67997C10.9298 3.67942 10.8169 3.69855 10.7115 3.73626C10.6061 3.77397 10.5104 3.82951 10.4299 3.89966C10.3493 3.9698 10.2855 4.05317 10.2422 4.14492C10.199 4.23668 10.177 4.335 10.1776 4.4342C10.1783 4.53339 10.2015 4.63149 10.246 4.72282C10.2905 4.81414 10.3553 4.89687 10.4368 4.96622L13.0593 7.25H6.27887C6.05044 7.25 5.83137 7.32902 5.66984 7.46967C5.50831 7.61032 5.41757 7.80109 5.41757 8C5.41757 8.19891 5.50831 8.38968 5.66984 8.53033C5.83137 8.67098 6.05044 8.75 6.27887 8.75H13.0593L10.4366 11.0337C10.3563 11.1033 10.2925 11.186 10.2489 11.2771C10.2054 11.3682 10.1829 11.4658 10.1827 11.5645C10.1826 11.6632 10.2048 11.7609 10.2481 11.8521C10.2913 11.9432 10.3549 12.0261 10.435 12.0958C10.5151 12.1656 10.6102 12.2209 10.715 12.2586C10.8197 12.2963 10.9319 12.3157 11.0452 12.3155C11.1585 12.3154 11.2707 12.2958 11.3752 12.2578C11.4798 12.2199 11.5748 12.1644 11.6547 12.0944L15.7477 8.53034C15.9093 8.38969 16 8.19893 16 8.00002C16 7.8011 15.9093 7.61034 15.7477 7.46969Z" fill="currentColor"></path>
                           </g>
                           <defs>
                              <clipPath id="clip0_2480_31712">
                                 <rect width="16" height="16" fill="currentColor"></rect>
                              </clipPath>
                           </defs>
                        </svg>
                     </span>
                  </div>
                  <div class="ellipsis--EjZIN name--EukCA" data-cy="player_ui__my_account_menu__button__logout">Çıkış Yap</div>
               </div>
            </div>
         </div>