sdApp.controller('ManagerController', function ($scope, $rootScope) {


    $scope.resetManagementPage = function () {

        var answer = alert('This will unload the current CSV-files and it allows you to load new CSV-files into the application. Do you want to continue?');

        if (answer) {
        $scope.filesWereDropped=false;
        }

    };

    $scope.expectArrayCategoryNames = [
        "Cockpit (landing)",
        "Cockpit (cruise)",
        "Action Cam",
        "Taxi",
        "Cabin",
        "Pre-Flight Inspections",
        "Orbit Animation 1",
        "Orbit Animation 2",
        "Flyby Animation 1",
        "Flyby Animation 2",
        "Flyby Animation 3"
    ];

    $scope.filesWereDropped=false;


    $scope.categoryMoveUp = function() {
        alert('move up (to be implemented');
    };

    $scope.categoryMoveDown = function() {
        alert('move down (to be implemented');
    };

    $scope.saveFile = function () {

        function onInitFs(fs) {

            fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

                // fileEntry.isFile === true
                // fileEntry.name == 'log.txt'
                // fileEntry.fullPath == '/log.txt'

            }, errorHandler);

        }

        navigator.webkitPersistentStorage.requestQuota(1024*1024,
            function(grantedBytes) {
                //window.requestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);

                  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
                window.requestFileSystem(window.PERSITENT, 1024*1024, onInitFs, errorHandler);
            },
            function(errorCode) {
                alert("Storage not granted.");
            }
        );

        function errorHandler(e) {
            var msg = '';

            msg = e.name + " - " + e.message;

            console.log('Error: ' + msg);
        }

    };


    $scope.openOverlay = function() {
        $rootScope.toggle('myOverlay', 'on');

        $scope.csvFilename = $scope.selectedFile.name;
//        $scope.csvString = JSON.stringify($scope.selectedFile);


        console.log("selectedFile");
        console.dir($scope.selectedFile);
        console.log("selectedFile.categoryArray");
        console.dir($scope.selectedFile.categoriesArray);


       // for (var cat in $scope.selectedFile.categoriesArray) {

        $scope.csvString = 'fkdasjfdkljdlksada\n';

        for (var i = 0; i<$scope.selectedFile.categoriesArray.length; i++) {
            //console.log(cat.join(','));
            //cat2 = cat3;
            //console.dir(cat2);




            //console.log(JSON.stringify($scope.selectedFile.categoriesArray[i]));
            //console.log($scope.selectedFile.categoriesArray[i].camerasArray.join(','));

            $scope.csvString = $scope.csvString + $scope.selectedFile.categoriesArray[i].camerasArray.join(',') + '\n';


        }

    };

    function convertCSVToCategoriesArray(CSVString) {

        var camerasArray = CSVString.split(/\r\n|\n/);

        var categoriesArray = new Array();
        var lastCategoryName = '';

        var tmpCategoryArray = new Array();

        for (var k = 1; k < camerasArray.length; k++) {

            var tmpArray = camerasArray[k].split(",");

            //console.log(tmpArray);

            if (lastCategoryName == tmpArray[0]) {
                tmpCategoryArray.push(tmpArray);
            } else {
                if (k>1) {
                    categoriesArray.push({
                        name: lastCategoryName,
                        camerasArray: tmpCategoryArray
                    });
                    tmpCategoryArray = new Array();
                    tmpCategoryArray.push(tmpArray);
                }
            }
            lastCategoryName = tmpArray[0];
        }

        return categoriesArray;

    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $scope.filesWereDropped=true;

        var files = evt.dataTransfer.files; // FileList object.

        //var fileOutput = document.getElementById('fileOutput');

        var fileReadCounter = 0;

        $scope.allCamerasArray = new Array();
        for (var i = 0, f; f = files[i]; i++) {

            //fileOutput.innerHTML = fileOutput.innerHTML + '<b>' + f.name + ' (' + f.size + ' bytes)</b><br>';

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