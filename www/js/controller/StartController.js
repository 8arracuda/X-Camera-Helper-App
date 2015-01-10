sdApp.controller('StartController', function ($scope) {

    $scope.amountOfCameras = 10;
    $scope.radius = 30;
    $scope.offset_y = 0;
    $scope.defaultValues = "";
    $scope.transitionFrames = 100;

    $scope.settingAutoAdvance=false;
    $scope.settingTrackIREnabled=false;
    $scope.settingSmoothTransition=false;
    $scope.settingHeadShake=false;
    $scope.settingRetainMouseLookPosition=false;
    $scope.settingEnableTemporaryPositioning=false;
    $scope.settingEnableLinearTransition=false;
    $scope.settingLimitTrackIR=false;
    $scope.settingEnableFOV=false;
    $scope.settingSmoothCameraJoins=false;
    $scope.settingEnableTrackHeading=false;
    $scope.settingEnableTrackPitch=false;
    $scope.settingEnableLevelCamera=false;
    $scope.settingEnableViewAxis=false;

    var zoom = 1;
    var FOV = 45;
    var CGY_Offset = 0;
    var CGZ_Offset = 0;


    $scope.init = function () {

        var x = document.getElementById("mySelect");
        var option = document.createElement("option");
        for (var i = 0; i < presets.length; i++) {
            var option = document.createElement("option");
            option.text = presets[i][0];
            x.add(option);
        }

        var categories = ["a", "b"];

        var x = document.getElementById("infoBoxSelect");
        var option = document.createElement("option");
        for (var i = 0; i < categories.length; i++) {
            var option = document.createElement("option");
            option.text = categories[i][0];
            x.add(option);
        }

    };

    var presetsSring = '[["Saab 340 Passenger Variant","X-Camera_LES_Saab_340A",-0.472440,1.091184,-5.736336,"0","0"],["Carenado C208B Grand Caravan v2","X-Camera_Car_C208B_v10",-0.35052,0.758952,-1.155192,"0","0"  ],["Carenado C208B SuperCargomaster","X-Camera_Car_C208B_v10",0.353568,0.762,-1.15824,"0","0"  ],["CRJ-200","X-Camera_CRJ200",-0.48768,1.2954,-9.784084,"0","0"  ],["Carenado A36 Bonanza v2","X-Camera_Car_A36_Bonanza",-0.268224,0.56388,-0.335281,"0","0"  ],["Challenger300_XP10_22","X-Camera_Bombardier_Cl_300",-0.47244,0.902208,-6.510528,"0","0"  ],["Bae Jetstream 32_v10","X-Camera_Jetstream32",-0.42672,1.31064,-1.64592,"0","0"  ]]';

    var presets = JSON.parse(presetsSring);

    $scope.init();

    var iteration = 1;

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.scale(2, 2);


    $scope.updateInfoBox = function () {

        string = category[0] + "," + category[1];

    };

    $scope.updatePreset = function () {
        selectedPlaneIndex = document.getElementById("mySelect").selectedIndex;
        string = presets[selectedPlaneIndex][2] + "," + presets[selectedPlaneIndex][3] + "," + presets[selectedPlaneIndex][4] + presets[selectedPlaneIndex][5] + "," + presets[selectedPlaneIndex][6] + ",";
        $scope.defaultValues = string;
        ;
    };

    $scope.main = function () {



        categoryArray = Array();

        category = {
            name: "cockpit (for landing)",
            cameras: [
                "Cockpit (default cam)",
                "Cockpit cam, raised",
                "Cockpit overview"]
        };
        categoryArray.push(category);

        category = {
            name: "cockpit (in flight)",
            cameras: [
                "Cockpit (default cam)",
                "Main Instruments",
                "EFIS",
                "Radios",
                "Lights",
                "Overhead Panel",
                "Autopilot",
                "Charts board",
                "Thruster-/Flaps Handles",
                "Rudder / Sticks",
                "side window left",
                "side window right"]
        };
        categoryArray.push(category);

        category = {
            name: "exteriour (for inspections)",
            cameras: [
                "Nose",
                "Left Wing",
                "Left Wing Flaps",
                "Left Wing beneath?",
                "Right Wing",
                "Right Wing Flaps",
                "Right Wing beneath?",
                "Horizonal Stabilizer",
                "Vertical Stabilizer Right",
                "Vertical Stabilizer Left",
                "Gear/Wheels Front",
                "Gear/Wheels Rear"]
        };
        categoryArray.push(category);

        category = {
            name: "exteriour (in flight)",
            cameras: [
                "Fly-by 1",
                "Fly-by 2",
                "Fly-by 3",
                "Fly-by ...",
                "Orbit far",
                "Orbit near"]
        };
        categoryArray.push(category);

        outputDiv = document.getElementById("outputNew");

        for (var i = 0; i < categoryArray.length; i++) {
            categoryName = categoryArray[i].name;
            cameras = categoryArray[i].cameras;

            //appendString = "FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,0,FALSE,FALSE,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,1.000000,0.000000,FALSE,FALSE,FALSE,FALSE,0.000000,0.000000,FALSE,FALSE";
            appendString = "," + $scope.settingTrackIREnabled.toString().toUpperCase() + "," + $scope.settingSmoothTransition.toString().toUpperCase() +
            "," + $scope.settingHeadShake.toString().toUpperCase() + "," + $scope.settingRetainMouseLookPosition.toString().toUpperCase() + ","
            + $scope.settingEnableTemporaryPositioning.toString().toUpperCase() + "," + $scope.settingEnableLinearTransition.toString().toUpperCase() + "," + $scope.transitionFrames + "," + $scope.settingAutoAdvance.toString().toUpperCase() + ","
            + $scope.settingLimitTrackIR.toString().toUpperCase() + ",0,0,0,0,0,0," + zoom + "," + FOV + "," + $scope.settingEnableFOV.toString().toUpperCase() + ","
            + $scope.settingSmoothCameraJoins.toString().toUpperCase() + "," + $scope.settingEnableTrackHeading.toString().toUpperCase() + ","
            + $scope.settingEnableTrackPitch.toString().toUpperCase() + "," + CGY_Offset + "," + CGZ_Offset + "," + $scope.settingEnableLevelCamera.toString().toUpperCase() + ","
            + $scope.settingEnableViewAxis.toString().toUpperCase();

            outputDiv.innerHTML = "Category Name,Camera Name,View ID,X,Y,Z,heading,pitch,TrackIR Enabled,Smooth Transition,HeadShake,RetainMouseLookPosition,Enable Temporary Positioning,Enable Linear Transition,Linear Transition Frames,Enable Auto Davance,Limit TrackIR, Max TrackIR X,Max TrackIR Y,Max TrackIR Z,Min TrackIR X,Min TrackIR Y,Min TrackIR Z,Zoom,FOV,Enable FOV,Smooth Camera Joins, Enable Track Heading, Enable Track Pitch, CGY Offset, CGZ Offset, Enable Level Camera, Enable View Axis<br>";

            for (var k = 0; k < cameras.length; k++) {
                outputDiv.innerHTML = outputDiv.innerHTML + categoryName + "," + cameras[k] + "," + $scope.defaultValues + "," + appendString + "<br>";
            }
        }
    };

    $scope.updateCanvas = function () {

        amount = $scope.amountOfCameras;
        r = $scope.radius;

        //clear the context before adding something new
        ctx.clearRect(0, 0, c.width, c.height);

        //canvas_offset_x = 50;
        //canvas_offset_y = 50;

        canvas_offset_x = 25;
        canvas_offset_y = 25;

        init_x = 0;
        init_y =  $scope.offset_y;

        //draw a rectange for the middle of the aircraft (cog)
        ctx.strokeRect(canvas_offset_x, canvas_offset_y, 1, 1);
        ctx.fillText("origin", canvas_offset_x - 6, canvas_offset_y + 6);

        for (var i = 0; i < amount; i++) {
            currentAngle = (2 * Math.PI / amount) * i;

            currentX = (canvas_offset_x + init_x + (Math.sin(currentAngle) * r));
            currentY = (canvas_offset_y + init_y + (Math.cos(currentAngle) * r));

            ctx.font = 'italic 4pt Calibri';
            ctx.fillText("cam_" + i, currentX + 2, currentY + 6);

            ctx.strokeRect(currentX, currentY, 1, 1);
        }

    };

    $scope.generate = function () {

        if (document.getElementById("defaultValues").value =="") {
            alert("select a plane from the list (or insert default values");
        }

        amount = document.getElementById("amount").value;
        r = document.getElementById("radius").value;
        offset = $scope.offset_y;
        autoAdvance = document.getElementById("autoAdvanceCheckbox");

        if (r < 5) {
            alert("Radius is very small, choose a larger radius for better results");
        }

        if (amount > 20) {
            alert("Do you really want this much cameras? Anyway - I'll create them for you :)");
        }

        category_name = "myNewCategory" + iteration;

        //center point of the cameras
        init_x =  $scope.offset_y;
        init_z = 0;

        outputDiv = document.getElementById("outputNew");

        //only writes the heading line in the first iteration
        if (iteration == 1) {
            outputDiv.innerHTML = "Category Name,Camera Name,View ID,X,Y,Z,heading,pitch,TrackIR Enabled,Smooth Transition,HeadShake,RetainMouseLookPosition, Enable Temporary Positioning,Enable Linear Transition,Linear Transition Frames,Enable Auto Davance,Limit TrackIR, Max TrackIR X,Max TrackIR Y,Max TrackIR Z,Min TrackIR X,Min TrackIR Y,Min TrackIR Z,Zoom,FOV,Enable FOV,Smooth Camera Joins, Enable Track Heading, Enable Track Pitch, CGY Offset, CGZ Offset, Enable Level Camera, Enable View Axis<br>";
        }

        autoAdvanceValue = (autoAdvance.checked + "").toUpperCase();
        console.log(autoAdvance.checked);
        console.log(autoAdvanceValue);

        for (var i = 0; i < amount; i++) {
            currentAngle = (2 * Math.PI / amount) * i;

            //calculates the new position of the camera
            currentX = (init_x + Math.sin(currentAngle) * r).toFixed(6);
            currentZ = (init_z + Math.cos(currentAngle) * r).toFixed(6);

            heading = 0.000000;
            pitch = 0.000000;
            viewId = 0;
            currentY = 2.000000; //Cessna 208B Cockpit 0.76

            //To avoid an loop-animation that never stops camera
            if (i == amount - 1) {
                autoAdvanceValue = "FALSE";
            }
            outputDiv.innerHTML = outputDiv.innerHTML + category_name + ",cam" + i + "," + viewId + "," + currentX + "," + currentY + "," + currentZ + "," + heading + "," + pitch + "," + "FALSE,FALSE,FALSE,FALSE,FALSE,TRUE," + $scope.transitionFrames + "," + autoAdvanceValue + ",FALSE,0.000000,0.000000,1.000000,0.000000,1.000000,1.000000,1.000000,1.000000,TRUE,TRUE,TRUE,FALSE,0.000000,0.000000,TRUE,FALSE<br>"
        }
        //increase category number to change the category name in next call of generate()
        iteration += 1;
    }

});