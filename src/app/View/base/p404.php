<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="robots" content="noindex, nofollow">
    <title><?= $this->head['title']; ?></title>
    <?php include ROOT . 'app/View/head/favicon.php'; ?>
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
</head>
<body>
<div id="app">
    <main id="main">
        <div class="l-wrapper 404 "
             style="position: absolute; top:calc(50vh);
                          left: 50vw; transform: translate(-50%, -50%);
                          width: 100vw;
                          text-align: center;
                          justify-content: center;
                          align-items: center;
                          display: flex;
                          flex-direction: column">
            <div class="w-text 404">
                <h1 class="f-family_primary f-color_primary"
                    style="font-size: clamp(128px,36vw,36vw);
                    line-height: .78">
                    <span>404</span>
                </h1>
            </div>
            <a href="/" class="f-color_grey f-14px _a"
               style="text-decoration: underline">
               Page d'acceuil
            </a>
        </div>

    </main>
</div>
</body>
</html>