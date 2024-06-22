<?php
function headersToArray($str) {
    $headers = array();
    $headersTmpArray = explode("\r\n", $str);
    $cookies = array();
    for ($i = 0; $i < count($headersTmpArray); ++$i) {
        if (strlen($headersTmpArray[$i]) > 0) {
            if (strpos($headersTmpArray[$i], ":")) {
                $headerName = substr($headersTmpArray[$i], 0, strpos($headersTmpArray[$i], ":"));
                $headerValue = substr($headersTmpArray[$i], strpos($headersTmpArray[$i], ":") + 1);
                if (strtolower(trim($headerName)) === 'set-cookie') {
                    $cookies[] = trim($headerValue);
                }
                $headers[$headerName] = $headerValue;
            }
        }
    }
    $headers['set-cookie'] = implode('; ', $cookies);
    return $headers;
}

function check($user, $paswd) {
	$_SESSION["server_cookie"] = "";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://liman.clk1test.pp.ua/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Host: liman.clk1test.pp.ua',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
        'Sec-Fetch-Dest: document',
        'Sec-Fetch-Mode: navigate',
        'Sec-Fetch-Site: none',
        'Sec-Fetch-User: ?1',
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_ENCODING , '');
    $data = array(
        'username' => $user,
        'password' => $paswd
    );
    $json_data = json_encode($data);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	
	curl_setopt($ch, CURLOPT_HEADER, true);
    $result = curl_exec($ch);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headerStr = substr($result, 0, $headerSize);
    $bodyStr = substr($result, $headerSize);
    $kod = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $headers = headersToArray($headerStr);
    curl_close($ch);
	$_SESSION["server_cookie"] = $headers["set-cookie"];
    return json_decode($bodyStr, true);
}

function tfa_login($code){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://liman.clk1test.pp.ua/sms.php?sms='.$code);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Host: liman.clk1test.pp.ua',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
        'Sec-Fetch-Dest: document',
        'Sec-Fetch-Mode: navigate',
        'Sec-Fetch-Site: none',
        'Sec-Fetch-User: ?1',
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_ENCODING , '');
    curl_setopt($ch, CURLOPT_COOKIE, $_SESSION["server_cookie"]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);
    return json_decode($result, true);
  }
?>