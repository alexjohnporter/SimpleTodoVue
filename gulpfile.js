var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.scripts([
        '../../../vendor/bootstrap/dist/js/bootstrap.min.js',
        '../../../vendor/jquery/dist/jquery.min.js'
    ], 'public/js/vendor.js');

    mix.styles([
        '../../../vendor/bootstrap/dist/css/bootstrap.min.css'
    ], 'public/css/vendor.css');

    mix.browserify('app.js');
});