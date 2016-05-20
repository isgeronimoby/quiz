(function(){

    (function searchFriends(){
        var dp = DGW.main.elements.pages.friendsMain;
        var friendSearch = dp.querySelector('.search-form .search-field');
        var searchTimeout;
        var searchDelay = 1000;

        friendSearch.addEventListener('input', function(){
            var that = this;
            DGW.helpers.console.info('input');
            if (searchTimeout) window.clearTimeout(searchTimeout);
            searchTimeout = window.setTimeout(function(){
                DGW.helpers.console.info('search');
                DGW.global.api.requests.friendSearch(that.value,
                    function(response){
                        DGW.helpers.console.log(response);
                    }
                );
            }, searchDelay);
        });

    })();

    setTimeout(function(){
        DGW.global.api.requests.friendsGet(function(response){
            DGW.main.methods.friendsConstructor(response);
        });
    }, 3000);
})();