(function() {
    var backgroundColors = {
        'home': '#2980b9',
        'skills': '#27ae60',
        'experiences': '#16a085',
        'contact': '#f1c40f'
    };

    function loadHtml(url, cb) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(this.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function setHrefEvents() {
        var links = document.getElementsByClassName('menu')[0].getElementsByTagName('li');

        for (i = 0; i < links.length; i++) {
            links[i].getElementsByTagName('a')[0].addEventListener('click', function(e) {
                var menuIcon = document.getElementsByClassName('menu-icon')[0];
                e.preventDefault();

                if (e.target.pathname === window.location.pathname) {
                    return;
                } else if (menuIcon && menuIcon.classList.contains('open') === true) {
                    close(menuIcon, document.getElementsByClassName('menu-wrapper')[0]);
                }
                window.history.pushState({
                        urlPath: 'views/' + (e.target.pathname.match(/\/([a-z]*)/)[1] || 'home') + '.html'
                    },
                    e.target.pathname.match(/\/([a-z]*)/)[1], e.target.pathname);
                loadHtml(window.history.state.urlPath, function(html) {
                    var main = document.getElementsByTagName('main')[0];
                    document.getElementsByTagName('main')[0].style.opacity = '0';
                    setTimeout(function() {
                        main.innerHTML = html;
                        main.style.opacity = '1';
                        document.getElementsByTagName('body')[0].style.backgroundColor = backgroundColors[window.history.state.urlPath.match(/\/([a-z]*)/)[1] || 'home'];
                    }, 500);
                });
            });
        }
    }

    function setUrl() {
        window.history.pushState({
            urlPath: 'views/' + (window.location.pathname === '/' ? 'home' : window.location.pathname) + '.html'
        }, 'Title', window.location.pathname);
        loadHtml(window.history.state.urlPath, function(html) {
            var body = document.getElementsByTagName('body')[0];
            body.style.backgroundColor = backgroundColors[window.location.pathname.match(/\/([a-z]*)/)[1] || 'home'];
            body.style.transition = 'background-color 1s';
            body.style.display = 'block';
            document.getElementsByTagName('main')[0].innerHTML = html;
        });
        return;
    }

    function setFooter() {
        document.getElementsByClassName('footer-date')[0].innerHTML = new Date().getFullYear();
    }

    function close(el, menuEl) {
        el.classList.remove('open');
        menuEl.classList.remove('open');

        el.className += ' closing';
        menuEl.className += ' closing';
        setTimeout(function() {
            el.classList.remove('closing');
            menuEl.classList.remove('closing');

            el.className += ' close';
            menuEl.className += ' close';
        }, 1400);
    }

    function open(el, menuEl) {
        el.classList.remove('close');
        menuEl.classList.remove('close');

        el.className += ' opening';
        menuEl.className += ' opening';

        setTimeout(function() {
            el.classList.remove('opening');
            menuEl.classList.remove('opening');

            el.className += ' open';
            menuEl.className += ' open';
        }, 1400);
    }

    function initMenu() {
        document.getElementsByClassName('menu-icon')[0].className += ' close';
        document.getElementsByClassName('menu-wrapper')[0].className += ' close';



        document.getElementsByClassName('menu-icon')[0].addEventListener('click', function() {
            var el = this;
            var menuEl = document.getElementsByClassName('menu-wrapper')[0];

            if (el.classList.contains('close') !== false) {
                open(el, menuEl);
            } else {
                close(el, menuEl);
            }
        });
    }

    setUrl();
    setHrefEvents();
    setFooter();
    initMenu();
})();
