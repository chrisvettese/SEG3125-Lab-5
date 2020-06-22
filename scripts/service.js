// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^(\([-+]?[0-9]+)\)$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

const unavailableDio = [1, 2, 4];
const unavailableJosuke = [4, 5];
const unavailableLevi = [3];
let unavailableDays = [];

const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    if (date.getDay() === 0 || date.getDay() === 6 || unavailableDays.includes(date.getDay()))
        return [false];
    const string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [true];
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function () {

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function () {
        if (!validatePhone("phone")) {
            alert("Wrong format for phone");
            $("#phone").val("(xxxx)");
            $("#phone").addClass("error");
        } else {
            $("#phone").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $("#dateInput").datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
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
        $('#debit').addClass('showInput');
    });

    pay.on('mouseleave', function () {
        $('#debit').removeClass('showInput');
    });

    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    pay.tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $('body').css('padding-top', $(".navbar").height() + 15);

    $('#select-expert > input[type=radio]').change((e) => {
        if ($("input[id=dio]:checked").val() === 'on') {
            unavailableDays = unavailableDio;
        } else if ($("input[id=josuke]:checked").val() === 'on') {
            unavailableDays = unavailableJosuke;
        } else if ($("input[id=levi]:checked").val() === 'on') {
            unavailableDays = unavailableLevi;
        }

        $('#dateInput').prop('disabled', false);
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