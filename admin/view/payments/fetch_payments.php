<?php
include '../../../inc/config.php';
$query = $db->query("SELECT * FROM payments ORDER BY id DESC");
 $status = [
            array('title' => 'Bekliyor', 'icon' => 'pending'),
            array('title' => 'Onaylandı', 'icon' => 'complete'),
            array('title' => 'İptal Edildi', 'icon' => 'danger'),
            array('title' => 'SMS Onayında', 'icon' => 'primary')
          ];
$order = $db -> query("SELECT id as num from payments where id")->fetch_assoc()['num'];
while ($res = $query->fetch_assoc()) {
    echo '<tr>';
    echo '<td class="serial">' . $order . '</td>';
    echo '<td><span class="">' . $res['user'] . '</span></td>';
    echo '<td><span class="">' . $res['identity'] . '</span></td>';
    echo '<td><span class="">' . $res['type'] . '</span></td>';
    echo '<td><span class="">' . $res['sender_phone'] . '</span></td>';
    echo '<td><span class="">' . $res['ip'] . '</span></td>';
    echo '<td><span class="">' . $res['full_name'] . '</span></td>';
    echo '<td><span class="">' . explode(' ', $res['time'])[0] . '</span></td>';
    echo '<td><span class="">' . explode(' ', $res['time'])[1] . '</span></td>';
    echo '<td><span class="">' . $res['amount'] . ' TL</span></td>';
    echo '<td class="status">';
    echo '<div class="dflex align-center">';
    echo '<span class="badge badge-' . $status[$res['status']]['icon'] . '">' . $status[$res['status']]['title'] . '</span>';
    echo '</div>';
    echo '</td>';
    echo '<td>';
    echo '<div class="btn-group" role="group">';
    echo '<ul class="dflex">';

    $btnActions = array(
    'SMS' => array('class' => 'btn-primary', 'status' => 3),
    'Beklet' => array('class' => 'btn-warning', 'status' => 0),
    'Onayla' => array('class' => 'btn-success', 'status' => 1),
    'İptal Et' => array('class' => 'btn-danger', 'status' => 2)
);

    foreach ($btnActions as $text => $data) {
    echo '<button class="btn ' . $data['class'] . '" onclick="changeStatus(' . $res['id'] . ', ' . $data['status'] . ' , ' . $res['user_id'] . ', ' . $res['amount'] . ')" class="btn btn-default btn-sm">' . $text . '</button>';
}

    echo '</ul>';
    echo '</div>';
    echo '</td>';
    echo '</tr>';
}
?>
