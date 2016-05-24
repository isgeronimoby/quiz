DGW.main.methods.profileInit = function(){

    //Profile page clicks
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-login-fb-text').addEventListener('click', function(){
        DGW.global.api.requests.connectFB();
    });
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });

    DGW.helpers.getElementsFromAllPlaces('[data-page]', 'main').forEach(function(el){
        el.addEventListener('click', function(ev){
            ev.preventDefault();
            DGW.main.methods.changeMainState(el.getAttribute('data-page'));
        });
    });

};