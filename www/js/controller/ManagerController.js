sdApp.controller('ManagerController', function ($scope) {


    function convertCSVToCategoriesArray(CSVString) {

        var camerasArray = CSVString.split(/\r\n|\n/);

        var categoriesArray = new Array();
        var lastCategoryName = '';

        var tmpCategoryArray = new Array();

        for (var k = 0; k < camerasArray.length; k++) {

            var tmpArray = camerasArray[k].split(",");

            if (lastCategoryName == tmpArray[0]) {
                tmpCategoryArray.push(tmpArray);
            } else {
                categoriesArray.push({
                    name: lastCategoryName,
                    camerasArray: tmpCategoryArray
                });
                tmpCategoryArray = new Array();
                tmpCategoryArray.push(tmpArray);
            }
            lastCategoryName = tmpArray[0];
        }

        return categoriesArray;

    }


    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        var fileOutput = document.getElementById('fileOutput');

        var fileReadCounter = 0;

        $scope.allCamerasArray = new Array();
        for (var i = 0, f; f = files[i]; i++) {

            fileOutput.innerHTML = fileOutput.innerHTML + '<b>' + f.name + ' (' + f.size + ' bytes)</b><br>';

            var filename = f.name;
            var reader = new FileReader();

            reader.onload = function (e) {

                var fileContent = e.target.result;

                $scope.allCamerasArray.push({
                    name: files[fileReadCounter].name,
                    categoriesArray: convertCSVToCategoriesArray(fileContent)
                });

                fileReadCounter++;


                if (fileReadCounter == files.length) {
                    console.log("allCamerasArray");
                    console.dir($scope.allCamerasArray);
                    $scope.$apply();
                }

            };
            reader.onerror = function (stuff) {
                console.log("error", stuff);
                console.log(stuff.getMessage())
            };
            reader.readAsText(f); //readAsdataURL
        }


    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

// Setup the dnd listeners.
    var dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

});