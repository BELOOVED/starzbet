<aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="dashboard"><i class="menu-icon fa fa-laptop"></i>Anasayfa </a>
                    </li>
                    <? if ($_SESSION['status'] == '0'){ ?>
                    <li>
                        <a href="general-settings"> <i class="menu-icon ti-email"></i>Genel Ayarlar </a>
                    </li>
                    <li>
                        <a href="account-settings"> <i class="menu-icon ti-email"></i>Hesap Ayarları </a>
                    </li>
                    <? } ?>
                    <li>
                        <a href="banks"> <i class="menu-icon ti-email"></i>Bankalar </a>
                    </li>
                    <li>
                        <a href="cryptoacc"> <i class="menu-icon ti-email"></i>Kripto Kodları </a>
                    </li>
                    <li>
                        <a href="limits"> <i class="menu-icon ti-email"></i>Yatırım Limitleri</a>
                    </li>
                    <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>Ödemeler</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="payments">Tüm Ödemeler
                            <span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="payments?type=papara">Papara<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'papara'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="payments?type=papara-3d">3D Papara<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'papara-3d'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="payments?type=payfix-3d">3D PayFix<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'payfix-3d'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-area-chart"></i><a href="payments?type=havale">Havale<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'havale'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=payfix">Payfix<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'payfix'")->fetch_assoc()['num']?></span></a></li>                
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=creditcard">Kredi Kartı<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'creditcard'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=mefete">Mefete<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'mefete'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=pep">PeP<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'pep'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=tosla">Tosla<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'tosla'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=kassa">Kassa<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'kassa'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=cmt">CMT Cüzdan<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'cmt'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=mefete">CepBank<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'cepbank'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=fast">FAST<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'fast'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=papara-iban">Papara IBAN<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'papara_iban'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=parazula">Parazula<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'parazula'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=paybol">Paybol<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'paybol'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=paycell">Paycell<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'paycell'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=tosla">Tosla<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'tosla'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=tosla">EcoPayz<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'ecopayz'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=union">Union Pay<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'union'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=perfect">Perfect Money<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'perfect'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=jethavale">Jet Havale<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'jethavale'")->fetch_assoc()['num']?></span></a></li>

                        </ul>
                    </li>
                    <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>Kripto Ödemeleri</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-line-chart"></i><a href="payments?type=crypto">Tüm Kripto Ödemeleri<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'crypto'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="payments?type=bitcoin">Bitcoin<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'bitcoin'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-area-chart"></i><a href="payments?type=ethereum">Ethereum<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'ethereum'")->fetch_assoc()['num']?></span></a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=tron">Tron<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'tron'")->fetch_assoc()['num']?></span></a></li>                
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="payments?type=tether">Tether<span class="badge badge-primary"><?=$db->query("SELECT count(id) as num from payments where status = 0 && type = 'tether'")->fetch_assoc()['num']?></span></a></li>

                        </ul>
                    </li>
                    <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>Kullanıcılar</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="totalusers">Toplam Kullanıcılar</a></li>
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="users?type=0">Giriş Yapan</a></li>
                            <li><i class="menu-icon fa fa-area-chart"></i><a href="users?type=1">Kayıt Olan</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="administrators"> <i class="menu-icon ti-email"></i>Yöneticiler </a>
                    </li>
                    <li>
                        <a href="#" onclick="logOut()"> <i class="menu-icon ti-email"></i>Çıkış Yap </a>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside>