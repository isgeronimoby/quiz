DGW.main.methods.gamesConstructor = function(){
    var dp = DGW.main.elements.pages.drawsMain;
    var dpCont = dp.querySelector('.dg-o-w-section-content');
    var gamesList = dp.querySelector('.dg-o-w-list-draws');
    gamesList.innerHTML = '';

    var emptyMessageEl = document.createElement('div');
    DGW.helpers.addClass(emptyMessageEl, 'dg-o-w-draws-empty');

    if (dpCont.children.length > 1) dpCont.removeChild(dpCont.childNodes[1]);

    emptyMessageEl.innerHTML = '<h2>Hi, we are glad to see you here, games will be available very soon!</h2></div>';
    dpCont.appendChild(emptyMessageEl);
};