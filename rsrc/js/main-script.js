function editEvent(event) {
    $('#event-modal input[name="event-index"]').val(event ? event.id : '');
    $('#event-modal input[name="event-name"]').val(event ? event.name : '');
    $('#event-modal input[name="event-location"]').val(event ? event.location : '');
    $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
    $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
    $('#event-modal input[name="event-start-time"]').val(event ? event.startTime : '');
    $('#event-modal input[name="event-end-time"]').val(event ? event.endTime : '');
    $('#event-modal').modal();
}
function hidePopover(elt) {
    // Hiding the popover only if the mouse is not on the day AND not on the popover.
    if(!elt.data('mouse-on-day') && !elt.data('mouse-on-popover')) {
        elt.popover('hide');
    }
}
function deleteEvent(event) {
    var dataSource = $('#calendar').data('calendar').getDataSource();

    for(var i in dataSource) {
        if(dataSource[i].id == event.id) {
            dataSource.splice(i, 1);
            break;
        }
    }
    
    $('#calendar').data('calendar').setDataSource(dataSource);
}

function saveEvent() {
    var event = {
        id: $('#event-modal input[name="event-index"]').val(),
        name: $('#event-modal input[name="event-name"]').val(),
        location: $('#event-modal input[name="event-location"]').val(),
        startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
        endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate'),
        startTime:$('#event-modal input[name="event-start-time"]').val(),
        endTime: $('#event-modal input[name="event-end-time"]').val()
    }
    
    var dataSource = $('#calendar').data('calendar').getDataSource();

    if(event.id) {
        for(var i in dataSource) {
            if(dataSource[i].id == event.id) {
                dataSource[i].name = event.name;
                dataSource[i].location = event.location;
                dataSource[i].startDate = event.startDate;
                dataSource[i].endDate = event.endDate;
                dataSource[i].startTime = event.startTime;
                dataSource[i].endTime = event.endTime;
            }
        }
    }
    else
    {
        var newId = 0;
        for(var i in dataSource) {
            if(dataSource[i].id > newId) {
                newId = dataSource[i].id;
            }
        }
        
        newId++;
        event.id = newId;
    
        dataSource.push(event);
    }
    
    $('#calendar').data('calendar').setDataSource(dataSource);
    showCurrentOnly();
    $('#event-modal').modal('hide');
}
function showCurrentOnly(){
	 $('#calendar .month-container').each(function(idx, el){
	    	var showMonth = new Date().getMonth();// Show only current month
	        if (idx != showMonth ) {
	          $(this).css("display", "none");
	        }
//	        if(idx == showMonth){
//	        	$(this).each(function(idx, el){
//	        		var showDate = new Date().getDate();
//	        		if(idx == showDate){
//	        			$(this).addClass('current-day');
//	        		}
//	        	});
//	        }
	  });
	 
}
$(function() {
    var currentYear = new Date().getFullYear();
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    $(".dayH").text(new Date().getDate());    
    $(".monthH").text(monthNames[new Date().getMonth()]);
    $('#calendar,#calendarFull').calendar({ 
        enableContextMenu: true,
        displayHeader: false,
        enableRangeSelection: true,
        contextMenuItems:[
            {
                text: 'Update',
                click: editEvent
            },
            {
                text: 'Delete',
                click: deleteEvent
            }
        ],
        selectRange: function(e) {
            editEvent({ startDate: e.startDate, endDate: e.endDate });
        },
        mouseOnDay: function(e) {
            if(e.events.length > 0) {
                $(e.element).data('mouse-on-day', true);

                var content = '';

                for(var i in e.events) {
                    content += '<div class="event-tooltip-content">'
                                    + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
                                    + '<div class="event-location">' + e.events[i].location + '</div>'
                                    + '<div class="event-time" style="color:' + e.events[i].color +'">' + e.events[i].startTime +' to '+ e.events[i].endTime +'</div>'
                                + '</div>';
                }

                // Initialize the popover
                var popover = $(e.element).popover({ 
                    trigger: 'manual',
                    container: 'body',
                    html:true,
                    content: content,
                    placement: 'bottom'
                });

                // Get the popover DOM element
                var popover =  $(e.element).data('bs.popover').tip();

                var alreadyVisible = false;

                // Hide all the old popover visible (only for the case of switching of two adjacent popover).
                $('div.popover:visible').each(function() {
                    if($(this).get(0) == popover.get(0)) {
                        alreadyVisible = true;
                    }
                    else {
                        // If the popover is not the current one, hide it.
                        $(this).hide();
                    }
                });

                if(!alreadyVisible) {
                    $(popover).mouseenter(function () {
                        $(e.element).data('mouse-on-popover', true);
                    })

                    $(popover).mouseleave(function () {
                        $(e.element).data('mouse-on-popover', false);

                        setTimeout(hidePopover, 50, $(e.element));
                    })

                    $(e.element).popover('show');
                }
            }
        },
        mouseOutDay: function(e) {
            if(e.events.length > 0) {
                $(e.element).data('mouse-on-day', false);

                setTimeout(hidePopover, 50, $(e.element));
            }
        },
        dayContextMenu: function(e) {
            $(e.element).popover('hide');
        },
        dataSource: [
            {
                id: 0,
                name: 'Google I/O',
                location: 'San Francisco, CA',
                startDate: new Date(currentYear, 4, 28),
                endDate: new Date(currentYear, 4, 29),
                startTime: '12:00 AM',
                endTime: '12:40 AM'
            },
            {
                id: 1,
                name: 'Microsoft Convergence',
                location: 'New Orleans, LA',
                startDate: new Date(currentYear, 2, 16),
                endDate: new Date(currentYear, 2, 19),
                startTime: '11:00 AM',
                endTime: '12:00 PM'
            },
            {
                id: 2,
                name: 'Microsoft Build Developer Conference',
                location: 'San Francisco, CA',
                startDate: new Date(currentYear, 3, 29),
                endDate: new Date(currentYear, 4, 1),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 3,
                name: 'Apple Special Event',
                location: 'San Francisco, CA',
                startDate: new Date(currentYear, 8, 1),
                endDate: new Date(currentYear, 8, 1),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 4,
                name: 'Apple Keynote',
                location: 'San Francisco, CA',
                startDate: new Date(currentYear, 8, 9),
                endDate: new Date(currentYear, 8, 9),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 5,
                name: 'Chrome Developer Summit',
                location: 'Mountain View, CA',
                startDate: new Date(currentYear, 10, 17),
                endDate: new Date(currentYear, 10, 18),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 6,
                name: 'F8 2015',
                location: 'San Francisco, CA',
                startDate: new Date(currentYear, 2, 25),
                endDate: new Date(currentYear, 2, 26),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 7,
                name: 'Yahoo Mobile Developer Conference',
                location: 'New York',
                startDate: new Date(currentYear, 7, 25),
                endDate: new Date(currentYear, 7, 26),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 8,
                name: 'Android Developer Conference',
                location: 'Santa Clara, CA',
                startDate: new Date(currentYear, 11, 1),
                endDate: new Date(currentYear, 11, 4),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            },
            {
                id: 9,
                name: 'LA Tech Summit',
                location: 'Los Angeles, CA',
                startDate: new Date(currentYear, 10, 17),
                endDate: new Date(currentYear, 10, 17),
                startTime: '12:00 AM',
                endTime: '12:00 AM'
            }
        ]
    });
    $('#save-event').click(function() {
        saveEvent();
    });
    showCurrentOnly();
});


