<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

//$servername = "localhost";
//$username = "username";
//$password = "password";

/*
try {
  $conn = new PDO("mysql:host=$servername;dbname=myDB", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
*/

$arr = array('Millie' => 'Eleven', 
            'Mike' => 'Finn', 
            'Gaten' => 'Dustin', 
            'Noah' => 'Will'); 
//$arr.push('Dada' => 'Ayyye');
//echo $arr;
echo json_encode($arr);
?>