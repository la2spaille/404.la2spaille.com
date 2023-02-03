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