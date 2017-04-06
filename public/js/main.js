(function() {
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
                e.preventDefault();
                window.history.pushState({
                        urlPath: 'views/' + (e.target.pathname.match(/\/([a-z]*)/)[1] || 'home') + '.html'
                    },
                    e.target.pathname.match(/\/([a-z]*)/)[1], e.target.pathname);
                loadHtml(window.history.state.urlPath, function(html) {
                    document.getElementsByTagName('main')[0].innerHTML = html;
                });
            });
        }
    }

    function setUrl() {
        window.history.pushState({
            urlPath: 'views/' + (window.location.pathname === '/' ? 'home' : window.location.pathname) + '.html'
        }, 'Title', window.location.pathname);
        loadHtml(window.history.state.urlPath, function(html) {
            document.getElementsByTagName('main')[0].innerHTML = html;
        });
        return;
    }

    function setFooter() {
        document.getElementsByClassName('footer-date')[0].innerHTML = new Date().getFullYear();
    }

    setFooter();
    setUrl();
    setHrefEvents();
})();
