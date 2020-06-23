const unavailableDio = [1, 2, 4];
const unavailableJosuke = [4, 5];
const unavailableLevi = [3];
let unavailableDays = [];

const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    if (date.getDay() === 0 || date.getDay() === 6 || unavailableDays.includes(date.getDay())) {
        return [false];
    }
    return [true];
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function () {
    /*$("#phone").on("change", function () {
        if (!validatePhone("phone")) {
            alert("Wrong format for phone");
            $("#phone").val("(xxxx)");
            $("#phone").addClass("error");
        } else {
            $("#phone").removeClass("error");
        }
    });*/

    $("#dateInput").datepicker(
        {
            dateFormat: setDateFormat,
            minDate: new Date(),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    const pay = $('#debit');
    pay.on('mouseenter', function () {
        pay.addClass('showInput');
    });

    pay.on('mouseleave', function () {
        pay.removeClass('showInput');
    });

    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    pay.tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    const dateInput = $('#dateInput')
    dateInput.on('mouseenter', function () {
        dateInput.addClass('showInput');
    });

    dateInput.on('mouseleave', function () {
        dateInput.removeClass('showInput');
    });

    $('#select-expert input[type=radio]').on('change', () => {
        if ($("input[id=dio]:checked").val() === 'on') {
            unavailableDays = unavailableDio;
        } else if ($("input[id=josuke]:checked").val() === 'on') {
            unavailableDays = unavailableJosuke;
        } else if ($("input[id=levi]:checked").val() === 'on') {
            unavailableDays = unavailableLevi;
        }
        dateInput.prop('disabled', false);
    });

    const phoneInput = $('#phone');
    phoneInput.on('change paste keyup', (e) => {
        const phoneNumber = $("input[id=phone]:text");
        let phoneStr = phoneNumber.val();
        phoneStr = phoneStr.replace(/\D/g,'');
        if (phoneStr.length > 10) {
            phoneStr = phoneStr.substring(0, 10);
        }
        if (phoneStr.length > 2) {
            phoneStr = phoneStr.substring(0, 3) + '-' + phoneStr.substring(3);
        }
        if (phoneStr.length > 6) {
            phoneStr = phoneStr.substring(0, 7) + '-' + phoneStr.substring(7);
        }
        phoneNumber.val(phoneStr);
    });
});

//Jumping to a specific section is difficult with a fixed navbar, this function corrects the scroll value
$(window).bind('hashchange', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollDiff = $('.navbar').height() + 15;
    if (window.scrollY > windowHeight - scrollDiff) {
        const scrollAmount = window.scrollY - windowHeight;
        scrollBy(0, scrollAmount);
    } else {
        scrollBy(0, -scrollDiff)
    }
    //Remove the hash from the url so that the same button in the navbar can be clicked again
    history.pushState("", document.title, window.location.pathname + window.location.search);
});