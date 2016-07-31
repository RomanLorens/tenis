require.config({

        paths : {
                jquery : 'libs/jquery-2.1.1.min',
                Board : 'board'
        }

});

require([ 'Board', 'Tenis' ], function(Board, Tenis) {

        Tenis.start();

});
