DGW.main.methods.userListItemConstructor = function(users, group){
    'use strict';
    if (!users) return;

    function createUserListAction (actionType) {
        var action = document.createElement('div');
        switch (actionType) {
            case 'follow':
                action.innerHTML = DGW.templates.userListActions.follow;
                break;
            case 'following':
                action.innerHTML = DGW.templates.userListActions.following;
                break;
            case 'friends':
                action.innerHTML = DGW.templates.userListActions.friends;
                break;
            case 'request':
                action.innerHTML = DGW.templates.userListActions.request;
                break;
            case 'requestSent':
                action.innerHTML = DGW.templates.userListActions.requestSent;
                break;
            case 'accept':
                action.innerHTML = DGW.templates.userListActions.accept;
                break;
            case 'decline':
                action.innerHTML = DGW.templates.userListActions.decline;
                break;
            default:
                return action;
        }

        action = action.childNodes[0];
        return action;
    }

    var usersArray = [];
    users.forEach(function(userObj){
        var commonUsers = userObj.MutualFriends;
        var commonUsersCount = +userObj.MutualFriendsCount;
        var user = userObj.User;
        var commonUsersText = document.createElement('p');
        var li = document.createElement('li');

        li.className = 'dg-o-w-table-display';
        li.innerHTML = DGW.templates.userListItem;

        var commonUsersHolder = li.querySelector('[data-user-common-users]');
        var userActionsHolder = li.querySelector('[data-user-actions]');

        // Filling user name, image, groups
        li.querySelector('[data-user-image]').src = user.ImageUrl;
        li.querySelector('[data-user-name]').innerHTML = user.UserName;


        //Filling common users section
        if (commonUsers.length > 0) {
            var commonImgsHolder = document.createElement('div');
            commonUsers.forEach(function(cUser, ind){
                if (ind > 2) return;
                var img = document.createElement('img');
                img.src = cUser.ImageUrl;
                commonImgsHolder.appendChild(img);
            });
            commonUsersHolder.appendChild(commonImgsHolder);

            if (commonUsersCount === 1) {
                commonUsersText.innerHTML = '1 common user';
            } else {
                commonUsersText.innerHTML = commonUsersCount + ' common users';
                commonUsersText.className = ((commonUsers.length == 2) ? 'dg-o-w-two-images' : 'dg-o-w-three-images');
            }
        } else {
            commonUsersText.innerHTML = 'No common users';
        }
        commonUsersHolder.appendChild(commonUsersText);


        // Filling actions available with this user
        if (group === 'requestFrom') {
            userActionsHolder.appendChild(createUserListAction('accept'));
            userActionsHolder.appendChild(createUserListAction('decline'));
        } else if (group === 'friends') {
            userActionsHolder.appendChild(createUserListAction('friends'));
        } else if (group === 'requestTo') {
            userActionsHolder.appendChild(createUserListAction('requestSent'));
        }

        usersArray.push(li);
    });

    return usersArray;
};


DGW.main.methods.friendsConstructor = function(usersObj){
    if (!usersObj) return;

    var userListHolder = DGW.helpers.getElementsFromAllPlaces('[data-friends-list]')[0];
    userListHolder.innerHTML = '';

    DGW.main.methods.userListItemConstructor(usersObj.FriendRequestsFrom, 'requestFrom').forEach(function(userItem){
        userListHolder.appendChild(userItem);
    });
    DGW.main.methods.userListItemConstructor(usersObj.Friends, 'friends').forEach(function(userItem){
        userListHolder.appendChild(userItem);
    });
    DGW.main.methods.userListItemConstructor(usersObj.FriendRequestsTo, 'requestTo').forEach(function(userItem){
        userListHolder.appendChild(userItem);
    });
};

