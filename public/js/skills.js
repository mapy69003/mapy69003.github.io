var commands = [
    "$> cd skills",
    "$> ls web/",
    "HTML CSS JavaScript JQuery Node.JS AngularJS Angular2 PHP/YiiFramework",
    "$> ls others/",
    "C/C++ C#/.NET Java(PlayFramework)",
    "$> cd ../tools",
    "$> ls --all",
    "Git Mongodb Sql PostgreSQL",
    "$> cd ../operating\ systems & ls",
    "Windows Unix/Linux(Archlinux,Debian)",
    "$> It seems you have talents too !"
];

var alreadyLoaded = false;

document.addEventListener('htmlReady', function() {
    if (window.location.pathname !== '/skills' && alreadyLoaded) {
        return;
    }

    alreadyLoaded = true;
    var i = 0,
        o = 0;

    document.getElementById('terminal').innerHtml = '';

    function newLine() {
        if (document.getElementsByClassName('cursor')[0]) {
            document.getElementsByClassName('cursor')[0].remove();
        }
        document.getElementById('terminal').innerHTML += '<div class="commandLine">$> <span class="command"></span><span class="cursor"></span></div>';
    }

    function newResult() {
        document.getElementById('terminal').innerHTML += '<div class="commandLine result"></div>';
    }

    newLine();
    document.addEventListener('keydown', function(e) {
        if (!e.key.match(/^([a-zA-Z])$/) && e.code != 'Space' && !commands[o]) {
            return
        }

        if (commands[o] && commands[o][i] === '$' && commands[o][i + 1] === '>') {
            i += 3;
        }

        if (commands[o] && commands[o][0] === '$' && commands[o][1] === '>') {
            if (i >= commands[o].length) {
                i = 0;
                ++o;
                if (commands[o] && commands[o][i] === '$' && commands[o][i + 1] === '>') {
                    newLine();
                } else {
                    newResult();
                }
                return;
            }
            document.getElementsByClassName('commandLine')[o].children[0].innerHTML += commands[o][i];
            ++i;
        } else if (commands[o]) {
            document.getElementsByClassName('commandLine')[o].innerHTML += commands[o];
            ++o;
            i = 0;
            newLine();
        }
        e.preventDefault();
    });
});
