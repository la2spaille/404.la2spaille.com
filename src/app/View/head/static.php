<link crossorigin="use-credentials" rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="/css/style.css">
<style>
@font-face {
  font-family: "NewTitle-Variable";
  src: url("/fonts/NewTitle-Variable.woff2") format("woff2"), url("/fonts/NewTitle-Variable.woff") format("woff"), url("/fonts/NewTitle-Variable.ttf") format("truetype");
  font-weight: 200 700;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: "Amulya-Variable";
  src: url("/fonts/Amulya-Variable.woff2") format("woff2"), url("/fonts/Amulya-Variable.woff") format("woff"), url("/fonts/Amulya-Variable.ttf") format("truetype");
  font-weight: 300 700;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: "Amulya-VariableItalic";
  src: url("/fonts/Amulya-VariableItalic.woff2") format("woff2"), url("/fonts/Amulya-VariableItalic.woff") format("woff"), url("/fonts/Amulya-VariableItalic.ttf") format("truetype");
  font-weight: 300 700;
  font-display: swap;
  font-style: italic;
}
</style>
<script>
    window._M = {
    delay: 700,

    scroll: {
        y: 0
    },
    config: {
        serviceWorker: true
    },
    route: {
        "new": {
            "url": location.pathname,
            "page": null
        },
        "old": {
            "url": false,
            "page": false
        }
    },
    e: {
        s: null,
        b: null
    }
    , was: []
}
    if ('serviceWorker' in navigator) {
            _M.config.serviceWorker && navigator.serviceWorker.register('/sw.js');
    }
    !function() {
                "use strict";
                const t = document;
                const s = t.createElement("script");
                s.src = "/js/app.js"
                t.onreadystatechange = e=>{
                    "complete" === t.readyState && t.body.appendChild(s)
                }
    }();
        
</script>