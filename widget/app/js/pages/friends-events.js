(function(){
    var dp = DGW.main.elements.pages.friendsMain;

    (function searchFriends(){
        var friendSearch = dp.querySelector('.search-form .search-field');
        var searchTimeout;
        var searchDelay = 1000;

        friendSearch.addEventListener('input', function(){
            var that = this;
            DGW.helpers.console.info('input');
            if (searchTimeout) window.clearTimeout(searchTimeout);
            searchTimeout = window.setTimeout(function(){
                DGW.helpers.console.info('search');
                DGW.global.api.requests.userSearch(that.value,
                    function(response){
                        DGW.helpers.console.log(response);
                    }
                );
            }, searchDelay);
        });

    })();

    // Submenu clicks
    (function handlingSubmenu(){
        var items = Array.prototype.slice.call(dp.querySelectorAll('.dg-o-w-submenu li'));
        function noActive() {
            items.forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
        }

        items.forEach(function(item){
            item.addEventListener('click', function(){
                noActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
                DGW.main.methods.usersConstructor(this.getAttribute('data-submenu'));
            });
        });

        //DGW.main.methods.friendsSubmenuReset
    })();

})();