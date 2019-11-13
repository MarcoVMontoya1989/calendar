let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

let days_abr = [
    'SU',
    'MO',
    'TU',
    'WE',
    'TH',
    'FR',
    'SA'
];

Number.prototype.pad = function(num) {
    let str = '';
    for(let i = 0; i < (num-this.toString().length); i++)
        str += '0';
    return str += this.toString();
};

function calendar(widget, data)
{
    let original = widget.getElementsByClassName('action')[0];

    if(typeof original === 'undefined')
    {
        original = document.createElement('table');
        original.setAttribute('data-actual',
			      data.getFullYear() + '/' +
			      data.getMonth().pad(2) + '/' +
			      data.getDate().pad(2));
        widget.appendChild(original);
    }

    let diff = data - new Date(original.getAttribute('data-actual'));

    diff = new Date(diff).getMonth();

    let e = document.createElement('table');

    e.className = diff  === 0 ? 'hiding-left' : 'hiding-right';
    e.innerHTML = '';

    widget.appendChild(e);

    e.setAttribute('data-actual',
                   data.getFullYear() + '/' +
                   data.getMonth().pad(2) + '/' +
                   data.getDate().pad(2))

    let line = document.createElement('tr');
    let title = document.createElement('th');
    title.setAttribute('colspan', 7);

    let btn_prev = document.createElement('button');
    btn_prev.className = 'btn-prev';
    btn_prev.innerHTML = '&#9666;';

    let btn_next = document.createElement('button');
    btn_next.className = 'btn_next';
    btn_next.innerHTML = '&#9656;';

    title.appendChild(btn_prev);
    title.appendChild(document.createElement('span')).innerHTML =
        months[data.getMonth()] + '<span class="any">' + data.getFullYear() + '</span>';

    title.appendChild(btn_next);

    btn_prev.onclick = function() {
        data.setMonth(data.getMonth() - 1);
        calendar(widget, data);
    };

    btn_next.onclick = function() {
        data.setMonth(data.getMonth() + 1);
        calendar(widget, data);
    };

    line.appendChild(title);
    e.appendChild(line);

    line = document.createElement('tr');

    for(let i = 1; i < 7; i++)
    {
        line.innerHTML += '<th>' + days_abr[i] + '</th>';
    }

    line.innerHTML += '<th>' + days_abr[0] + '</th>';
    e.appendChild(line);

    let month_start =
        new Date(data.getFullYear(), data.getMonth(), -1).getDay();

    let actual = new Date(data.getFullYear(),
			  data.getMonth(),
			  -month_start);

    for(let s = 0; s < 6; s++)
    {
        let line = document.createElement('tr');

        for(let d = 1; d < 8; d++)
        {
	    let cell = document.createElement('td');
	    let span = document.createElement('span');

	    cell.appendChild(span);

            span.innerHTML = actual.getDate();

            if(actual.getMonth() !== data.getMonth())
                cell.className = 'fora';

            if(data.getDate() === actual.getDate() && data.getMonth() === actual.getMonth())
		cell.className = 'today';

	    actual.setDate(actual.getDate()+1);
            line.appendChild(cell);
        }

        e.appendChild(line);
    }

    setTimeout(function() {
        e.className = 'action';
        original.className +=
        diff === 0 ? ' hiding-right' : ' hiding-left';
    }, 20);

    original.className = 'inaction';

    setTimeout(function() {
        let inactions = document.getElementsByClassName('inaction');
        for(let i = 0; i < inactions.length; i++)
            widget.removeChild(inactions[i]);
    }, 1000);

}

calendar(document.getElementById('calendar'), new Date());
