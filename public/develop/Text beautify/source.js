function beautify(content) {
    // 1. Get content
    content = content.replace(/\s/g, ' ');
    /*
    content = content.replace(/\t/g, ' ');
    content = content.replace(/\r/g, ' ');
    content = content.replace(/\n/g, '  ');*/

    // 2. Sentence classify
    content = content.replace(/\. /g, '\.\n'); // default
    content = content.replace(/: /g, ':\n'); // additional content or equation
    content = content.replace(/; /g, ';\n'); // additional content or equation

    // var integerRegex = '/^[0-9]+$/'
    content = content.replace(/\(([0-9]+)\.([0-9]+)\)/g, (match) => (match + '\n')); // equation; Ex) (2.16)

    // except some cases like Fig.1.1. about dot
    //  Ex) Fig.1.2, Mr.Steven, pp. 58 - 70
    var exception_1 = ['Fig', 'lbs', 'Mr', 'Mrs', 'Ms', 'Eq', 'Eqs', 'pp', 'Vol', 'Pt'];
    exception_1.forEach(word => {
        content = content.replace(`/${word}\.\n/g`, `${word}\.`)
    });

    // Ex) Fig.1.2, Mr.Steven, pp. 58 - 70
    content = content.replace(/(\.[0-9]+\.)\n/g, (match, p1) => (p1))

    // 3. little grammar error - except some cases like 1. or Mr.about dot
    // int
    // Ex) 1. one content, 2. another content
    content = content.replace(/(\n[0-9]+\.)\n/g, (match, p1) => (p1))
    content = content.replace(/( [0-9]+\.)\n/g, (match, p1) => (p1))

    // TODO - is it right in the logic
    // alphabet A ~ Z, a ~ z
    // Ex) A. one content, B. another content, a. one content, b. another content
    /*content = content.replace(/(\n[a-zA-Z]+\.)\n/g, (match, p1) => (p1))
    content = content.replace(/( [a-zA-Z]+\.)\n/g, (match, p1) => (p1))
    contradict? - ascii A ~ Z; Ex) A. G. M. Michell
    content = content.replace(chr(i) + ". \n", chr(i) + ". ")*/

    /* To specific// ascii a ~ z
    content = content.replace("-" + chr(i) + ".\n", "-" + chr(i) + ". ")
    // Ex) Fig.4.1a-c.*/

    // 4. Clean 
    content = content.replace(/ +/g, ' ') // '     ' -> ' '
    content = content.replace(/( ?)+\n+( ?)+/g, '\n') // '    \n\n\n ' -> '\n'
    content = content.replace(/ +\./g, '.') // '     .' -> '.'
    content = content.replace(/ +,/g, ',') // '     ,' -> ','
    content = content.replace(/,[^ ]/g, ', ') // ',else' -> ', else'

    // 5. Finish
    return content
}

function adjustHeight(e) {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
}

function check() {
    var content = document.getElementById('input').value;
    var output = document.getElementById('output');
    output.value = beautify(content);
    output.select();
    adjustHeight({target: output})
}
window.onload = () => {
    // Textarea changing height
    document.getElementById('input').addEventListener('input', adjustHeight);

    // Check with enter
    document.addEventListener("keypress", function onEvent(event) {
        if (event.key === "Enter") {
            check();
        };
    });

    // Check with button
    document.getElementById('btn').onclick = check;
};