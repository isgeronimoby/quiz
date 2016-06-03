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
            DGW.main.methods.friendsResetSearch();
            DGW.main.methods.usersConstructor(DGW.main.settings.friends.currentSubMenu);
        }

        DGW.main.methods.friendsResetSearch = function(){
            friendSearch.value = '';
            if (searchTimeout) window.clearTimeout(searchTimeout);
            DGW.helpers.removeClass(searchEmpty, 'form-search-empty');
            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
            searchEmpty.removeEventListener('click', searchFormReset);
        };

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

    DGW.main.methods.friendsSetData = function(friends, requests){
        var friendsHolders = DGW.helpers.getElementsFromAllPlaces('[data-friends-c]'),
            requestsHolders = DGW.helpers.getElementsFromAllPlaces('[data-friends-requests]');

        if (!friends) {
            if (DGW.main.cache.userRelations.users) {
                friends = DGW.main.cache.userRelations.users.filter(function(u){return u.Rels.some(function(r){return r==='Friends'})}).length;
            } else {
                friends = 0;
            }
        }
        if (!requests) {
            if (DGW.main.cache.userRelations.users) {
                requests = DGW.main.cache.userRelations.users.filter(function(u){return u.Rels.some(function(r){return r==='FriendRequestFrom'})}).length;
            }
            requests = 0;
        }

        DGW.global.userStats.friends = friends;
        DGW.global.userStats.friendsRequests = requests;



        friendsHolders.forEach(function(f){
            f.innerHTML = DGW.global.userStats.friends;
        });

        requestsHolders.forEach(function(r){
            if (DGW.global.userStats.friendsRequests === 0) {
                r.style.display = 'none';
            } else {
                r.style.display = 'inline-block';
            }
            r.innerHTML = DGW.global.userStats.friendsRequests;
        });
    };

})();