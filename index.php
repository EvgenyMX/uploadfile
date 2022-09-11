<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./jquery-ui.min.css">
    <link rel="stylesheet" href="./jquery-ui.structure.min.css">
    <link rel="stylesheet" href="./jquery-ui.theme.min.css">
    <link rel="stylesheet" href="./jquery.fileupload.css">
    <link rel="stylesheet" href="./style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

</head>
<body>

    <div class="content">
        <form id="fileupload" method="POST" enctype="multipart/form-data">

            <div class="row fileupload-buttonbar">
                <div class="col-lg-7">
                    <span class="btn btn-success fileinput-button">

                        <label id="labelUpload" for="inputUpload">
                            <span>Добавить файлы</span>
                            <input id="inputUpload" type="file" name="files[]" webkitdirectory  multiple="">
                        </label>
                    </span>
                    <button id="submitUpload" type="submit" class="btn btn-primary start">
                        Начать загрузку
                    </button>
                    <!-- <button type="reset" class="btn btn-warning cancel">
                        <i class="glyphicon glyphicon-ban-circle"></i>
                        <span>Отменить</span>
                    </button>
                    <button type="button" class="btn btn-danger delete">
                        <i class="glyphicon glyphicon-trash"></i>
                        <span>Удалить выбранные</span>
                    </button>
                    <input type="checkbox" class="toggle">  -->
               </div>
            </div>
            <div class="upload-progress">
                <span class="uploadProgress"></span>
            </div>
            <table class="table" id="changeFileTable" class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax">Превью</th>
                        <th class="tg-0lax">Название</th>
                        <th class="tg-0lax">Размер</th>
                        <th class="tg-0lax">Категории</th>
                        <th class="tg-0lax">Загрузка</th>
                        <th class="tg-0lax">Действие</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </form>

<!--
        <div class="meta-modal">

        </div> -->


    </div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="./jquery-ui.min.js"></script>
    <script src="./jquery.fileupload.js"></script>
    <script src="./imageMaster/load-image.all.min.js"></script>
    <!-- <script src="./demo.js"></script> -->
    <script src="./app.js"></script>
</body>
</html>