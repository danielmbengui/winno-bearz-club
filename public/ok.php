<?php
//header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$text = "Cats chase mice";
$filename = "somefile.txt";
//$fh = fopen($filename, "a");
//fwrite($fh, $text);
//fclose($fh);

file_put_contents($filename, $text);
//header("Content-type:image/png");

/*
$img = $_POST['canvas'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = 'meeeerde.png';
$success = file_put_contents($file, $data);

*/
//print $success ? $file : 'Unable to save the file.';
//echo( json_encode('poooool'));
/*
$myfile = fopen('http://localhost:3000/aie.txt', "w") or die("Unable to open file!");
$txt = "John Doe\n";
fwrite($myfile, $data);
$txt = "Jane Doe\n";
fwrite($myfile, $txt);
fclose($myfile);
*/

/*
if (isset($GLOBALS['HTTP_RAW_POST_DATA'])) {
    $imageData = $GLOBALS['HTTP_RAW_POST_DATA'];
    $filteredData = substr($imageData, strpos($imageData, ',') + 1);
    $unencodedData = base64_decode($filteredData);
    $fp = fopen('http://localhost:3000/aie.png', 'wb');
    fwrite($fp, $unencodedData);
    fclose($fp);
}
*/
?>
