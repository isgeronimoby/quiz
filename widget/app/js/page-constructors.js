DGW.main.methods.setRewardedActions = function(w, a){
    if (!w) w = DGW.main.elements.widget;
    if (!a) a = DGW.main.cache.rewardedActions;
    if (w.querySelector('.dg-o-w-rewarded-action') && a.length > 0) {
        if (w.querySelector('#dg-o-w-login-fb-reward')) {
            if (a.filter(function(action){return action.Type == 'FacebookConnect'}).length > 0)
                w.querySelector('#dg-o-w-login-fb-reward').innerHTML = a.filter(function(action){return action.Type == 'FacebookConnect'})[0].PointsReward;
        }
        if (w.querySelector('#dg-o-w-friends-sign-up-reward')) {
            if (a.filter(function(action){return action.Type == 'FriendSignUp'}).length > 0)
                w.querySelector('#dg-o-w-friends-sign-up-reward').innerHTML = a.filter(function(action){return action.Type == 'FriendSignUp'})[0].PointsReward;
        }
        if (w.querySelector('#dg-o-w-facebook-like-reward')) {
            if (a.filter(function(action){return action.Type == 'FacebookShare'}).length > 0)
                w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = ' and get +' + a.filter(function(action){return action.Type == 'FacebookShare'})[0].PointsReward + ' points';
            else w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = '';
        }
        if (w.querySelector('#dg-o-w-tweeter-like-reward')) {
            if (a.filter(function(action){return action.Type == 'TwitterShare'}).length > 0)
                w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = ' and get +' + a.filter(function(action){return action.Type == 'TwitterShare'})[0].PointsReward + ' points';
            else w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = '';
        }
    }
};

DGW.main.methods.notificationConstructor = function(lis, _type) {
    var ul = DGW.main.elements.pages.notificationHolder.querySelector('ul');
        ul.innerHTML = '';
    if (!_type) _type = 'success';

    if (DGW.helpers.isArray(lis)) {
        lis.forEach(function(el){
            var li = document.createElement('li');
            li.innerHTML = el;
            ul.appendChild(li);
        });
        DGW.main.methods.showNotificationBar(_type);
    } else if (typeof lis == 'string'){
        var li = document.createElement('li');
        li.innerHTML = lis;
        ul.appendChild(li);
        DGW.main.methods.showNotificationBar(_type);
    } else {
        DGW.helpers.console.warn('Notification parameters are not of the type of [Array] or String');
    }
};