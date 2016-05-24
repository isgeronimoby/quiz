DGW.main.methods.drawsInit = function(){

    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        DGW.main.settings.draws.showExpired = this.checked;
        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
    });

//Draw filters
    (function(){
        var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
        var submenuItems = Array.prototype.slice.call(DGW.main.elements.pages.drawsMain.querySelectorAll('.dg-o-w-submenu ul li'));
        function removeActive(){
            submenuItems.forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
        }

        function hideFinishedDraws(){
            hiddenDrawsChkBox.checked = false;
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
            hiddenDrawsChkBox.parentNode.style.display = 'none';
        }
        function showFinishedDraws(){
            if (DGW.main.settings.draws.showExpired) {
                hiddenDrawsChkBox.checked = true;
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            }
            hiddenDrawsChkBox.parentNode.style.display = 'block';
        }

        DGW.main.methods.changeDrawsSubmenu = function(state){
            submenuItems.filter(function(item){
                return item.id == state;
            })[0].click();
        };

        submenuItems.forEach(function(item){
            item.addEventListener('click', function(){
                removeActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
                DGW.main.settings.draws.currentSubMenu = this.id;
                switch (this.id) {
                    case 'dg-o-w-show-all-draws':
                        DGW.main.cache.drawsList.sort(function(a,b){
                            return new Date(b.EndDate) - new Date(a.EndDate)
                        });

                        showFinishedDraws();

                        DGW.main.methods.drawsConstructor(DGW.main.cache);
                        break;
                    case 'dg-o-w-show-finished-soon':
                        var expArr = DGW.main.cache.drawsList.filter(function(draw){
                            return DGW.helpers.dateDiff(draw.EndDate) <= 0;
                        });
                        var actArr = DGW.main.cache.drawsList.filter(function(draw){
                            return DGW.helpers.dateDiff(draw.EndDate) > 0;
                        }).sort(function(a, b){
                            return new Date(a.EndDate) - new Date(b.EndDate);
                        });

                        DGW.main.cache.drawsList = actArr.concat(expArr);

                        hideFinishedDraws();
                        DGW.main.methods.drawsConstructor(DGW.main.cache, 'close-to-finish');
                        break;
                    case 'dg-o-w-show-my-draws':
                        var myDraws = [];
                        DGW.main.cache.drawsEntries.forEach(function(drawE){
                            DGW.main.cache.drawsList.filter(function(draw){
                                if (draw.DrawId == drawE.DrawId) {
                                    myDraws.push(draw);
                                }
                            });
                        });
                        DGW.main.cache.drawsList = DGW.main.cache.drawsList.sort(function(a,b){
                            return new Date(b.EndDate) - new Date(a.EndDate)
                        });

                        showFinishedDraws();
                        DGW.main.methods.drawsConstructor({drawsList: myDraws, drawsEntries: DGW.main.cache.drawsEntries}, 'my-draws');
                        break;
                    case 'dg-o-w-show-games':
                        hideFinishedDraws();
                        DGW.main.methods.gamesConstructor();
                        break;
                }
            });
        });
        DGW.main.methods.drawSubmenuReset = function(){
            removeActive();
            DGW.helpers.addClass(DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-all-draws'), 'dg-o-w-active');
        };
    })();

};