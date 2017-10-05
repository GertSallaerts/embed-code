document.addEventListener("DOMContentLoaded", function() {

    var PRISM_JS = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/prism.min.js';
    var PRISM_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/themes/prism.min.css';

    // NodeList.forEach does not work
    function forEach (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, array[i], i, array);
        }
    }

    function findScripts() {
        var nodes = document.querySelectorAll('[data-type="gertt/embed-code"]');
        var scripts = [];

        forEach(nodes, function (script) {
            if (script.getAttribute('data-loaded'))
                return;

            script.setAttribute('data-loaded', '1');
            scripts.push({
                element: script,
                url: script.getAttribute('data-url'),
                language: script.getAttribute('data-language')
            });
        });

        return scripts;
    }

    function getSource(url, cb) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                cb(null, request.responseText);
            } else {
                cb(new Error('Failed to load: ' + url));
            }
        };

        request.onerror = function() {
            cb(new Error('Failed to load: ' + url));
        };

        request.send();
    }

    function loadDependencies() {
        var head = document.head || document.getElementsByTagName('head')[0],
            dep;

        if (!document.querySelector('script[src="' + PRISM_JS + '"]')) {
            dep = document.createElement('script');
            dep.type = 'text/javascript';
            dep.src = PRISM_JS;
            head.appendChild(dep);
        }

        if (!document.querySelector('link[href="' + PRISM_CSS + '"]')) {
            dep = document.createElement('link');
            dep.rel = 'stylesheet';
            dep.href = PRISM_CSS;
            head.appendChild(dep);
        }
    }

    loadDependencies();

    forEach(findScripts(), function (script) {
        getSource(script.url, function(err, source) {
            if (err) {
                return;
                console.error(err);
            }

            var preEl = document.createElement('pre');
            var codeEl = document.createElement('code');
            codeEl.className = 'language-' + script.language;
            codeEl.textContent = source;
            preEl.appendChild(codeEl);

            script.element.parentNode.insertBefore(preEl, script.element);

            if (window.Prism)
                window.Prism.highlightElement(preEl);
        });
    });
});
