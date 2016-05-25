DGW.main.methods.leaderboardConstructor = function(earners) {
    var s = DGW.main.elements.pages.activitiesMain;
    var ul = s.querySelector('.dg-o-w-activity-slider ul'),
        slideLeft = s.querySelector('.dg-o-w-activity-slider-prev'),
        slideRight = s.querySelector('.dg-o-w-activity-slider-next');
    var sliderItemWidth = 0;

    var transformReg = /translateX\(-(\d*)px\)/,
        ulTransform = ul.style.transform;
    var scrollValue = (ulTransform) ? +transformReg.exec(ulTransform)[1] : 0;

    ul.innerHTML = '';
    ul.style.width = '';
    earners.forEach(function(earner){
        var li = document.createElement('li');
        li.innerHTML = '<div><img src="' + earner.ImageUrl +'"><p>' + earner.Amount + '</p></div><p class="dg-o-w-color-brand">' + earner.UserName + '</p>';

        ul.appendChild(li);
        ul.style.width = +(ul.style.width.replace(/px/, '')) + li.clientWidth + 'px';
    });

    sliderItemWidth = ul.querySelector('li').clientWidth;

    function slideLeaderboard(direction){
        if (direction === 'right') {
            if (scrollValue < +(ul.style.width.replace(/px/, '')) - sliderItemWidth * 5)
                scrollValue += sliderItemWidth;
        } else {
            if (scrollValue > 0) scrollValue -= sliderItemWidth;
        }
        ul.style.transform = 'translateX(-' + scrollValue + 'px)';
    }

    slideLeft.addEventListener('click', function(){
        slideLeaderboard();
    });

    slideRight.addEventListener('click', function(){
        slideLeaderboard('right');
    });
};