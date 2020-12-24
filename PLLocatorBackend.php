<?php
$hn = 'mysql01.myhostcp.com:3306';
$db = 'dgwebdev_PLLocatorVisitLogger';
$un = 'dgwebdev_Raditz';
$pw = 'Kakarot456';

$conn= new mysqli($hn, $un, $pw, $db);

$jsonInput = json_decode(file_get_contents('php://input'));
//$IP= $jsonInput['body']['userIP']

$stmt = $conn->prepare("INSERT INTO IPDateTimestampMobile(Date) VALUES('boo')");
$stmt->execute();
$stmt->close();
$conn->close();



/*
$conn= new mysqli($hn, $un, $pw, $db);

if (password is correct && php://input userIP!==null && php://input dateAndTime!==null) {
    $stmt = $conn->prepare("INSERT INTO IPDateLatLong VALUES(?, ?, ?)");
    $stmt->bind_param('sss', userIP, timeStamp, dateAndTime);
}


when it's time to put in lat and long coords (if do-able): get all of the rows with their ip address, organise by timetstamp descending order, limit to 1 (ie select latest one)



$stmt = $conn->prepare("INSERT INTO UAStringsTimestampss VALUES(?, ?)");
$stmt->bind_param('ss', $UAString, $TimeStamp);
$UAString = $_SERVER['HTTP_USER_AGENT'];
$TimeStamp = time();
$stmt->execute();
$stmt->close();
$conn->close();*/




//SELECT * FROM permlog ORDER BY id DESC LIMIT 0, 1



















?>