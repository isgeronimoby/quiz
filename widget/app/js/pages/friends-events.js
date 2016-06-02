(function(){
    var dp = DGW.main.elements.pages.friendsMain;

    (function searchFriends(){
        var friendSearch = dp.querySelector('.search-form .search-field');
        var searchEmpty = dp.querySelector('.search-form .form-search-decorator');
        var searchTimeout;
        var searchDelay = 500;

        friendSearch.addEventListener('input', function(){
            var that = this;
            DGW.helpers.console.info('input');
            if (that.value.length > 0) {
                DGW.helpers.addClass(searchEmpty, 'form-search-empty');
                searchEmpty.addEventListener('click', searchFormReset);
                if (searchTimeout) window.clearTimeout(searchTimeout);
                searchTimeout = window.setTimeout(function () {
                    DGW.helpers.console.info('search');
                    DGW.helpers.addClass(searchEmpty, 'form-search-progress');
                    searchEmpty.removeEventListener('click', searchFormReset);
                    DGW.global.api.requests.userSearch(that.value,
                        function (searchQuery) {
                            DGW.main.methods.usersConstructor('search', searchQuery);
                            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
                            searchEmpty.addEventListener('click', searchFormReset);
                        },
                        function () {
                            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
                            searchEmpty.addEventListener('click', searchFormReset);
                        }
                    );
                }, searchDelay);
            } else {
                searchFormReset();
            }
        });

        function searchFormReset(){
            friendSearch.value = '';
            if (searchTimeout) window.clearTimeout(searchTimeout);
            DGW.helpers.removeClass(searchEmpty, 'form-search-empty');
            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
            searchEmpty.removeEventListener('click', searchFormReset);
            DGW.main.methods.usersConstructor(DGW.main.settings.friends.currentSubMenu);
        }

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
                DGW.main.settings.friends.currentSubMenu = this.getAttribute('data-submenu');
            });
        });
    })();

})();