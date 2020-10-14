var textArea = $('textarea')
var timeBlock = $('.time-block');
var dailyPlanner = new Array(9);

var StoredArray = JSON.parse(localStorage.getItem('plansToday'));
var today = moment().format('H');
console.log(typeof today);
var calendarHour;

console.log(today);

function getStored() {
    if (Array.isArray(StoredArray)) {
        dailyPlanner = JSON.parse(localStorage.getItem('plansToday'));
    } else {
        return;
    }
}
getStored();
console.log(dailyPlanner);

function getContent() {
    for (var plan = 0; plan < dailyPlanner.length; plan++) {
        $(`[data-index =${plan}]`).text(dailyPlanner[plan]);
        console.log($(`[data-index =${plan}]`));

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

        if (parseInt(timeEl.attr('data-time')) < parseInt(today)) {
            textEl.addClass('past');
        } else if (parseInt(timeEl.attr('data-time')) > parseInt(today)) {
            textEl.addClass('future')
        } else if (parseInt(timeEl.attr('data-time')) == parseInt(today)) {
            textEl.addClass('present')
        }
        timeEl.append(hourEl)
        row.append(timeEl).append(textEl).append(saveBtn);
        $('.container').append(row)

        // localStorage.getItem(`${dailyPlanner[i].hour}`)

    }
    getContent();
}
getInfo();

  

$('.saveBtn').on('click', function (e) {
    var valueEl = $(this).siblings('textarea').val();
    console.log(valueEl);
    //attr(data-index) // hour  
    newPlanIndex = $(this).siblings('textarea').data('index');
    dailyPlanner.splice(newPlanIndex, 1, valueEl);
    console.log(dailyPlanner);

    localStorage.setItem(`plansToday`, JSON.stringify(dailyPlanner));
});


function checkHour (){
    console.log('hello')
     if (parseInt($('textarea').attr('data-time')) < parseInt(today)) {
    textEl.addClass('past');
} else if (parseInt($('textarea').attr('data-time')) > parseInt(today)) {
    textEl.addClass('future')
} else if (parseInt($('textarea').attr('data-time')) == parseInt(today)) {
    textEl.addClass('present')
}}
setInterval( checkHour, 60*1000);