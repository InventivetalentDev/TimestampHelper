const pattern = /[0-9]{10,13}/;

let currentTooltip;

document.body.addEventListener("mouseup", e => {
    let selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        let text = selection.toString();

        let range = selection.getRangeAt(0);
        let rect = range.getBoundingClientRect(); // https://stackoverflow.com/a/18302723/6257838

        let m;
        let timestampMatch;
        if ((m = pattern.exec(text)) !== null) {
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                timestampMatch = match;
            });
        }

        if (timestampMatch) {
            let num = parseInt(timestampMatch);
            if (timestampMatch.length === 10) {
                num *= 1000;
            }

            let date = new Date(num);
            console.log("[TimestampHelper] " + date);

            dismissTooltip();
            createTooltip(date.toUTCString(), rect);
        } else {
            dismissTooltip();
        }
    } else {
        dismissTooltip()
    }

});

function createTooltip(text, rect) {
    // https://stackoverflow.com/a/18302723/6257838
    let div = document.createElement('div');
    div.className = "timestamp-helper-tooltip";
    div.style.border = '1px solid black';
    div.style.textAlign = "center";
    div.style.fontFamily = "monospace";
    div.style.fontSize = "10pt";
    div.style.fontWeight = "normal";
    div.style.background = "#f2f2f2";
    div.style.position = 'fixed';
    div.style.top = (rect.top - 22) + 'px';
    div.style.left = rect.left + 'px';
    div.style.height = 20 + 'px';
    div.style.width = "fit-content";
    div.style.padding = 1 + 'px';
    document.body.appendChild(div);

    let span = document.createElement("span");
    span.innerText = text;
    div.appendChild(span);

    currentTooltip = div;
}

function dismissTooltip() {
    if (currentTooltip) {
        currentTooltip.remove();
        currentTooltip = null;
    }
}
