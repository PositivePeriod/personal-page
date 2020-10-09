const string_meari = ["60 + 0", "185 + 9", "305 + 15", "690 + 33", "2025 + 98", "3330 + 168", "6590 + 328"];
const menu_meari = [60, 194, 320, 723, 2123, 3498, 6918];
const menu_price = [1200, 3900, 5900, 14000, 39000, 65000, 119000];
const l = menu_meari.length;

var trans_language = 'English'
var memo_meari = null;
var memo_n = null;
var memo_cost = null;

const trans_string = {
    'English': ['Identity V Echoes calculator', 'How much do you need?', 'Calculate', 'Echoes', 'Cost', 'Amount'],
    'Korean': ['제5인격 메아리 계산기', '얼마나 필요하신가요?', '계산하기', '메아리', '가격', '수량']
};
const trans_function = {
    'result': {
        'English': function (meari, n, cost) {
            return `Total ${meari} Echoes (+${meari-n}) for ${cost}won;`
        },
        'Korean': function (meari, n, cost) {
            return `${cost}원에 총 ${meari} 메아리 (+${meari-n})`
        }
    },
    'invalid': {
        'English': 'Please enter the natural number',
        'Korean': '자연수를 입력해 주세요'
    }
};

function optimize(n) {
    var data = Array(n + menu_meari[l - 1] + 1).fill(null).map(() => [Array(l).fill(Infinity), Infinity]);
    data[0] = [Array(l).fill(0), 0];

    for (let current = 0; current < n + 1; current++) {
        const comb = data[current][0].slice();
        const cost = data[current][1];
        for (let i = 0; i < l; i++) {
            var comb_new = comb.slice();
            comb_new[i] += 1;
            var cost_new = cost + menu_price[i];
            if (cost_new <= data[current + menu_meari[i]][1]) {
                data[current + menu_meari[i]] = [comb_new, cost_new]
            }
        }
    }

    var solution = data.slice(n, n + menu_meari[l - 1] + 1).sort((a, b) => a[1] - b[1])[0];
    var meari = 0;
    solution[0].forEach((elem, index) => {
        meari += elem * menu_meari[index]
    });
    return [solution[0], solution[1],
        [meari]
    ]
}

function process() {
    var value = document.getElementById('input').value
    var n = parseInt(value)
    if (!isNaN(n) && n >= 0 && n === parseFloat(value)) {
        var [comb, cost, meari] = optimize(n);
        [memo_meari, memo_n, memo_cost] = [meari, n, cost];
        document.getElementById('result').innerHTML = trans_function['result'][trans_language](meari, n, cost);
        var table = document.getElementById('table')
        var rows = table.rows;
        for (var i = 0; i < rows.length - 1; i++) {
            rows[i + 1].cells[2].innerHTML = comb[i];
        }
    } else {
        alert(trans_function['invalid'][trans_language]);
    }
}

function translate(from, to) {
    var from_string = trans_string[from];
    var to_string = trans_string[to];
    const elements = document.getElementsByClassName('string');
    for (let element of elements) {
        element.innerHTML = to_string[from_string.indexOf(element.innerHTML)];
    }
    document.getElementById('content').className = `content full-screen ${to}`;
    document.getElementById('submit').className = `center_inner string ${to}`;

    var input = document.getElementById('input');
    input.className = `center_inner ${to}`;
    input.setAttribute('placeholder', to_string[from_string.indexOf(input.getAttribute('placeholder'))]);
    if (!(memo_meari === null || memo_n === null || memo_cost)) {
        document.getElementById('result').innerHTML = trans_function['result'][to](memo_meari, memo_n, memo_cost);
    }
}

window.onload = () => {
    var table = document.getElementById('table');
    for (let i = 0; i < l; i++) {
        let row = table.insertRow(-1);
        for (let j = 0; j < 3; j++) {
            let cell = row.insertCell(j);
            if (j == 0) {
                cell.innerHTML = string_meari[i];
            } else if (j == 1) {
                cell.innerHTML = menu_price[i];
            } else {
                cell.innerHTML = 0;
            }
        }
    }
    document.getElementById('language').onchange = function () {
        var language = this.children[this.selectedIndex].innerHTML.trim();
        if (trans_language !== language) {
            translate(trans_language, language);
            trans_language = language;
        }
    }
}