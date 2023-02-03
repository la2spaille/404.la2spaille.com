<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="canonical" href="<?= $this->head['url']; ?>">
    <meta name="robots" content="<?= $this->head['robots']; ?>">
    <?php include ROOT . 'app/View/head/device.php'; ?>
    <title><?= $this->head['title']; ?></title>
    <meta name="description" content="<?= $this->head['description']; ?>">
    <?php include ROOT . 'app/View/head/social.php'; ?>
    <?php include ROOT . 'app/View/head/favicon.php'; ?>
    <?php include ROOT . 'app/View/head/static.php'; ?>
    <?php include ROOT . 'app/View/head/font.php'; ?>
</head>
<body>
<!-- App -->
<div id="app">
    <!-- Main -->
    <main id="main">
        <?= $this->content; ?>
    </main>
    <?php include ROOT . 'app/View/gl/gl.php'; ?>
    <?php include ROOT . 'app/View/common/header.php'; ?>
    <?php include ROOT . 'app/View/common/loader.php'; ?>
    <?php include ROOT . 'app/View/common/progress.php'; ?>
    <?php include ROOT . 'app/View/script/script.php'; ?>
</div>
</body>
</html>
