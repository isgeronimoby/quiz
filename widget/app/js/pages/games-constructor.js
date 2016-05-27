DGW.main.methods.gamesConstructor = function(){
    var dp = DGW.main.elements.pages.drawsMain;
    var dpCont = dp.querySelector('.dg-o-w-section-content');
    var gamesList = dp.querySelector('.dg-o-w-list-draws');
    gamesList.innerHTML = '';

    var games = [1];

    //var emptyMessageEl = document.createElement('div');
    //DGW.helpers.addClass(emptyMessageEl, 'dg-o-w-draws-empty');
    //if (dpCont.children.length > 1) dpCont.removeChild(dpCont.childNodes[1]);
    //emptyMessageEl.innerHTML = '<h2>Hi, we are glad to see you here, games will be available very soon!</h2></div>';
    //dpCont.appendChild(emptyMessageEl);





    games.forEach(function(game){
        var li = document.createElement('li');
        li.innerHTML =  '<div class="dg-o-w-draw">' +
                            '<div class="dg-o-w-draw-image-holder">' +
                                '<img src="" data-image="temp-score-predictor-logo.png"/>' +
                            '</div>' +
                            '<div class="dg-o-w-draw-text">' +
                                '<h2 class="dg-o-w-draw-countdown">Score predictor Game</h2>' +
                                '<p>Make predictions for your favourite matches, earn tons of points</p>' +
                            '</div>' +
                        '</div>';

        DGW.helpers.imagesResponsivePaths(li.querySelectorAll('img'));

        var a = document.createElement('a');
            a.href = 'http://everton.scorepredictor.club/';
            a.target = '_blank';
            a.innerHTML = 'Open link in the new tab';
        li.setAttribute('data-link', 'score-predictor');

        DGW.helpers.openDataLinks(li, a);

        gamesList.appendChild(li);
    });

    // TEMP PART
    var li = document.createElement('li');
    li.innerHTML =  '<div class="dg-o-w-draw">' +
                        '<div class="dg-o-w-draw-image-holder">' +
                            '<img src="" data-image="everton-bg.svg"/>' +
                        '</div>' +
                        '<div class="dg-o-w-draw-text">' +
                            '<h2 class="dg-o-w-draw-countdown">More games coming soon</h2>' +
                            '<p></p>' +
                        '</div>' +
                    '</div>';
    li.style.opacity = 0.4;
    li.style.cursor = 'default';

    DGW.helpers.imagesResponsivePaths(li.querySelectorAll('img'));
    gamesList.appendChild(li);
};