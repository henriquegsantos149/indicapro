const fs = require('fs');

let html = fs.readFileSync('convidado.html', 'utf8');

// Wipe out the malformed or misplaced blocks
function removeBlockById(html, id) {
    const startStr = `<div class="syllabus-content" id="${id}">`;
    let startIndex = html.indexOf(startStr);
    
    while(startIndex !== -1) {
        // find the end of this block by counting divs
        let openDivs = 0;
        let i = startIndex;
        let foundFirstDiv = false;
        
        while (i < html.length) {
            if (html.substring(i, i+4) === '<div') {
                openDivs++;
                foundFirstDiv = true;
                i += 4;
            } else if (html.substring(i, i+5) === '</div') {
                openDivs--;
                i += 5;
                if (foundFirstDiv && openDivs === 0) {
                    // found the end of the block
                    break;
                }
            } else {
                i++;
            }
        }
        
        html = html.substring(0, startIndex) + html.substring(i + 1); // +1 to consume '>'
        
        // check for multiple insertions just in case
        startIndex = html.indexOf(startStr);
    }
    return html;
}

html = removeBlockById(html, "especialistas");
html = removeBlockById(html, "ia");
html = removeBlockById(html, "lives");

fs.writeFileSync('convidado.html', html);
console.log('Misplaced blocks removed');
