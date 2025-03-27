
//run after page is loaded
window.addEventListener('load', function () {

    //var curDate = new Date();
    //var curDate = moment("2020-10-04 11:18:39");
    var curDate = moment();
    //var goalDate = moment.clone();

    this.console.log(curDate.toString());
    document.getElementById("yearInput").value = curDate.year();
    document.getElementById("monthInput").value = (curDate.format("MM"));
    document.getElementById("dayInput").value = curDate.format("DD");
    document.getElementById("hourInput").value = curDate.format("HH");
    document.getElementById("minuteInput").value = "00";// curDate.format("MM");
    document.getElementById("secondInput").value = "00";// curDate.format("ss");

    //input all required time zones
    var timeZones = [ "America/Los_Angeles", "America/New_York", "Australia/Sydney", "Europe/London" ];

    //populate zones dropdown
    var zonesDl = document.getElementById("timezoneSelect");
    for(var i=0; i<timeZones.length;i++)
    {
        var newOption = document.createElement("option");
        newOption.text = timeZones[i];
        zonesDl.add(newOption);
    }
    var allZonesDl = document.getElementById("allZonesDL");
    for(var i=0; i<validMomentTimezones.length;i++)
    {
        var newOption = document.createElement("option");
        newOption.text = validMomentTimezones[i];
        allZonesDl.add(newOption);
    }

    //lets work
    document.getElementById("calcTimeBtn").addEventListener("click", function() {

        //update current time
        curDate = moment();

        var outputStr = "<b>OUTPUT</b><br/>";

        //show the current date and time (should be client based/local)
        outputStr += "Current Date/Time:<br/>";
        outputStr += "" + curDate.local().format() + " (Local)" + "<br/>";
        for(var i=0; i<timeZones.length;i++)
        {
            var tempDate = curDate.tz(timeZones[i]);
            outputStr += "" + tempDate.format() + " (" + timeZones[i] + ")" + "<br/>";
        }

        outputStr += "<br/>";

        //calculate the goal date
        var selectedZone = zonesDl.value;
        //console.log(selectedZone);

		/*
		document.getElementById("lblInfo").innerHTML = "";
		if(selectedZone == "America/Los_Angeles")
			document.getElementById("lblInfo").innerHTML = selectedZone + " --> PT/PST";
		if(selectedZone == "America/New_York")
			document.getElementById("lblInfo").innerHTML = selectedZone + " --> EDT/EST";
		*/
		
        outputStr += "Goal Date/Time:<br/>";
        var zoneSuffix = moment().tz(selectedZone).format().substring(19);
        var momentDateStr = document.getElementById("yearInput").value + "-" +
             document.getElementById("monthInput").value + "-" +
             document.getElementById("dayInput").value + "T" + 
             document.getElementById("hourInput").value + ":" + 
             document.getElementById("minuteInput").value + ":" + 
             document.getElementById("secondInput").value + zoneSuffix;
        console.log(momentDateStr);
        var goalDate = moment(momentDateStr);
        outputStr += "" + goalDate.local().format() + " (Local)<br/>";
        /*
        goalDate.set('year', document.getElementById("yearInput").value);
        goalDate.set('month', document.getElementById("monthInput").value);
        goalDate.set('day', document.getElementById("dayInput").value);
        goalDate.set('hour', document.getElementById("hourInput").value);
        goalDate.set('minmute', document.getElementById("minuteInput").value);
        goalDate.set('second', document.getElementById("secondInput").value);
        */
        for(var i=0; i<timeZones.length;i++)
        {
            var tempDate = goalDate.clone().tz(timeZones[i]);
            if(timeZones[i] == selectedZone)
                outputStr +="<b>";
            outputStr += "" + tempDate.format() + " (" + timeZones[i] + ")"
            if(timeZones[i] == selectedZone)
                outputStr +="</b>";
            outputStr += "<br/>";
        }

        /*
        var eta = moment.duration(goalDate.local().diff(curDate.local()));
        var etaDays = goalDate.diff(curDate, 'days');
        var etaHours = goalDate.diff(curDate, 'hours');
        var etaMinutes = goalDate.diff(curDate, 'minutes');
        var etaStr = "";
        if(etaDays != 0)
            etaStr = etaDays + " days";
        else
        {
            if(etaHours != 0)
                etaStr = etaHours + " hours" + etaMinutes;
            else
            {
                if(etaMinutes != 0)
                    etaStr = etaMinutes + " minutes";
            }
        }
        */
        var dateDiff = goalDate.local()-curDate.local();
        //console.log(dateDiff);
        var etaStr = moment.duration(dateDiff,'milliseconds').format('h [hours] m [minutes] s [seconds]');
        outputStr += "<br/>" + "ETA: " + etaStr;

        document.getElementById("outputLbl").innerHTML = outputStr;
    });
    
    //https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
    //user added zones
    document.getElementById("addZone").addEventListener("click", function() {
        var customZoneName = document.getElementById("allZonesDL").value;
        var newOption = document.createElement("option");
        newOption.text = customZoneName;
        zonesDl.add(newOption);

        //update array
        timeZones.push(customZoneName);
    });

  })
