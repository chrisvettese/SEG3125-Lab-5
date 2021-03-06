const unavailableDio = [1, 2, 4];
const unavailableJosuke = [4, 5];
const unavailableLevi = [3];
let unavailableDays = [];

const setDateFormat = "mm/dd/yy";

let phoneNumberState = false;
let fullNameState = false;
let dateState = false;
let payState = false;

function disableDates(date) {
    if (date.getDay() === 0 || date.getDay() === 6 || unavailableDays.includes(date.getDay())) {
        return [false];
    }
    return [true];
}


// HERE, JQuery "LISTENING" starts
$(document).ready(() => {
    $("#date-input").datepicker(
        {
            dateFormat: setDateFormat,
            minDate: new Date(),
            maxDate: '+4M',
            // used to disable some dates
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
    pay.on('change paste keyup', () => {
        const payStrOriginal = pay.val();
        let payStr = payStrOriginal.replace(/\D/g, '');
        if (payStr + ' ' === payStrOriginal && payStr.length === 4) {
            return;
        }
        let paySubStr = payStr.substring(0, 4) + ' ' + payStr.substring(4, 8) + ' ';
        if (paySubStr === payStrOriginal) {
            return;
        }
        paySubStr += payStr.substring(8, 12) + ' ';
        if (paySubStr === payStrOriginal) {
            return;
        }
        if (payStr.length > 16) {
            payStr = payStr.substring(0, 16);
        }
        if (payStr.length > 4) {
            payStr = payStr.substring(0, 4) + ' ' + payStr.substring(4);
        }
        if (payStr.length > 9) {
            payStr = payStr.substring(0, 9) + ' ' + payStr.substring(9);
        }
        if (payStr.length > 14) {
            payStr = payStr.substring(0, 14) + ' ' + payStr.substring(14);
        }
        if (payStr.length === 19) {
            if (!payState) {
                const payText = $('#pay-text');
                payText.append('<img class="small-icon img-fluid" id="status-image-pay" src="images/check.png" alt="Checkmark">');
                payState = true;
            }
        } else {
            if (payState) {
                $('#status-image-pay').remove();
                payState = false;
            }
        }
        pay.val(payStr);
    });

    const dateInput = $('#date-input')
    dateInput.on('mouseenter', function () {
        dateInput.addClass('showInput');
    });

    dateInput.on('mouseleave', () => {
        dateInput.removeClass('showInput');
    });

    dateInput.on('change paste keyup', () => {
        if (dateInput.val().length > 0 && !dateState) {
            dateState = true;
            const dateText = $('#date-text');
            dateText.append('<img class="small-icon img-fluid" id="status-image-phone" src="images/check.png" alt="Checkmark">');
        }
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
    phoneInput.on('change paste keyup', () => {
        const phoneStrOriginal = phoneInput.val();
        let phoneStr = phoneStrOriginal.replace(/\D/g, '');
        if (phoneStr + '-' === phoneStrOriginal && phoneStr.length === 3) {
            return;
        }
        if (phoneStr.substring(0, 3) + '-' + phoneStr.substring(3, 6) + '-' === phoneStrOriginal && phoneStr.length === 6) {
            return;
        }
        if (phoneStr.length > 10) {
            phoneStr = phoneStr.substring(0, 10);
        }
        if (phoneStr.length > 3) {
            phoneStr = phoneStr.substring(0, 3) + '-' + phoneStr.substring(3);
        }
        if (phoneStr.length > 7) {
            phoneStr = phoneStr.substring(0, 7) + '-' + phoneStr.substring(7);
        }
        if (phoneStr.length === 12) {
            if (!phoneNumberState) {
                const phoneText = $('#phone-text');
                phoneText.append('<img class="small-icon img-fluid" id="status-image-phone" src="images/check.png" alt="Checkmark">');
                phoneNumberState = true;
            }
        } else {
            if (phoneNumberState) {
                $('#status-image-phone').remove();
                phoneNumberState = false;
            }
        }
        phoneInput.val(phoneStr);
    });

    phoneInput.on('mouseenter', function () {
        phoneInput.addClass('showInput');
    });

    phoneInput.on('mouseleave', function () {
        phoneInput.removeClass('showInput');
    });

    const nameInput = $('#full-name')
    nameInput.on('mouseenter', function () {
        nameInput.addClass('showInput');
    });

    nameInput.on('mouseleave', function () {
        nameInput.removeClass('showInput');
    });

    nameInput.on('change paste keyup', () => {
        if (nameInput.val().length > 0) {
            if (!fullNameState) {
                const nameText = $('#name-text');
                nameText.append('<img class="small-icon img-fluid" id="status-image-name" src="images/check.png" alt="Checkmark">');
                fullNameState = true;
            }
        } else {
            fullNameState = false;
            $('#status-image-name').remove();
        }
    });

    $('#book-button').on('click', () => {
        if (phoneNumberState && fullNameState && dateState && payState) {
            alert("Request submitted! We'll call you when your appointment is scheduled.");
        } else {
            const missing = [];
            if (!dateState) {
                missing.push("date");
            }
            if (!phoneNumberState) {
                missing.push("phone number");
            }
            if (!fullNameState) {
                missing.push("full name");
            }
            if (!payState) {
                missing.push("credit/debit card");
            }
            let missingStr = '';
            for (let i = 0; i < missing.length; i++) {
                missingStr += missing[i];
                if (i < missing.length - 1) {
                    missingStr += ', ';
                } else {
                    missingStr += '.';
                }
            }
            alert("Error: You must fill out the following information to book an appointment - " + missingStr);
        }
    })
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