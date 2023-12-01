function srnonlocationmsbexternaldebugTrigger(eventParamInject, kdfParamInject){
    //*******************************************************************
    //****** SECTION A - CONFIGURED PER CUSTOMER ************************
    //*******************************************************************
    
    //Update the values below 
    var homepage_url = 'https://proservices.portal.capreview.empro.verintcloudservices.com/site/simple_form_portal/home';  //Set the url of the 'Return to Homepage' button on the 'Complete' page 
    var skip_first_page = true;
    
    var cfg_pagevisibility = [
                { "page": "ss_dispute_a_parking_ticket", "values": ["Dispute a parking ticket"] },
                { "page": "ss_general_inquiries_private_property","values": ["General inquiries private property"] },
                { "page": "ss_general_inquiries_public_property","values": ["General inquiries public property"] },
                { "page": "page_birth_registration","values": ["Birth Registration"] },
                { "page": "page_marriage_registration","values": ["Marriage Registration"] },
                { "page": "page_football_pitch_booking","values": ["Book a football pitch"] }
            ];
    
    //flag that used for auto trigger search again button when no result found
    var is_noresult_property_yd = false;
    
    const toISOStringWithTimezone = date => {
        const tzOffset = -date.getTimezoneOffset();
        const diff = tzOffset >= 0 ? '+' : '-';
        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            diff + pad(tzOffset / 60) +
            ':' + pad(tzOffset % 60);
    };
    
    const toISOStringIgnoreTimezone = date => {
        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            "+00:00";
    };
    
    let officeLocationList = [
        {
            locationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
            locationName: "North Springfield",
            locationAddress: "Blackthorn Rd, Welwyn Garden City AL7 3JP, United Kingdom"
        },
        {
            locationId: "d5fa4a4a-ac68-4d26-8f8c-10fed13c0716",
            locationName: "West Springfield",
            locationAddress: "Osborne Rd, Windsor SL4 3SJ, United Kingdom"
        },
        {
            locationId: "2464ff0b-2dea-4a24-84aa-b747c495a508",
            locationName: "South Springfield",
            locationAddress: "Ladbroke Rd, Horley RH6 8PB, United Kingdom"
        }
    ];
    
    let staffTimeSlotLocationAvailabilityList = [
        {
            staffId: "90c3eae0-77de-48f2-840e-38d02348ba3c",
            staffName: "Danny Jaya",
            workingHours: [
                {
                    day: "monday",
                    timeSlots: [
                        {
                            workLocationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
                            workLocationName: "North Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "tuesday",
                    timeSlots: [
                        {
                            workLocationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
                            workLocationName: "North Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "wednesday",
                    timeSlots: [
                        {
                            workLocationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
                            workLocationName: "North Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "thursday",
                    timeSlots: [
                        {
                            workLocationId: "d5fa4a4a-ac68-4d26-8f8c-10fed13c0716",
                            workLocationName: "West Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "friday",
                    timeSlots: [
                        {
                            workLocationId: "d5fa4a4a-ac68-4d26-8f8c-10fed13c0716",
                            workLocationName: "West Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                }
            ]
        },
        {
            staffId: "2211b638-eaba-41a7-aa5b-2f3af884d0df",
            staffName: "Edward Staff",
            workingHours: [
                {
                    day: "monday",
                    timeSlots: [
                        {
                            workLocationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
                            workLocationName: "North Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "tuesday",
                    timeSlots: [
                        {
                            workLocationId: "d5fa4a4a-ac68-4d26-8f8c-10fed13c0716",
                            workLocationName: "West Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "wednesday",
                    timeSlots: [
                        {
                            workLocationId: "d5fa4a4a-ac68-4d26-8f8c-10fed13c0716",
                            workLocationName: "West Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "thursday",
                    timeSlots: [
                        {
                            workLocationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
                            workLocationName: "North Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                },
                {
                    day: "friday",
                    timeSlots: [
                        {
                            workLocationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
                            workLocationName: "North Springfield",
                            startTime: "09:00:00.0000000",
                            endTime: "17:00:00.0000000"
                        }
                    ]
                }
            ]
        }
    ];
    
    let timeSlotDuration = 30; //in minutes. currently hardcoded can be queried via api
    let dateStart = null;
    let dateEnd = null;
    let dateTimeSlotList = [];
    let fullCalendarInstance = null;
    let unavailableDateList = [];
    let bookedAppointmentList = [];
    let paymentCountdown = 15; //in minutes
    let paymentIntervalInstance;
    let paymentCountdownTime;

    //START Football Pitch Booking Variables
    let footballPitchBookingLocationList = [
        {
            locationId: "19e60800-a4e2-48dc-9665-cacebaa79cd7",
            locationName: "North Springfield Football Pitch",
            locationAddress: "Blackthorn Rd, Welwyn Garden City AL7 3JP, United Kingdom"
        },
        {
            locationId: "d5fa4a4a-ac68-4d26-8f8c-10fed13c0716",
            locationName: "West Springfield Football Pitch",
            locationAddress: "Osborne Rd, Windsor SL4 3SJ, United Kingdom"
        },
        {
            locationId: "2464ff0b-2dea-4a24-84aa-b747c495a508",
            locationName: "South Springfield Football Pitch",
            locationAddress: "Ladbroke Rd, Horley RH6 8PB, United Kingdom"
        }
    ];//jumphere

    //END Football Pitch Booking Variables
    
    //function list start
    function processShowHide(data, config = cfg_pagevisibility)
    {
        var customPageSet = false;
        $.each(config, function (idx, val){
            if ($.inArray(data, val.values) > -1)
            { 
                KDF.showPage(val.page);
                if(skip_first_page == true)
                {
                    KDF.gotoPage(val.page);
                }
                customPageSet = true;
            }
            else 
            {
                KDF.hidePage(val.page);
            }
        });
        if (customPageSet===false && skip_first_page == true){
            KDF.showPage('ss_report_issue');
            KDF.gotoPage('ss_report_issue');
            KDF.hideWidget('but_back_report_an_issue');
        }
    }
    
    function generateBaseTimeSlot(timeSlotDuration)
    {
        let times = [];
        let tt = 0;
    
        for (let i = 0; tt < 24 * 60; i++) {
            let hh = Math.floor(tt / 60);
            let mm = tt % 60;
            
            times[i] = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2);
            tt = tt + timeSlotDuration;
        }
    
        return times;
    }
    
    function generateLocationBaseTimeSlot(timeSlotObj, officeLocationList)
    {
        let timeSlot = [];
    
        timeSlotObj.forEach(e => {
            let locationProp = [];
    
            officeLocationList.forEach(e => {
                locationProp.push({
                    locationId: e.locationId,
                    locationName: e.locationName,
                    staff: []
                });
            })
    
            timeSlot.push(
                {
                    timeSlot: e,
                    location: locationProp
                }
            );
        });
    
        return timeSlot;
    }
    
    function getAvailableStaffList(dayName, timeSlot, locationId, staffTimeSlotLocationAvailabilityList)
    {
        let availableStaffList = [];
    
        let currentDate = new Date("2000-01-01");
        currentDate.setHours(timeSlot.split(":")[0]);
        currentDate.setMinutes(timeSlot.split(":")[1]);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
    
        staffTimeSlotLocationAvailabilityList.forEach(e => {
            let available = false;
    
            e.workingHours.forEach(f => {
                if(f.day === dayName)
                {
                    f.timeSlots.forEach(g => {
                        if(g.workLocationId == locationId)
                        {
                            let startDate = new Date("2000-01-01");
                            startDate.setHours(g.startTime.split(":")[0]);
                            startDate.setMinutes(g.startTime.split(":")[1]);
                            startDate.setSeconds(g.startTime.split(":")[2]);
                            startDate.setMilliseconds(0);
    
                            let endDate = new Date("2000-01-01");
                            endDate.setHours(g.endTime.split(":")[0]);
                            endDate.setMinutes(g.endTime.split(":")[1]);
                            endDate.setSeconds(g.endTime.split(":")[2]);
                            endDate.setMilliseconds(0);
    
                            if(currentDate >= startDate && currentDate < endDate)
                            {
                                available = true;
                                return;
                            }
                        }
                    });
                    return;
                }
            });
    
            if(available === true)
            {
                availableStaffList.push({
                    staffId: e.staffId,
                    staffName: e.staffName,
                    booked: false
                });
            }
        });
    
        return availableStaffList;
    }
    
    function generateTimeSlot(timeSlotDuration, dayName, staffTimeSlotLocationAvailabilityList)
    {
        let timeSlot = generateBaseTimeSlot(timeSlotDuration);
        timeSlot = generateLocationBaseTimeSlot(timeSlot, officeLocationList);
    
        console.log("test");
    
        timeSlot.forEach(e => {
            e.location.forEach(f => {
                f.staff = getAvailableStaffList(dayName, e.timeSlot, f.locationId, staffTimeSlotLocationAvailabilityList);
            });
        });
        return timeSlot;
    }
    
    function setDateStartEnd(earliestDay, rangeDay)
    {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + earliestDay); 
        dateStart = new Date(currentDate.getTime());
        currentDate.setDate(currentDate.getDate() + rangeDay);
        dateEnd = new Date(currentDate.getTime());
    }
    
    function setDateTimeSlotList()
    {
        dateTimeSlotList = []; //cleanise
        let currDate = new Date(dateStart.getTime());
    
        while(currDate <= dateEnd)
        {
            dateTimeSlotList.push({
                date: currDate.getFullYear().toString()+
                    '-'+(currDate.getMonth() + 1).toString().padStart(2, '0') +
                    '-'+ currDate.getDate().toString().padStart(2, '0'),
                timeSlots: generateTimeSlot(timeSlotDuration, currDate.toLocaleDateString("en-US", {weekday: 'long'}).toLowerCase(), staffTimeSlotLocationAvailabilityList)
            });
            currDate = new Date(currDate.setDate(currDate.getDate() +1));
        }
    }
    
    function fillAppointmentLocation()
    {
        Array.from(document.getElementById("dform_widget_sel_appointment_location").children).forEach(e => {
            if(e.value !== '')
                e.remove();
        });
        
        officeLocationList.forEach(e => {
            let dropDownOption = document.createElement("option");
            dropDownOption.value = e.locationId;
            dropDownOption.text = e.locationName;
            document.getElementById("dform_widget_sel_appointment_location").add(dropDownOption);
        });
    }
    
    function initializePageMarriageRegistration()
    {
        document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML =  "";
        KDF.hideWidget("html_selected_appointment_available");
        document.querySelector("#dform_widget_html_html_fullcalendar > p").remove();
    
        fillAppointmentLocation();
        setDateStartEnd(1,21); //earliest booking least H+1 for range 3 weeks
        setDateTimeSlotList();
        KDF.customdata('integrate-microsoft-bookings', 'integrate-microsoft-bookings', false, true, {
            "formadapter-action": "msb-appointments-get",
            "access-type": "delegated",
            "filter-start-datetime": dateStart.getFullYear().toString()+
                '-'+(dateStart.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ dateStart.getDate().toString().padStart(2, '0') +
                'T00:00+00:00',
            "filter-end-datetime": dateEnd.getFullYear().toString()+
                '-'+(dateEnd.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ dateEnd.getDate().toString().padStart(2, '0') +
                'T00:00+00:00',
        });
    }
    
    function initializePageBirthRegistration()
    {
        document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML =  "";
        KDF.hideWidget("html_selected_appointment_available");
        document.querySelector("#dform_widget_html_html_fullcalendar > p").remove();
    
        fillAppointmentLocation();
        setDateStartEnd(1,21); //earliest booking least H+1 for range 3 weeks
        setDateTimeSlotList();
        KDF.customdata('integrate-microsoft-bookings', 'integrate-microsoft-bookings', false, true, {
            "formadapter-action": "msb-appointments-get",
            "access-type": "delegated",
            "filter-start-datetime": dateStart.getFullYear().toString()+
                '-'+(dateStart.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ dateStart.getDate().toString().padStart(2, '0') +
                'T00:00+00:00',
            "filter-end-datetime": dateEnd.getFullYear().toString()+
                '-'+(dateEnd.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ dateEnd.getDate().toString().padStart(2, '0') +
                'T00:00+00:00',
        });
    
        /*
        let fromDate = new Date();
        fromDate.setDate(fromDate.getDate() + 1);
        let toDate = new Date(fromDate);
        toDate.setDate(toDate.getDate() + 21); //3weeks
        
        document.getElementById("dform_widget_dt_appointment").min = toISOStringWithTimezone(fromDate).substring(0,10);
        document.getElementById("dform_widget_dt_appointment").max = toISOStringWithTimezone(toDate).substring(0,10);
        
        
        
        //clear sel_appointment_time
        Array.from(document.getElementById("dform_widget_sel_appointment_time").children).forEach(e => {
            if(e.value !== '')
                e.remove();
        });
        
        timeChoiceList30m.forEach(e => {
            let dropDownOption = document.createElement("option");
            dropDownOption.value = Object.keys(e)[0];
            dropDownOption.text = Object.values(e)[0];
            document.getElementById("dform_widget_sel_appointment_time").add(dropDownOption);
        });
        
        Array.from(document.getElementById("dform_widget_sel_appointment_location").children).forEach(e => {
            if(e.value !== '')
                e.remove();
        });
        
        cityOfSpringfieldBuildingLocations.forEach(e => {
            let dropDownOption = document.createElement("option");
            dropDownOption.value = e["id"];
            dropDownOption.text = e["name"];
            document.getElementById("dform_widget_sel_appointment_location").add(dropDownOption);
        });
        
        KDF.setVal('sel_appointment_location', "north"); //recentchanges
        
        document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML =  "";
        
        if(KDF.getVal("sel_staff") === null || KDF.getVal("sel_staff") === '')
        {
            // KDF.customdata('integrate-microsoft-bookings', 'integrate-microsoft-bookings', false, true, {
            //     "formadapter-action": "msb-service-staff-get",
            //     "booking-service-type": $("#dform_widget_le_eventcode option:selected").text()
            // });
        }
        
        KDF.customdata('integrate-microsoft-bookings', 'integrate-microsoft-bookings', false, true, {
            "formadapter-action": "msb-appointments-get"
        });
        */
    }
    
    function filterAppointmentTimeSelectField()
    {
        console.log("trigger filterAppointmentTimeSelectField");
            globalmsBookingsAppointmentList.forEach(e => {
            const offset = e.startDate.getTimezoneOffset()
            let startDate = new Date(e.startDate.getTime() - (offset*60*1000))
            startDate = startDate.toISOString().split('T')[0];
            
            if(startDate == KDF.getVal("dt_appointment"))
            {
                var selectobject = document.getElementById("dform_widget_sel_appointment_time");
                for (var i=0; i<selectobject.length; i++) {
                    if (selectobject.options[i].value.substring(0,5) == e.startDate.getHours().toString().padStart(2,"0")+":"+e.startDate.getMinutes().toString().padStart(2,"0"))
                        selectobject.remove(i);
                }
            }
        });
    }
    
    function initializeAppointmentTimeSelectField()
    {
        Array.from(document.getElementById("dform_widget_sel_appointment_time").children).forEach(e => {
            if(e.value !== '')
                e.remove();
        });
        
        timeChoiceList30m.forEach(e => {
            let dropDownOption = document.createElement("option");
            dropDownOption.value = Object.keys(e)[0];
            dropDownOption.text = Object.values(e)[0];
            document.getElementById("dform_widget_sel_appointment_time").add(dropDownOption);
        });
    }
    
    //Custom validation function used by the widgets.  Checks to ensure at least one search field is populated before performing a search
    function validateFields(id, data){
        KDF.hideMessages();
    
        var hasValue = false;
        for(var key in data) {
            if (data.hasOwnProperty(key)){
                if(data[key]!== ""){
                    hasValue = true;
                }
            }
        }
        if(!hasValue){
            //If no fields are displayed - display a warning.  Additional functionality can be added
            // here if you want to prevent the user from continuing or displaying more prominent UI alerts
            KDF.showWarning('Please enter at least one search term');
        }
        return hasValue;
    }
    
    function validatePageBirthRegistration()
    {
        if(
            KDF.getVal("sel_staff") !== null && KDF.getVal("sel_staff") !== ""
            && KDF.getVal("dt_appointment") !== null && KDF.getVal("dt_appointment") !== ""
            && KDF.getVal("sel_appointment_time") !== null && KDF.getVal("sel_appointment_time") !== ""
            )
        {
            /*
            KDF.customdata('integrate-microsoft-bookings', 'integrate-microsoft-bookings', false, true, {
                "formadapter-action": "msb-appointment-validate",
                "service-request-name": $("#dform_widget_le_eventcode option:selected").text(),
                "staff-id": KDF.getVal("sel_staff"),
                "appointment-start-datetime": new Date(KDF.getVal("dt_appointment")+"T"+KDF.getVal("sel_appointment_time").substring(0,5)).toISOString().substring(0,16)+":00.0000000"
            });
            */
        }
    }
    
    function drawFullCalendar()
    {
        KDF.hideWidget("but_reselect_appointment_date");
        document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML = "";
        KDF.hideWidget("html_selected_appointment_available");
    
        fullCalendarInstance = new FullCalendar.Calendar(document.getElementById('dform_widget_html_html_fullcalendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            weekends: false,
            allDaySlot: false,
            contentHeight: 600,
            slotMinTime: '09:00:00',
            slotMaxTime: '17:00:00',
            headerToolbar: {
                start: 'backToMonthView', // will normally be on the left. if RTL, will be on the right
                center: 'title',
                end: 'prev,next' // will normally be on the right. if RTL, will be on the left
            },
            customButtons: {
                backToMonthView: {
                    text: '◀ Back',
                    click: function() {
                        fullCalendarInstance.changeView('dayGridMonth');
                        //document.querySelector(".fc-prev-button").style.display = "block"; forgot what is this for
                        //document.querySelector(".fc-next-button").style.display = "block";
                        try{
                            document.querySelector(".fc-backToMonthView-button").style.display = "none";
                        }catch(ex)
                        {
                            console.log(ex);
                        }
                        fullCalendarInstance.getEvents().forEach(e => e.remove());
                    }
                }
            },
            validRange: {
                start: dateStart,
                end: dateEnd
            },
            dateClick: function(info) {
                if(unavailableDateList.includes(info.dateStr))
                    return;
    
                populateCalendarDateEvents(info.dateStr);
    
                fullCalendarInstance.changeView('timeGridDay', info.dateStr);
                //document.querySelector(".fc-prev-button").style.display = "none"; forgot what is this for
                //document.querySelector(".fc-next-button").style.display = "none";
    
                try{
                    document.querySelector(".fc-backToMonthView-button").style.display = "block";
                }catch(ex)
                {
                    console.log(ex);
                }
    
                let slotMinTime = "00:00:00";
                let slotMaxTime = "24:00:00";
    
                let events = fullCalendarInstance.getEvents();
                let i = 0;
                let currDateTime = new Date(info.dateStr + 'T00:00:00');
    
                for (i = 0; i < events.length ; i++)
                {
                    if(events[i].title == "N/A" && events[i].start.getTime() == currDateTime.getTime())
                    {
                        slotMinTime = events[i].endStr.substring(11,19);
                        currDateTime.setMinutes(currDateTime.getMinutes() + timeSlotDuration);
                    }
                    else
                    {
                        break;
                    }
                }
    
                currDateTime = new Date(info.dateStr + 'T00:00:00');
                currDateTime.setDate(currDateTime.getDate() +1 );
    
                for (i = events.length - 1; i >= 0 ; i--)
                {
                    if(events[i].title == "N/A" && events[i].end.getTime() == currDateTime.getTime())
                    {
                        slotMaxTime = events[i].startStr.substring(11,19);
                        currDateTime.setMinutes(currDateTime.getMinutes() - timeSlotDuration);
                    }
                    else
                    {
                        break;
                    }
                }
    
                fullCalendarInstance.setOption('slotMinTime', slotMinTime);
                fullCalendarInstance.setOption('slotMaxTime', slotMaxTime);
            },
            select: function(info) {
                if(info.view.type === "timeGridDay")
                {
                    KDF.setVal("txt_appointment_date_start", info.startStr.substring(0,20)+"00:00");
                    KDF.setVal("txt_appointment_date_end", info.endStr.substring(0,20)+"00:00");
                    fullCalendarInstance.destroy();
                    KDF.showWidget("but_reselect_appointment_date");
                    autoPickAppointment();
                    document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML = getAppointmentMessage();
                    KDF.showWidget("html_selected_appointment_available");
                        // "✔ Your appointment set for " +
                        // info.start.toLocaleString('en-US', { month: 'long', hour12: true })+" "+
                        // info.start.toLocaleString('en-US', { day: 'numeric', hour12: true })+", "+
                        // info.start.toLocaleString('en-US', { year: 'numeric', hour12: true })+" at "+
                        // info.start.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true })+" to "+
                        // info.end.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true });
                    //document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].style.fontSize = "large";
                    //document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].style.color = "black"; //changedtoblack
                    KDF.showSection("area_staff_selection");
                    showHideSelStaff();
                }
            },
        });
        fullCalendarInstance.render();
        try{
            document.querySelector(".fc-backToMonthView-button").style.display = "none";
        }catch(ex)
        {
            console.log(ex);
        }
        setUnavailableDateList();
        setDisabledUnavailableDates();
    }
    
    function setTextAreaAppointmentLocation()
    {
        let locationAddress = null;
    
        let locationId = KDF.getVal("sel_appointment_location");
    
        if(locationId !== undefined && locationId !== null)
        {
            locationAddress = officeLocationList.find(e => e.locationId == locationId).locationAddress;
        }
        else
        {
            if(locationId === undefined)
            {
                console.log("sel_appointment_location NOT EXIST");
            }
        }
    
        KDF.setVal("txta_appointment_location", locationAddress);
    
        KDF.setVal('txt_appointment_location_id', locationId);
        KDF.setVal('txt_appointment_location_name', $("#dform_widget_sel_appointment_location option:selected").text());
        KDF.setVal('txt_appointment_location_address', locationAddress);
    }
    
    function setSelOfficeLocationVisibility()
    {
        KDF.setVal('txt_appointment_location_id', '');
        KDF.setVal('txt_appointment_location_name', '');
        KDF.setVal('txt_appointment_location_address', '');
    
        KDF.setVal("sel_appointment_location", null);
        
        let chooseOfficeLocation = KDF.getVal("chk_choose_office_location");
    
        if(chooseOfficeLocation == "true")
        {
            KDF.showWidget('sel_appointment_location');
            KDF.showWidget('txta_appointment_location');
        }
        else
        {
            KDF.hideWidget('sel_appointment_location');
            KDF.hideWidget('txta_appointment_location');
        }
    }
    
    function populateCalendarDateEvents(selectedDate)
    {
        let locationId = KDF.getVal("sel_appointment_location");
    
        dateTimeSlotList.forEach(e => {
            if(e.date == selectedDate)
            {
                let date = e.date;
                e.timeSlots.forEach(f => {
                    let timeSlot = f.timeSlot;
                    let numberOfWorkingStaff = 0;
                    let numberOfAvailableStaff = 0;
                    f.location.forEach(g => {
                        if(locationId == null)
                        {
                            g.staff.forEach(h => {
                                ++numberOfWorkingStaff;
    
                                if(h.booked == false)
                                    ++numberOfAvailableStaff;
                            });
                        }
                        else
                        {
                            if(locationId == g.locationId)
                            {
                                g.staff.forEach(h => {
                                    ++numberOfWorkingStaff;
    
                                    if(h.booked == false)
                                        ++numberOfAvailableStaff;
                                });
                            }
                        }
                    });
                    
                    let eventTitle = "Placeholder";
                    let startDateTime = date+"T"+timeSlot;
                    let tempDateTime = new Date(startDateTime);
                    tempDateTime.setMinutes(tempDateTime.getMinutes() + timeSlotDuration);
                    let endDateTime = tempDateTime.getFullYear().toString()+
                        '-'+(tempDateTime.getMonth() + 1).toString().padStart(2, '0') +
                        '-'+ tempDateTime.getDate().toString().padStart(2, '0') +
                        'T'+ tempDateTime.getHours().toString().padStart(2, '0') +
                        ':'+ tempDateTime.getMinutes().toString().padStart(2, '0');
                    let bgColor = "#8800ff"; //purple means error
    
                    if(numberOfWorkingStaff == 0)
                    {
                        eventTitle = 'N/A';
                        bgColor = '#ADADAD'; //greyish
                    }
                    else
                    {
                        if(numberOfAvailableStaff == 0)
                        {
                            eventTitle = "Booked";
                            bgColor = '#ff0055'; //red
                        }
                    }
    
                    //textString += "\n"+startDateTime+"|"+endDateTime;
    
                    if(numberOfAvailableStaff == 0 || numberOfWorkingStaff == 0)
                    {
                        fullCalendarInstance.addEvent({
                            title: eventTitle,
                            start: startDateTime,
                            end: endDateTime,
                            backgroundColor: bgColor
                        });
                    }
                });
                return;
            }
        });
    }
    
    function setUnavailableDateList()
    {
        unavailableDateList = [];
    
        let locationId = KDF.getVal('sel_appointment_location');
    
        if(locationId == undefined || locationId == null)
            locationId = "";
    
        dateTimeSlotList.forEach(e => {
            let date = e.date;
            let freeSlot = 0;
            e.timeSlots.forEach(f => {
                let locationList = f.location;
    
                if(locationId != "")
                    locationList = f.location.filter(x => x.locationId == locationId);
    
                locationList.forEach(g => {
                    g.staff.forEach(h => {
                        if(h.booked == false)
                            freeSlot++;
                    });
                });
            });
    
            if(freeSlot == 0)
                unavailableDateList.push(date);
        });
    }
    
    function setDisabledUnavailableDates()
    {
        unavailableDateList.forEach(e => {
            document.querySelector("td[data-date='" + e + "']")?.classList.add("fc-day-disabled");
        });
    }
    
    function showHideAppointmentPicker(firstRun = false)
    {
        KDF.setVal('txt_appointment_date_start', '');
        KDF.setVal('txt_appointment_date_end', '');
        KDF.setVal('txt_appointment_staff_id', '');
        KDF.setVal('txt_appointment_staff_name', '');
        KDF.setVal('txt_appointment_location_id', '');
        KDF.setVal('txt_appointment_location_name', '');
        KDF.setVal('txt_appointment_location_address', '');
        
        //document.getElementById("dform_widget_chk_choose_office_location").checked = false;
        KDF.setVal('chk_choose_office_location' ,false);
        //setSelOfficeLocationVisibility();
    
        //document.getElementById("dform_widget_chk_choose_staff").checked = false;
        KDF.setVal('chk_choose_staff' ,false);
        //showHideSelStaff();
    
        KDF.hideWidget("but_reselect_appointment_date");
        document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML =  "";
        KDF.hideWidget("html_selected_appointment_available");
        
        KDF.hideSection("area_staff_selection");
    
        if(KDF.getVal('rad_appointment_pick') == 'autopick' || firstRun == true)
        {
            KDF.hideSection("area_office_location");
            KDF.hideSection("area_fullcalendar");
            
            if(firstRun == false)
            {
                autoPickEarliestAppointment();
            }
            else
            {
                document.getElementById("dform_widget_button_but_birth_registration_next").disabled = true;
            }
        }
        else if(KDF.getVal('rad_appointment_pick') == 'choosemyself')
        {
            KDF.showSection("area_office_location");
            KDF.showSection("area_fullcalendar");
            drawFullCalendar();
        }
    
        //reset state
        
    }
    //function list end
    
    function initialfirstruninject(event, kdf) {//$("#dform_sr_non_location_msb").off("_KDF_ready").on("_KDF_ready", function (event, kdf) {
        
        //Instantiate the character count widget
        $("#dform_widget_txta_more_details").charcount({});
        $("#dform_widget_txta_commerical_waste_quantity").charcount({});
        $("#dform_widget_txta_building_violation_description").charcount({});
    
        //*******************************************************************
        //****** SECTION B - NOT TYPICALLY CONFIGURED PER CUSTOMER **********
        //*******************************************************************
        do_KDF_Ready_Individual(event, kdf);
        
        //Get serviceid parameter from URL
        var service_id = parseInt(KDF.kdf().params.le_eventcode, 10);
        var values = [];
        var service_dropdown_value;
        skip_first_page = true;
        
        //Get all of the value on each select element on case dropdown, save it to values array
        $("#dform_widget_le_eventcode").children().each(function(){
            service_dropdown_value = $(this).val();
            if (service_dropdown_value !== ''){
                values.push(parseInt(service_dropdown_value,10));
            }
        });
        
        //Check whether given serviceid params is on the values array
        //If so, set the selected element as 'selected', update the header title (with case name), and hide the dropdown
        if(!Number.isNaN(service_id) && values.findIndex(x => x == service_id) > -1){
            
            $("#dform_widget_le_eventcode").hide();
            $("#dform_widget_le_eventcode").val(service_id).prop('selected',true);
            
            var final_header_page = $("#dform_widget_le_eventcode option:selected").text();
            
            $("#dform_page_report_non_emerg").find(".header2").text(final_header_page);
            $("label[for =dform_widget_le_eventcode]").hide();
            
            hideWidgets(['but_submit','but_btn_back_abandoned','but_back_blocked_sewer','but_back_building_violation']);
            processShowHide(final_header_page);
        }
        
        //next on your details page
        $("#dform_widget_button_but_next_update_yd").off("click").on("click", function (evt) {
            if(KDF.kdf().access=== 'agent'){
                validateProperty('txta_address_yd');
            }
            else{
                KDF.gotoNextPage();
            }
        });
      
        //Homepage button - redirect user to a specified URL (e.g. organization website or home page of portal)
        $("#dform_widget_button_but_homepage").off("click").on("click", function (e) { window.location.href = homepage_url;  });
    
        //Submit Another button
        $('#dform_widget_button_but_submit_another').off('click').on('click', function(e){   window.location.reload();   });
        
        //update address clicked
        $('#dform_widget_button_but_cust_info_update_address').off('click').on('click', function () {
            KDF.showSection('area_property_search_yd');
            hideWidgets(['txta_address_yd','bset_your_details_next_updateaddress']);
    
            $('#property_search_widget_citizen').locationsearch('reset');
        });
        
        defineDefaultStyle();
        applyNewStyle();
        do_KDF_Ready_Individual(event, kdf);
        
        if(KDF.kdf().viewmode !== 'U')
        {
            KDF.hideControls();
        }
    }
        
    //Hide the success message,enabling the 'submit another' button and 'Return to homepage' button on the complete page
    $('#dform_sr_non_location_msb').off('_KDF_save').on('_KDF_save', function(event, kdf) {
        $('#dform_successMessage').html('').hide();
        $('#dform_widget_button_but_submit_another').prop('disabled', false);
        $('#dform_widget_button_but_homepage').prop('disabled', false);
    });//END _KDF_save
    
    $('#dform_sr_non_location_msb').off('_KDF_custom').on('_KDF_custom', function(event, kdf, response, action) {
        /* idk what this do
        //apply custom logic from manageindividual.js
        do_KDF_Custom_Individual(event, kdf, response, action);
        */
    
        if(action === "integrate-microsoft-bookings")
        {
            let responseXml = new DOMParser().parseFromString(response.data,"text/xml");
            
            if(responseXml.getElementsByTagName("dfor:form-data")[0].getElementsByTagName("dfor:field")[0].getElementsByTagName("dfor:value")[0].innerHTML == "msb-appointments-get")
            {
                Array.from(responseXml.getElementsByTagName("dfor:form-data")[0].getElementsByTagName("dfor:field")).forEach(e => {
                    if(e.getElementsByTagName("dfor:name")[0].innerHTML == "msb-appointments")
                    {
                        Array.from(e.getElementsByTagName("dfor:children")[0].getElementsByTagName("dfor:child")).forEach(f => {
                            let appointment = {};
                            Array.from(f.getElementsByTagName("dfor:field")).forEach(g => {
                                appointment[g.getElementsByTagName("dfor:name")[0].innerHTML] = g.getElementsByTagName("dfor:value")[0].innerHTML;
                            });
                            bookedAppointmentList.push(appointment);
                        });
                    }
                });
    
                console.log(bookedAppointmentList);
                markBookedAppointment();
                showHideAppointmentPicker(true);
                //document.getElementById('dform_widget_rad_appointment_pick1').click(); //don't auto-pick
                return;
            }

            if(responseXml.getElementsByTagName("dfor:form-data")[0].getElementsByTagName("dfor:field")[0].getElementsByTagName("dfor:value")[0].innerHTML == "msb-appointment-create-pending-payment")
            {
                Array.from(responseXml.getElementsByTagName("dfor:form-data")[0].getElementsByTagName("dfor:field")).forEach(e => {
                    if(e.getElementsByTagName("dfor:name")[0].innerHTML == "msb-appointment-id")
                    {
                        KDF.setVal("txt_appointment_pending_payment_id", e.getElementsByTagName("dfor:value")[0].innerHTML);
                    }
                });

                KDF.showPage('page_payment');
                KDF.gotoPage('page_payment');
            }
        }
    });
    
    $('#dform_sr_non_location_msb').off('_KDF_pageChange').on('_KDF_pageChange', function(event, kdf, currentpageid, targetpageid) {
        let currentPageName = $('.dform_page[data-pos="'+currentpageid+'"]').attr('id');
        let targetPageName = $('.dform_page[data-pos="'+targetpageid+'"]').attr('id');
        
        if(targetPageName == "dform_page_page_birth_registration"){
            initializePageBirthRegistration();
    
            console.log("breakpoint initializePageBirthRegistration");
        }else if(targetPageName == "dform_page_page_marriage_registration"){
            initializePageMarriageRegistration();
    
            console.log("breakpoint initializePageMarriageRegistration");
        }else if (targetPageName == 'dform_page_your_details_citizen'){
            //workaround during edit all of the fields is disabled
            if(KDF.kdf().form.caseid != '')
            {
                KDF.makeWritable("txt_firstname");
            }
        }else if (targetPageName == 'dform_page_page_football_pitch_booking'){
            initializeFootballPitchBooking();
            console.log("initializeFootballPitchBooking");
        }else if (targetPageName == 'dform_page_page_payment'){
            initializePagePayment();
        }
    });
    
    $('#dform_sr_non_location_msb').off('_KDF_saveError').on('_KDF_saveError', function(event, kdf) {
        // fires when the form has been saved but the server returned validation errors
        KDF.showError('Oops, something went wrong');
    });
    
    $('#dform_sr_non_location_msb').off('_KDF_complete').on('_KDF_complete', function(event, kdf) {
        KDF.setVal('txt_caseid', KDF.kdf().saveresponse.caseid);
        if (KDF.kdf().access=== 'agent' && KDF.kdf().viewmode != 'U'){
            $('#dform_successMessage').remove();
        }
    });
    
    $('#dform_sr_non_location_msb').off('_KDF_optionSelected').on('_KDF_optionSelected', function(event, kdf, field, label, val) {
        //apply logic from manageindividual.js when option widget selected such as individual search or property search selected
        if(field === 'le_eventcode'){
            skip_first_page = false;
            showWidgets(['but_back_report_an_issue','but_submit','but_btn_back_abandoned','but_back_blocked_sewer','but_back_building_violation','but_back_birth_registration']);
            processShowHide(label); 
        }
        else if (field === 'sel_appointment_location')
        {
            setTextAreaAppointmentLocation();
            drawFullCalendar(); //dont redraw, just recalc available date edit: must redraw, weekview not updated
        }
        else if(field === 'chk_choose_office_location')
        {
            setSelOfficeLocationVisibility();
            drawFullCalendar();
        }
        else if(field === 'chk_choose_staff')
        {
            showHideSelStaff();
        }
        else if(field == 'rad_appointment_pick')
        {
            showHideAppointmentPicker();
        }
        else if (field === 'sel_staff')
        {
            let staffId = "";
            let staffName = "";
    
            if(KDF.getVal("sel_staff") != undefined && KDF.getVal("sel_staff") != null)
            {
                staffId = KDF.getVal("sel_staff");
                staffName = $("#dform_widget_sel_staff option:selected").text();
            }
    
            KDF.setVal("txt_appointment_staff_id", staffId);
            KDF.setVal("txt_appointment_staff_name", staffName);
            document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML =  getAppointmentMessage();
            KDF.showWidget("html_selected_appointment_available");
        }
        else if (field === 'sel_football_pitch_booking_location')
        {
            setTextAreaFootballPitchBookingLocation();//jumphere
            drawFullCalendarFootballPitchBooking();
        }
    });
    
    $('#dform_sr_non_location_msb').off('_KDF_fieldChange').on('_KDF_fieldChange', function(event, kdf, field) {
        /*
        if(field.id === 'dform_widget_dt_appointment')
        {
            if(KDF.getVal("dt_appointment") !== null & KDF.getVal("dt_appointment") !== "")
                fullCalendarInstance.changeView('timeGridDay', KDF.getVal("dt_appointment"));
                
            initializeAppointmentTimeSelectField();
            filterAppointmentTimeSelectField();
        }
        */
        
        /*
        if(field.id === 'dform_widget_sel_staff'
            || field.id === 'dform_widget_dt_appointment'
            || field.id === 'dform_widget_sel_appointment_time')
        {
            validatePageBirthRegistration();
        }
        */
    });
    
    $('#dform_widget_button_but_reselect_appointment_date').off('click').on('click', function(e){   
        //document.getElementById("dform_widget_chk_choose_office_location").checked = false;
        KDF.setVal('chk_choose_office_location' ,false);
        //setSelOfficeLocationVisibility();
    
        //document.getElementById("dform_widget_chk_choose_staff").checked = false;
        KDF.setVal('chk_choose_staff' ,false);
        //showHideSelStaff();
    
        KDF.hideSection("area_staff_selection");
    
        drawFullCalendar();
    });
    
    function populateSelStaff()
    {
        KDF.setVal("sel_staff", null);
        KDF.setVal("txt_appointment_staff_id", null);
        KDF.setVal("txt_appointment_staff_name", null);
    
        let appointmentDateStart = KDF.getVal("txt_appointment_date_start");
    
        if(appointmentDateStart == undefined || appointmentDateStart == null)
            appointmentDateStart = "";
    
        let officeLocationId = KDF.getVal("txt_appointment_location_id");
    
        if(officeLocationId == undefined || officeLocationId == null)
            officeLocationId = "";
    
        let queriedAvailableStaff = [];
        
        Array.from(document.getElementById("dform_widget_sel_staff").children).forEach(e => {
            if(e.value !== '')
                e.remove();
        });
    
        if(appointmentDateStart != "")
        {
            let appointmentDate = appointmentDateStart != "" ? appointmentDateStart.substring(0,10) : "";
            let appointmentTime = appointmentDateStart != "" ? appointmentDateStart.substring(11,16) : "";
    
            dateTimeSlotList.filter(e => e.date == appointmentDate)[0].timeSlots.filter(e => e.timeSlot == appointmentTime)[0].location.forEach(e => {
                if(officeLocationId != "" && officeLocationId != e.locationId)
                    return;
    
                e.staff.forEach(f => {
                    if(f.booked == true)
                        return;
    
                    queriedAvailableStaff.push({
                        staffId: f.staffId,
                        staffName: f.staffName
                    });
                });
            });
        }
        
        queriedAvailableStaff.forEach(e => {
            let dropDownOption = document.createElement("option");
            dropDownOption.value = e.staffId;
            dropDownOption.text = e.staffName;
            document.getElementById("dform_widget_sel_staff").add(dropDownOption);
        });
    }
    
    function showHideSelStaff()
    {
        if(KDF.getVal("chk_choose_staff") == "true")
        {
            KDF.showWidget("sel_staff");
            populateSelStaff();
        }
        else
        {
            KDF.hideWidget("sel_staff");
        }
    }
    
    function autoPickEarliestAppointment()
    {
        let dtStart = "";
        let tmStart = "";
        let sId = "";
        let sName = "";
        let locId = "";
        let locName = "";
        let locAddress = "";
        let contTravel = true;
        let strDateTimeStartDate = "";
        let strDateTimeEndDate = "";
    
        dateTimeSlotList.every(e => {
            e.timeSlots.every(f => {
                f.location.every(g => {
                    g.staff.every(h => {
                        if(h.booked == false)
                        {
                            dtStart = e.date;
                            tmStart = f.timeSlot;
                            sId = h.staffId;
                            sName = h.staffName;
                            locId = g.locationId;
                            locName = g.locationName;
                            contTravel = false;
                        }
                        return contTravel;
                    });
                    return contTravel;
                });
                return contTravel;
            });
            return contTravel;
        });
    
        //document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].style.fontSize = "large";
    
        if(contTravel == false)
        {
            //document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].style.color = "black";
            let objDateTimeStart = new Date(dtStart + "T" + tmStart);
            let objDateTimeEnd = new Date(objDateTimeStart.getTime());
            objDateTimeEnd.setMinutes(objDateTimeEnd.getMinutes() + 30);
            locAddress = officeLocationList.find(e => e.locationId == locId).locationAddress;
    
            strDateTimeStartDate = objDateTimeStart.getFullYear().toString()+
                '-'+(objDateTimeStart.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ objDateTimeStart.getDate().toString().padStart(2, '0') +
                'T'+ objDateTimeStart.getHours().toString().padStart(2, '0') +
                ':'+ objDateTimeStart.getMinutes().toString().padStart(2, '0') + "+00:00";
            strDateTimeEndDate = objDateTimeEnd.getFullYear().toString()+
                '-'+(objDateTimeEnd.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ objDateTimeEnd.getDate().toString().padStart(2, '0') +
                'T'+ objDateTimeEnd.getHours().toString().padStart(2, '0') +
                ':'+ objDateTimeEnd.getMinutes().toString().padStart(2, '0') + "+00:00";
        }
        else
        {
            document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].style.color = "red";
        }
        
        KDF.setVal('txt_appointment_date_start', strDateTimeStartDate);
        KDF.setVal('txt_appointment_date_end', strDateTimeEndDate);
        KDF.setVal('txt_appointment_staff_id', sId);
        KDF.setVal('txt_appointment_staff_name', sName);
        KDF.setVal('txt_appointment_location_id', locId);
        KDF.setVal('txt_appointment_location_name', locName);
        KDF.setVal('txt_appointment_location_address', locAddress);
        document.getElementById("dform_widget_html_html_selected_appointment_available").children[0].innerHTML =  getAppointmentMessage();
        KDF.showWidget("html_selected_appointment_available");
    }
    
    function getAppointmentMessage()
    {
        let message = "ⓧ There is no available timeslot, Please Contact Administrator for further inquiry.";
        let strDateTimeStartDate = KDF.getVal("txt_appointment_date_start");
        if(strDateTimeStartDate == undefined || strDateTimeStartDate == null)
            strDateTimeStartDate = "";
        let strDateTimeEndDate = KDF.getVal("txt_appointment_date_end");
        if(strDateTimeEndDate == undefined || strDateTimeEndDate == null)
            strDateTimeEndDate = "";
    
        if(strDateTimeStartDate != "" && strDateTimeEndDate != "")
        {
            let objDateTimeStart = new Date(strDateTimeStartDate.substring(0,16));
            let objDateTimeEnd = new Date(strDateTimeEndDate.substring(0,16));
    
            message = "<b>Appointment:</b> "+
                objDateTimeStart.toLocaleString('en-US', { month: 'long', hour12: true })+" "+
                objDateTimeStart.toLocaleString('en-US', { day: 'numeric', hour12: true })+", "+
                objDateTimeStart.toLocaleString('en-US', { year: 'numeric', hour12: true })+" at "+
                objDateTimeStart.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true })+" to "+
                objDateTimeEnd.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true }) +"<br>"+
                "<b>Location:</b> " + KDF.getVal('txt_appointment_location_name') + "<br>" +
                "<b>Address:</b> " + KDF.getVal('txt_appointment_location_address') +"<br>" +
                "<b>Staff:</b> " + KDF.getVal('txt_appointment_staff_name');
            document.getElementById("dform_widget_button_but_birth_registration_next").disabled = false;
        }
    
        return message;
    }
    
    function autoPickAppointment()
    {
        let strDateTimeStartDate = KDF.getVal("txt_appointment_date_start");
        if(strDateTimeStartDate == undefined || strDateTimeStartDate == null)
            strDateTimeStartDate = "";
        let strDateTimeEndDate = KDF.getVal("txt_appointment_date_end");
        if(strDateTimeEndDate == undefined || strDateTimeEndDate == null)
            strDateTimeEndDate = "";
    
        let officeLocationId = KDF.getVal("txt_appointment_location_id");
        if(officeLocationId == undefined || officeLocationId == null)
            officeLocationId = "";
    
        if(strDateTimeStartDate != "" && strDateTimeEndDate != "")
        {
            let objFilterDate = dateTimeSlotList.filter(e => e.date == strDateTimeStartDate.substring(0,10))[0];
            let objFilterTimeSlot = objFilterDate.timeSlots.filter(e => e.timeSlot == strDateTimeStartDate.substring(11,16))[0];
            let objFilterLoc = objFilterTimeSlot.location;
    
            if(officeLocationId != "")
            {
                objFilterLoc = objFilterTimeSlot.location.filter(e => e.locationId == officeLocationId);
            }
    
            let contTrav = true;
            objFilterLoc.every(e => {
                e.staff.every(f => {
                    if(f.booked == false)
                    {
                        if(officeLocationId == "")
                        {
                            KDF.setVal('txt_appointment_location_id', e.locationId);
                            KDF.setVal('txt_appointment_location_name', e.locationName);
                            KDF.setVal('txt_appointment_location_address', officeLocationList.find(x => x.locationId == e.locationId).locationAddress);
                        }
    
                        KDF.setVal('txt_appointment_staff_id', f.staffId);
                        KDF.setVal('txt_appointment_staff_name', f.staffName);
                        contTrav = false;
                    }
                    return contTrav;
                });
                return contTrav;
            });
        }
        else
        {
            console.log("Error: autoPickAppointment unknown");
        }
    }
    
    function markBookedAppointment()
    {
        let serviceName = $("#dform_widget_le_eventcode option:selected").text();
    
        bookedAppointmentList.forEach(e => {
            if(e["msb-service-name"] == serviceName)
            {
                try {
                    dateTimeSlotList.filter(x => x.date == e["msb-start-date"].substring(0,10))[0]
                    .timeSlots.filter(x => x.timeSlot == e["msb-start-date"].substring(11,16))[0]
                    .location.filter(x => x.locationName == e["msb-appointment-location"].split('(')[0].trim())[0]
                    .staff.filter(x => x.staffId == e["msb-staff-id"])[0]
                    .booked = true;
                }
                catch(err) {
                    console.log(err);
                }
            }
        });
    }

    function getFootballPitchBookingAppointmentDetailMessage()
    {
        let message = "ⓧ There is no available timeslot, Please Contact Administrator for further inquiry.";
        let strDateTimeStartDate = KDF.getVal("txt_appointment_date_start");
        if(strDateTimeStartDate == undefined || strDateTimeStartDate == null)
            strDateTimeStartDate = "";
        let strDateTimeEndDate = KDF.getVal("txt_appointment_date_end");
        if(strDateTimeEndDate == undefined || strDateTimeEndDate == null)
            strDateTimeEndDate = "";
    
        if(strDateTimeStartDate != "" && strDateTimeEndDate != "")
        {
            let objDateTimeStart = new Date(strDateTimeStartDate.substring(0,16));
            let objDateTimeEnd = new Date(strDateTimeEndDate.substring(0,16));
    
            message = "<b>Appointment:</b> "+
                objDateTimeStart.toLocaleString('en-US', { month: 'long', hour12: true })+" "+
                objDateTimeStart.toLocaleString('en-US', { day: 'numeric', hour12: true })+", "+
                objDateTimeStart.toLocaleString('en-US', { year: 'numeric', hour12: true })+" at "+
                objDateTimeStart.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true })+" to "+
                objDateTimeEnd.toLocaleString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true }) +"<br>"+
                "<b>Location:</b> " + KDF.getVal('txt_appointment_location_name') + "<br>" +
                "<b>Address:</b> " + KDF.getVal('txt_appointment_location_address');
            KDF.showWidget("but_next_football_pitch_booking");
        }
    
        return message;
    }

    function drawFullCalendarFootballPitchBooking()
    {
        let locationId = KDF.getVal("sel_football_pitch_booking_location");
    
        if(locationId == undefined || locationId == null)
        {
            locationId = "";
        }

        if(locationId == "")
        {
            fullCalendarInstance.destroy();
            KDF.hideWidget('but_reselect_football_pitch_booking_timeslot');
            return;
        }

        fullCalendarInstance = new FullCalendar.Calendar(document.getElementById('dform_widget_html_html_football_pitch_booking_fullcalendar'), {
            slotDuration: '03:00:00',
            initialView: 'dayGridMonth',
            selectable: true,
            weekends: true,
            allDaySlot: false,
            contentHeight: 'auto',
            slotMinTime: '07:00:00',
            slotMaxTime: '22:00:00',
            headerToolbar: {
                start: '',
                center: 'title',
                end: 'prev,next' // will normally be on the right. if RTL, will be on the left
            },
            customButtons: {
                backToMonthView: {
                    text: '◀ Back',
                    click: function() {
                        fullCalendarInstance.changeView('dayGridMonth');
                        fullCalendarInstance.setOption('headerToolbar', {
                            start: '',
                            center: 'title',
                            end: 'prev,next' // will normally be on the right. if RTL, will be on the left
                        });
                        fullCalendarInstance.getEvents().forEach(e => e.remove());
                    }
                }
            },
            validRange: {
                start: dateStart,
                end: dateEnd
            },
            dateClick: function(info) {
                // if(unavailableDateList.includes(info.dateStr))
                //     return;
    
                //populateCalendarDateEvents(info.dateStr);
                fullCalendarInstance.setOption('headerToolbar', {
                    start: 'backToMonthView', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: ''
                });
                //fullCalendarInstance.setOption("contentHeight", 'auto');
                fullCalendarInstance.changeView('timeGridDay', info.dateStr);
            },
            select: function(info) {
                if(info.view.type === "timeGridDay")
                {
                    KDF.setVal("txt_appointment_date_start", info.startStr.substring(0,20)+"00:00");
                    KDF.setVal("txt_appointment_date_end", info.endStr.substring(0,20)+"00:00");
                    fullCalendarInstance.destroy();
                    KDF.hideWidget("sel_football_pitch_booking_location");
                    KDF.hideWidget("txta_football_pitch_booking_location");
                    KDF.showWidget("but_reselect_football_pitch_booking_timeslot");
                    document.getElementById("dform_widget_html_html_football_pitch_booking_appointment_details").children[0].innerHTML = getFootballPitchBookingAppointmentDetailMessage();
                    KDF.showWidget("html_football_pitch_booking_appointment_details");
                }
            },
        });
        fullCalendarInstance.render();
    }

    function setTextAreaFootballPitchBookingLocation()
    {
        let locationAddress = null;
    
        let locationId = KDF.getVal("sel_football_pitch_booking_location");
    
        if(locationId !== undefined && locationId !== null)
        {
            locationAddress = officeLocationList.find(e => e.locationId == locationId).locationAddress;
        }
        else
        {
            if(locationId === undefined)
            {
                console.log("sel_football_pitch_booking_location NOT EXIST");
            }
        }
    
        KDF.setVal("txta_football_pitch_booking_location", locationAddress);
    
        KDF.setVal('txt_appointment_location_id', locationId);
        KDF.setVal('txt_appointment_location_name', $("#dform_widget_sel_football_pitch_booking_location option:selected").text());
        KDF.setVal('txt_appointment_location_address', locationAddress);
    }

    function fillSelectFootballPitchBookingLocation()
    {
        Array.from(document.getElementById("dform_widget_sel_football_pitch_booking_location").children).forEach(e => {
            if(e.value !== '')
                e.remove();
        });
        
        footballPitchBookingLocationList.forEach(e => {
            let dropDownOption = document.createElement("option");
            dropDownOption.value = e.locationId;
            dropDownOption.text = e.locationName;
            document.getElementById("dform_widget_sel_football_pitch_booking_location").add(dropDownOption);
        });//jumphere
    }

    function initializeFootballPitchBooking()
    {
        setDateStartEnd(1,30); //earliest booking least H+1 for range 30 days
        fillSelectFootballPitchBookingLocation();
        KDF.showWidget("sel_football_pitch_booking_location");
        KDF.showWidget("txta_football_pitch_booking_location");
        document.getElementById('dform_widget_html_html_football_pitch_booking_fullcalendar').children[0]?.remove();
        KDF.hideWidget('html_football_pitch_booking_appointment_details');
        KDF.hideWidget('but_reselect_football_pitch_booking_timeslot');
    }

    function initializePagePayment()
    {
        console.log("initializePagePayment");
        KDF.hideWidget("but_page_payment_return_back");
        KDF.hideWidget("but_next_payment_page");
        document.getElementById("dform_widget_html_html_payment_countdown").children[0].style.fontSize = "xx-large";
        document.getElementById("dform_widget_html_html_payment_countdown").children[0].innerHTML = "Time left to pay: "+paymentCountdown+"m";

        let currDate = new Date();
        currDate.setMinutes(currDate.getMinutes() + paymentCountdown);
        paymentCountdownTime = currDate.getTime();

        paymentIntervalInstance = setInterval(function() {
            let now = new Date().getTime();
            let distance = paymentCountdownTime - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("dform_widget_html_html_payment_countdown").children[0].innerHTML = "Time left to pay: " + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(paymentIntervalInstance);
                document.getElementById("dform_widget_html_html_payment_countdown").children[0].innerHTML = "ⓧ EXPIRED";
                KDF.showWidget("but_page_payment_return_back");
            }
        }, 1000);
    }

    $('#dform_widget_button_but_reselect_football_pitch_booking_timeslot').off('click').on('click', function(e){   
        KDF.showWidget("sel_football_pitch_booking_location");
        KDF.showWidget("txta_football_pitch_booking_location");
        KDF.hideWidget("html_football_pitch_booking_appointment_details");
        KDF.hideWidget("but_next_football_pitch_booking");
        KDF.setVal("sel_football_pitch_booking_location", null);
    });

    $('#dform_widget_button_but_next_football_pitch_booking').off('click').on('click', function(e){
        document.getElementById("dform_widget_button_but_next_football_pitch_booking").disabled = true; //disable it to prevent doubleclick
        let currDate = new Date();
        KDF.customdata('integrate-microsoft-bookings', 'integrate-microsoft-bookings', false, true, {
            "formadapter-action": "msb-appointment-create-pending-payment",
            "access-type": "app",
            "formdata_txt_appointment_date_start": KDF.getVal("txt_appointment_date_start"),
            "formdata_txt_appointment_date_end": KDF.getVal("txt_appointment_date_end"),
            "formdata_txt_appointment_location_address": KDF.getVal("txt_appointment_location_address"),
            "formdata_txt_appointment_location_name": KDF.getVal("txt_appointment_location_name"),
            "case_type": "Football Pitch Booking",
            "service_notes": "PAYMENT PENDING "+currDate.getFullYear().toString()+
                '-'+(currDate.getMonth() + 1).toString().padStart(2, '0') +
                '-'+ currDate.getDate().toString().padStart(2, '0') +
                'T'+ currDate.getHours().toString().padStart(2, '0') +
                ':'+ currDate.getMinutes().toString().padStart(2, '0') +
                '+00:00'
        });
    });

    $('#dform_widget_button_but_trigger_payment_success').off('click').on('click', function(e){
        clearInterval(paymentIntervalInstance);
        document.getElementById("dform_widget_html_html_payment_countdown").children[0].innerHTML = "Payment Success<br>Reference Number: " + Math.random().toString(36).toUpperCase().slice(2);
        KDF.showWidget("but_next_payment_page");
    });

    $('#dform_widget_button_but_trigger_payment_timeout').off('click').on('click', function(e){   
        let currDate = new Date();
        currDate.setSeconds(currDate.getSeconds() + 4);
        paymentCountdownTime = currDate.getTime();
    });

    $('#dform_widget_button_but_page_payment_return_back').off('click').on('click', function(e){   
        location.reload();
    });

    initialfirstruninject(eventParamInject, kdfParamInject);
}
