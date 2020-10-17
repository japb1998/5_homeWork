var textArea = $('textarea')
var timeBlock = $('.time-block');
var dailyPlanner = new Array(9);
var dayofWeek = moment().weekday();
var StoredArray = JSON.parse(localStorage.getItem('plansToday'));
var today = moment().format('H');
// var today = 11;
var todayDisplay = moment().format('dddd, MMMM Do');
// console.log(typeof today);
var calendarHour;

localStorage.setItem('weekDay', dayofWeek);
//check for the day to be the same day or clears it
clearCheck(dayofWeek);





// console.log(today);
$('#currentDay').text(todayDisplay);

function getStored() {
    if (Array.isArray(StoredArray)) {
        dailyPlanner = JSON.parse(localStorage.getItem('plansToday'));
    } else {
        return;
    }
}
getStored();
// console.log(dailyPlanner);

function getContent() {
    for (var plan = 0; plan < dailyPlanner.length; plan++) {
        $(`[data-index =${plan}]`).text(dailyPlanner[plan]);
        // console.log($(`[data-index =${plan}]`));

    }
}



function getInfo() {
    for (var i = 9; i <= 17; i++) {
        var index = i - 9;
        var row = $('<div>').attr('class', 'row time-block');
        var timeEl = $('<div>').attr('class', 'col-2  hour');

        var textEl = $('<textarea>').attr('class', 'col-8 textarea description').attr('data-index', index)
        var saveBtn = $('<div>').attr('class', 'col-2 saveBtn').append('<i class="fas fa-save fa-2x"></i>');
        var hourEl;

        if (i < 12) {
            hourEl = `${i}am`;
            timeEl.attr('data-time', i);
            console.log(timeEl);
        } else if (i === 12) {
            hourEl = `${i} pm`
            timeEl.attr('data-time', i)
        } else {
            hourEl = `${i - 12}pm`
            timeEl.attr('data-time', i)
        }


        // if (parseInt(timeEl.attr('data-time')) < parseInt(today)) {
        //     textEl.addClass('past');
        // } else if (parseInt(timeEl.attr('data-time')) > parseInt(today)) {
        //     textEl.addClass('future')
        // } else if (parseInt(timeEl.attr('data-time')) == parseInt(today)) {
        //     textEl.addClass('present')
        // }
        timeEl.append(hourEl)
        row.append(timeEl).append(textEl).append(saveBtn);
        $('.container').append(row);
        checkHour();

        // localStorage.getItem(`${dailyPlanner[i].hour}`)

    }
    getContent();
}
getInfo();



$('.saveBtn').on('click', function (e) {
    var valueEl = $(this).siblings('textarea').val();
    // console.log(valueEl);
    //attr(data-index) // hour  
    newPlanIndex = $(this).siblings('textarea').data('index');
    dailyPlanner.splice(newPlanIndex, 1, valueEl);
    // console.log(dailyPlanner);

    localStorage.setItem(`plansToday`, JSON.stringify(dailyPlanner));
});


function checkHour() {

    for (var j = 9; j <= 17; j++) {
        var newIn = j - 9;
        var element = $('div').find(`[data-time = ${j}]`);
        var textEl = $('textarea')[newIn]
        // console.log(element)
        // console.log(typeof parseInt(element.attr('data-time')))
        if (parseInt(element.attr('data-time')) < parseInt(today)) {
            textEl.classList.add('past')

        } else if (parseInt(element.attr('data-time')) > parseInt(today)) {
            textEl.classList.add('future')
        } else if (parseInt(element.attr('data-time')) == parseInt(today)) {
            textEl.classList.add('present')
        }
    }
}
setInterval(checkHour, 30 * 1000);

// clear storage if it is a new day
function clearCheck(day) {
    if (day != localStorage.getItem('weekDay')) {
        localStorage.clear();
    }
}
// console.log(localStorage.getItem('weekDay'))