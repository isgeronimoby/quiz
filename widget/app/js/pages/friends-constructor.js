DGW.main.methods.usersConstructor = function(state, searchQuery) {
    // Possible states: 'friends', 'followers', 'search'
    'use strict';

    // Elements and variables
    var userListHolder = DGW.helpers.getElementsFromAllPlaces('[data-friends-list]')[0],
        usersToShow;

    // Methods
    var createUserItem, createUserItemActions, createSingleAction;


    // Every button logic, later transmitted back to the LI item
    createSingleAction = function(actionType, userId, li) {
        var action = document.createElement('div');

        function successfulUpdate(userObj, li) {
            DGW.helpers.insertAfter(createUserItem(userObj), li);
            userListHolder.removeChild(li);
        }

        switch (actionType) {
            case 'follow':
                action.innerHTML = DGW.templates.userListActions.follow;
                action = action.childNodes[0];
                action.addEventListener('click', function(){
                    DGW.global.api.requests.userFollow(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Follow ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'following':
                action.innerHTML = DGW.templates.userListActions.following;
                action = action.childNodes[0];
                action.addEventListener('click', function(){
                    DGW.global.api.requests.userUnfollow(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Unfollow ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'followsYou':
                action.innerHTML = DGW.templates.userListActions.followsYou;
                action = action.childNodes[0];
                break;
            case 'friends':
                action.innerHTML = DGW.templates.userListActions.friends;
                action = action.childNodes[0];
                action.addEventListener('click', function(){
                    DGW.global.api.requests.userUnfollow(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Unfriend ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'request':
                action.innerHTML = DGW.templates.userListActions.request;
                action = action.childNodes[0];
                action.addEventListener('click', function(){
                    DGW.global.api.requests.userRequestSend(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Friend request send ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'requestSent':
                action.innerHTML = DGW.templates.userListActions.requestSent;
                action = action.childNodes[0];
                break;
            case 'accept':
                action.innerHTML = DGW.templates.userListActions.accept;
                action = action.childNodes[0];
                action.addEventListener('click', function(){
                    DGW.global.api.requests.userRequestAccept(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Accept ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'decline':
                action.innerHTML = DGW.templates.userListActions.decline;
                action = action.childNodes[0];
                action.addEventListener('click', function(){
                    DGW.global.api.requests.userRequestDecline(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Decline ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            default:
                return action;
        }

        return action;
    };

    // Defining which actions will be needed withing this user (one LI element)
    createUserItemActions = function(relations, userId, li){
        if (relations == undefined) return;
        var actions = [];

        if (relations.length > 0) {
            relations.forEach(function (rel) {
                rel = rel.toLowerCase();

                if (rel === 'friendrequestto') {
                    actions.push(createSingleAction('requestSent'));
                }
                if (rel === 'friendrequestfrom') {
                    actions.push(createSingleAction('accept', userId, li));
                    actions.push(createSingleAction('decline', userId, li));
                    return;
                }
                if (rel === 'friends') {
                    actions.push(createSingleAction('friends', userId, li));
                }
                if (rel === 'followedby') {
                    actions.push(createSingleAction('followsYou'));
                    actions.push(createSingleAction('follow', userId, li));
                }
                if (rel === 'following') {
                    actions.push(createSingleAction('following', userId, li));
                }

            });
        } else {
            actions.push(createSingleAction('request', userId, li));
            actions.push(createSingleAction('follow', userId, li));
        }

        return actions;
    };

    // Creating single LI element to put into the page
    createUserItem = function(userObj){
        var commonUsers = userObj.MutualFriends,
            commonUsersCount = +userObj.MutualFriendsCount,
            user = userObj.User,
            relations = userObj.Rels,
            relationsCount = userObj.RelsCount;

        var commonUsersText = document.createElement('p'),
            li = document.createElement('li');
            li.className = 'dg-o-w-table-display';
            li.innerHTML = DGW.templates.userListItem;

        var commonUsersHolder = li.querySelector('[data-user-common-users]'),
            userActionsHolder = li.querySelector('[data-user-actions]');


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

        createUserItemActions(relations, user.UserId, li).forEach(function(action){
            userActionsHolder.appendChild(action);
        });

        return li;
    };


    // Main logic
    // cleaning the list of users
    userListHolder.innerHTML = '';

    // defining which users to show in the list
    if (state === 'friends') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'FriendRequestTo' || r === 'Friends' || r === 'FriendRequestFrom';
            });
        });
    } else if (state === 'following') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'FollowedBy' || r === 'Following';
            });
        });
    } else if (state === 'search') {
        usersToShow = searchQuery.Users;
    } else {
        // default state
    }

    // adding users to the list
    usersToShow.forEach(function(userObj){
        userListHolder.appendChild(createUserItem(userObj));
    });


    // TEMP part
    DGW.helpers.console.info(
        'Number of relations > 0: ',
        DGW.main.cache.userRelations.users.filter(function(us){return us.Rels.length > 1}).length
    );
};

// ["FriendRequestTo", "Friends", "FollowedBy", "Following", "FriendRequestFrom"]
// DGW.main.cache.userRelations.users
// DGW.main.cache.userRelations.count