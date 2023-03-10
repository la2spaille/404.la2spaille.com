<link crossorigin="use-credentials" rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="/css/style.css">
<style>
    @font-face {
        font-family: 'Satoshi-Variable';
        src: url('/fonts/satoshi/Satoshi-Variable.woff2') format('woff2'),
        url('/fonts/satoshi/Satoshi-Variable.woff') format('woff'),
        url('/fonts/satoshi/Satoshi-Variable.ttf') format('truetype');
        font-weight: 300 900;
        font-display: swap;
        font-style: normal;
    }
</style>
<script>
    window._M = {
        delay: 700,
        mouse: {
            x: innerWidth / 2,
            y: innerHeight / 2,
            deltaX: 0,
            deltaY: 0
        },
        config: {
            serviceWorker: false
        },
        e: {
            s: null,
            b: null,
            gl: null
        },
        E: {
            P: null,
            S: null,
            T: null
        }
    }
    if ('serviceWorker' in navigator) {
        _M.config.serviceWorker && navigator.serviceWorker.register('/sw.js');
    }
    !function () {
        "use strict";
        const t = document;
        const s = t.createElement("script");
        s.src = "/js/app.js"
        t.onreadystatechange = e => {
            "complete" === t.readyState && t.body.appendChild(s)
        }
    }();

</script>