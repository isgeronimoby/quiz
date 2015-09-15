(function(){
    'use strict';
    window.addEventListener('load', function(){
        var menuBtn = document.getElementById('menu');
        var menu = menuBtn.parentNode.querySelector('.menu-inner');
        var trigger = 0;

        menuBtn.addEventListener('click', function(e){
            e.preventDefault();
            var that = this;

            if ( trigger === 0 ) {
                trigger = 1;
                menu.style.display = 'block';
                setTimeout(function(){
                    that.parentNode.className += ' active';
                }, 70);
            } else {
                trigger = 0;
                that.parentNode.className = that.parentNode.className.replace(/ active/g, '');
                setTimeout(function(){
                    menu.style.display = 'none';
                }, 320);
            }
        });
    });
})();