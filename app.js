// 'use strict';


// $('#fileupload').on( 'submit', function(e) {
//     e.preventDefault();

//     // fileupload.submit();
//     // console.log();
// });



function formatFileSize(bytes) {
    if (typeof bytes !== 'number') {
      return '';
    }
    if (bytes >= 1000000000) {
      return (bytes / 1000000000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
      return (bytes / 1000000).toFixed(2) + ' MB';
    }
    return (bytes / 1000).toFixed(2) + ' KB';
}

function niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let l = 0, n = parseInt(x, 10) || 0;

    while(n >= 1024 && ++l){
        n = n/1024;
    }

    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

var storedFiles = [];
var fileupload = $('#fileupload').fileupload({
    url: './upload.php',
    autoUpload: false,
    sequentialUploads: true,

    previewThumbnail: true,
    previewCanvas: true,
    imagePreviewName: 'preview',
    // singleFileUploads: false,
    // limitMultiFileUploads: 1,
    // forceIframeTransport: true,
    formData: {'action': 'upload_file_process', 'maxChunkSize': 1000000 },
    change: function (e, data) {
        // console.log(data);
        $.each(data.files, function (index, file) {


            let pathFile = file.webkitRelativePath;
            let folderArr = pathFile.split('/');


            if ( folderArr.length > 2 ) {
                folderArr.shift();
                folderArr.pop();
            } else {
                folderArr = [];
            }
            folderList(folderArr);


            function folderList(folderArr) {
                let html = '';
                if ( folderArr.length > 0 ) {
                    folderArr.forEach(folder => {
                        html += `<input type="checkbox" name="pathName-${index}" value="${folder}" checked>${folder} <br>`;
                    });
                }

                return html;
            }
            let tr = `<tr data-id="${index}">
                            <td class="tg-0lax"> <img data-id="${index}" class="file-preview" src="" alt="Превью" /></td>
                            <td class="tg-0lax"> ${file.name}</td>
                            <td class="tg-0lax"> ${formatFileSize(file.size)}</td>
                            <td class="tg-0lax"> ${folderList(folderArr)} </td>
                            <td class="tg-0lax"> <div class="upload-file-progress"> <span data-id="${index}" class="uploadFileProgress"></span> </div></td>
                            <td class="tg-0lax action-image">
                                <div class="action-image__inner">
                                    <button class="cancel-image button-action" type="button" data-id="${index}">Убрать</button>
                                    <button class="edit-image button-action disabled" type="button" data-id="${index}" disabled>Редактор</button>
                                    <button class="meta-image button-action" type="button" data-id="${index}">Мета данные</button>
                                </div>
                            </td>
                        </tr>`;

            $('#changeFileTable tbody').append( tr );
            let reader = new FileReader();
            reader.onload = function(e) {
                $(`img[data-id="${index}"]`).attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
            file.file_id = index;
            file.folders = folderArr;








        });
    },
    add: function (e, data) {
        $('.cancel-image').on('click', function(e) {
            let id = $(this).attr('data-id');
            if ( data.files.length > 0 && data.files[0].file_id == id ) {
                $(`tr[data-id="${id}"]`).remove();
                data.files = "";
            }
        });
        $('#submitUpload').on('click', function(e) {
            e.preventDefault();
            if (data.files.length > 0) {     //only submit if we have something to upload
                console.log(data);
                data.submit();
            }
        });
    },
    submit: function(e, data) {

        // var inputs = data.context.find(':input');
        // if (inputs.filter(function () {
        //         return !this.value && $(this).prop('required');
        //     }).first().focus().length) {
        //     data.context.find('button').prop('disabled', false);
        //     return false;
        // }
        // data.formData = inputs.serializeArray();



        console.log("submit", data);
        // if ( !data.formData.nameFile ) {
        //     data.formData.nameFile = data.files[0].name;
        //     data.formData.idFile = data.files[0].file_id;
        // }
    },
    send: function(e, data) {


        let fileName = data.files[0].name;
        let filePath = data.files[0].webkitRelativePath;
        let fileId = data.files[0].file_id;
        let folders = data.files[0].folders;


        data.formData.fileName = fileName;
        data.formData.filePath = filePath;
        data.formData.fileId = fileId;
        data.formData.folders = folders;

        if ( data.data ) {
            data.data.append('fileName', fileName);
            data.data.append('filePath', filePath);
            data.data.append('fileId', fileId);
            data.data.append('folders', folders);
        }




    // console.log("send", data);


    },
    done: function(e, data) {
        // console.log("done", data);
    },
    progress: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        let uploadFileProgress = $(`span[data-id="${data.files[0].file_id}"]`);
        uploadFileProgress.css('width', `${progress}%`);
    },
    progressall: function( e, data) {
        var progressall = parseInt(data.loaded / data.total * 100, 10);
        let uploadFileProgress = $(`.upload-progress span`);
        uploadFileProgress.css('width', `${progressall}%`);
    },
    destroy: function(e, data) {
        console.log('destroy', data);

    }
})



$(document).on('click', '.meta-image', function() {

    let numImage = $(this).data('id');

    let file = $(`img[data-id=${numImage}]`);


    loadImage(
        $(file).attr('src'),
        function (img, data) {
            console.log( data );


            modalMetaData( numImage, data );

        //   console.log('Original image head: ', data.imageHead)
        //   console.log('Exif data: ', data.exif) // requires exif extension
        //   console.log('IPTC data: ', data.iptc) // requires iptc extension
        },
        { meta: true }
    );



    console.log( file );
    console.log( numImage );
})


function modalMetaData( numImage, data ) {

    let modal = document.createElement('div');
    modal.classList.add('meta-modal');
    modal.setAttribute('data-id', numImage);



    let inner = `
    <div class="meta-modal__info modal-info">

            <table id="metaListTable" data-meta="exif">
                <tbody>
                    <tr>
                        <th colspan="2">Exif</th>
                    </tr>
                    <tr>
                        <td>ExifVersion</td>
                        <td>0231</td>
                    </tr>
                    <tr>
                        <td>OffsetTime</td>
                        <td>+03:00</td>
                    </tr>
                    <tr>
                        <td>ColorSpace</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
            <table id="metaListTable" data-meta="iptc">
                <tbody>
                    <tr>
                        <th colspan="2">Exif</th>
                    </tr>
                    <tr>
                        <td>ExifVersion</td>
                        <td>0231</td>
                    </tr>
                    <tr>
                        <td>OffsetTime</td>
                        <td>+03:00</td>
                    </tr>
                    <tr>
                        <td>ColorSpace</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>

            <ul class="meta-list iptc-list">
            </ul>


        <div class="meta-modal__close">✕</div>
    </div>
    `

    modal.innerHTML = inner;

    $('.content').prepend( modal );

}



$(document).on('click', '.meta-modal__close', function() {

    $('.meta-modal').remove();

})