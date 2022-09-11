<?php


$path_catalog = "./files";

if ( !file_exists($path_catalog) ) {
    mkdir($path_catalog);
}





$file = isset( $_FILES['files'] ) ? $_FILES['files'] : 0;

$file_name = $file['name'];
$file_type = $file['type'];
$file_tmp_name = $file['tmp_name'];
$file_size = $file['size'];


$_file_name = isset( $_POST['fileName'] ) ? $_POST['fileName'] : 0;
$_file_path = isset( $_POST['filePath'] ) ? $_POST['filePath'] : 0;
$_file_count = isset( $_POST['fileId'] ) ? $_POST['fileId'] : 0;