$(function () {
    $('#datetimepickerst').datetimepicker({
        format: 'LT'
    });
    $('#datetimepickeren').datetimepicker({
        format: 'LT',
    });
});

//====================Weather-Widget=====================
//IPInfoDB javascript JSON query example
//Tested with FF 3.5, Opera 10, Chome 5 and IE 8
//Geolocation data is stored as serialized JSON in a cookie
//Bug reports : http://forum.ipinfodb.com/viewforum.php?f=7
function geolocate(timezone, cityPrecision, objectVar) {

var api = (cityPrecision) ? "ip-city" : "ip-country";
var domain = 'api.ipinfodb.com';
var url = "https://" + domain + "/v3/" + api + "/?key=[*************]&format=json" + "&callback=" + objectVar + ".setGeoCookie";
var geodata;
var callbackFunc;
var JSON = JSON || {};
// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
  var t = typeof (obj);
  if (t != "object" || obj === null) {
    // simple data type
    if (t == "string") obj = '"'+obj+'"';
      return String(obj);
  } else {
  // recurse array or object
    var n, v, json = [], arr = (obj && obj.constructor == Array);
    for (n in obj) {
      v = obj[n]; t = typeof(v);
      if (t == "string") v = '"'+v+'"';
      else if (t == "object" && v !== null) v = JSON.stringify(v);
      json.push((arr ? "" : '"' + n + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
};

// implement JSON.parse de-serialization
JSON.parse = JSON.parse || function (str) {
  if (str === "") str = '""';
    eval("var p=" + str + ";");
    return p;
};

//Check if cookie already exist. If not, query IPInfoDB
this.checkcookie = function(callback) {
  geolocationCookie = getCookie('geolocation');
  callbackFunc = callback;
  if (!geolocationCookie) {
    getGeolocation();
  } else {
    geodata = JSON.parse(geolocationCookie);
    callbackFunc();
  }
}

//API callback function that sets the cookie with the serialized JSON answer
this.setGeoCookie = function(answer) {
  if (answer['statusCode'] == 'OK') {
    JSONString = JSON.stringify(answer);
    setCookie('geolocation', JSONString, 365);
    geodata = answer;
    callbackFunc();
  }
}

//Return a geolocation field
this.getField = function(field) {
  try {
    return geodata[field];
  } catch(err) {}
}

//Request to IPInfoDB
function getGeolocation() {
  try {
    script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  } catch(err) {}
}

//Set the cookie
function setCookie(c_name, value, expire) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expire);
  document.cookie = c_name+ "=" +escape(value) + ((expire==null) ? "" : ";expires="+exdate.toGMTString());
}

//Get the cookie content
function getCookie(c_name) {
  if (document.cookie.length > 0 ) {
    c_start=document.cookie.indexOf(c_name + "=");
    if (c_start != -1){
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end == -1) {
        c_end=document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return '';
}
}
//function geolocate(timezone, cityPrecision, objectVar).
//If you rename your object name, you must rename 'visitorGeolocation' in the function
var visitorGeolocation = new geolocate(false, true, 'visitorGeolocation');

//Check for cookie and run a callback function to execute after geolocation is read either from cookie or IPInfoDB API
var callback = function(){
              //alert('Visitor zip code : ' + visitorGeolocation.getField('zipCode'))
             };
visitorGeolocation.checkcookie(callback);
var jsonurl = "http://api.openweathermap.org/data/2.5/weather?lat="+ visitorGeolocation.getField('latitude')+"&lon="+visitorGeolocation.getField('longitude')+"&APPID=[*********]";   
var cityName= visitorGeolocation.getField('cityName');
var regionName= visitorGeolocation.getField('regionName');
$.getJSON(jsonurl, function(data) {
   
   if(jQuery.isEmptyObject(data) == false){
      if (typeof cityName !== "undefined") {
         //var day = $.datepicker.formatDate("MM dd, yy", new Date());
         var condition = data.weather[0].main;
         var description = data.weather[0].description;
         var icon = data.weather[0].icon;
         var temp = data.main.temp;
         var ftemp= Math.round((temp*9)/5 - 459.67);
         if(ftemp==0){
        	 var ftempname="";
         }else if(ftemp>0 && ftemp<=25){
        	 var ftempname="";
         }else if(ftemp>25 && ftemp<=50){
        	 var ftempname="";
         }else if(ftemp>50 && ftemp<=75){
        	 var ftempname="";
         }else if(ftemp>75){
        	 var ftempname="";
         }
         var markup=
         '<div class="weather text-center"><b><p style="color:#fff;">'+ cityName+', '+ regionName +
         '</p></b><p class="cond"><img src="https://openweathermap.org/img/w/'+ icon +'.png" height="50px" style="vertical-align: middle;height:35px"/><img src="rsrc/images/therm.png" style="vertical-align: middle;height:21px;"/> <b><span style="vertical-align: middle;color:#d31f45">'+ ftemp + 
         '&deg;</span></b></p><p style="color:#d31f45"><b>'+ condition +
         '</b></p></div>';
      $('#weatherWidget').html(markup);
      }
   }else{
      console.log("Error retrieving weather data!");
   }
}).error(function(){
     showError("Your browser does not support CORS requests!");
 });


