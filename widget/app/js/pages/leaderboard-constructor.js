DGW.main.methods.leaderboardConstructor = function(earners) {
    var s = DGW.main.elements.pages.activitiesMain;
    var ul = s.querySelector('.dg-o-w-activity-slider ul');

    ul.innerHTML = '';
    earners.forEach(function(earner){
        var li = document.createElement('li');
        li.innerHTML = '<div><img src="' + earner.ImageUrl +'"><p>' + earner.Amount + '</p></div><p class="dg-o-w-color-brand">' + earner.UserName + '</p>';

        ul.appendChild(li);
    });

    DGW.global.elements.leaderboardSlider = new Slider(ul.parentNode, {
        visibles: 5,
        controlNext: '.dg-o-w-activity-slider-next',
        controlPrev: '.dg-o-w-activity-slider-prev'
    });
};