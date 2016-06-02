DGW.main.methods.usersConstructor = function(state, usersFound) {
    // Possible states: 'friends', 'followers', 'search'
    'use strict';

    // Elements and variables
    var userListHolder = DGW.helpers.getElementsFromAllPlaces('[data-friends-list]')[0],
        usersToShow;

    // Methods
    var createUserItem, createUserItemActions, createSingleAction, createSimpleItem;


    createSimpleItem = function(type){
        var li = document.createElement('li');
            li.className = 'dg-o-w-table-display';
        if (type === 'empty' || !type) li.innerHTML = DGW.templates.userListItemNothingFound;
        if (type === 'new') li.innerHTML = DGW.templates.userListItemNew;

        return li;
    };

    // Every button logic, later transmitted back to the LI item
    createSingleAction = function(actionType, userId, li) {
        var action = document.createElement('div');

        function successfulUpdate(userObj, li) {
            var userIndex = DGW.main.cache.userRelations.users.findIndex(function(el){
                return (el.User.UserId == userId);
            });

            DGW.main.cache.userRelations.users[userIndex] = userObj;
            DGW.helpers.insertAfter(createUserItem(userObj), li);
            userListHolder.removeChild(li);

            console.info(userObj.User.UserId, userId)
        }

        function passEvent(actionObj, event, fn) {
            var clickHolder = (actionObj.getAttribute('data-click-holder') != null) ? actionObj : actionObj.querySelector('[data-click-holder]');
            clickHolder.addEventListener(event, fn);
        }

        switch (actionType) {
            case 'follow':
                action.innerHTML = DGW.templates.userListActions.follow;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
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
                passEvent(action, 'click', function(){
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
                passEvent(action, 'click', function(){
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
                passEvent(action, 'click', function(){
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
                passEvent(action, 'click', function(){
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
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userRequestDecline(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Decline ID: ', userId, res.Message);
                            console.warn(res);
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
            var followTwoSides = (relations.some(function(r){r=r.toLowerCase(); return r === 'followedby'}) &&
                                relations.some(function(r){r=r.toLowerCase(); return r === 'following'}));
            var friendsRelations = relations.some(function(r){return r === 'FriendRequestFrom' || r === 'Friends' || r === 'FriendRequestTo'});
            var followRelations = relations.some(function(r){ return r === 'Following' || r === 'FollowedBy'});

            relations.forEach(function (rel) {
                rel = rel.toLowerCase();

                if (rel === 'friendrequestto') {
                    if (!followRelations) actions.push(createSingleAction('follow', userId, li));
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
                if (rel === 'followedby' && !followTwoSides) {
                    actions.push(createSingleAction('follow', userId, li));
                    if (!friendsRelations) actions.push(createSingleAction('request', userId, li));
                }
                if (rel === 'following') {
                    actions.push(createSingleAction('following', userId, li));
                    if (!friendsRelations) actions.push(createSingleAction('request', userId, li));
                }
            });

        } else {
            actions.push(createSingleAction('follow', userId, li));
            actions.push(createSingleAction('request', userId, li));
        }

        return actions;
    };

    // Creating single LI element to put into the page
    createUserItem = function(userObj){
        var commonUsers = userObj.MutualFriends,
            commonUsersCount = +userObj.MutualFriendsTotalCount,
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

    // Sorting types
    function sortByName(a, b) {
        var nameA = a.User.UserName.toUpperCase();
        var nameB = b.User.UserName.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    }

    // defining which users to show in the list
    if (state === 'friends') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'FriendRequestFrom' || r === 'Friends' || r === 'FriendRequestTo';
            });
        });

        // Sorting friends in a specific order
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestFrom'})})
            .sort(sortByName).concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Friends'})})
                .sort(sortByName).concat(
                usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestTo'})})
                .sort(sortByName)
            )
        );
    } else if (state === 'following') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'Following';
            });
        });

        // Sorting followers
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Following'})}).sort(sortByName);

    }else if (state === 'followers') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'FollowedBy';
            });
        });

        // Sorting followed by
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Following'})})
            .sort(sortByName)
            .concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FollowedBy'}) &&
                f.Rels.every(function(r){return r !== 'Following'})}).sort(sortByName)
        );
    } else if (state === 'search') {
        usersToShow = usersFound.Users;
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestFrom'})})
            .sort(sortByName)
            .concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Friends'})})
                .sort(sortByName).concat(
                usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestTo'})})
                    .sort(sortByName)
            )).concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Following'})})
                .sort(sortByName)
                .concat(
                usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FollowedBy'}) &&
                    f.Rels.every(function(r){return r !== 'Following'})}).sort(sortByName)
            )).concat(usersToShow.filter(function(f){return f.Rels.length === 0}).sort(sortByName));
    } else {
        // default state
    }

    // adding users to the list
    if (usersToShow.length > 1) {
        usersToShow.forEach(function (userObj) {
            userListHolder.appendChild(createUserItem(userObj));
        });
    } else {
        userListHolder.appendChild(createSimpleItem());
    }


    // TEMP part
    DGW.helpers.console.info(
        'Number of relations > 1: ',
        DGW.main.cache.userRelations.users.filter(function(us){return us.Rels.length > 1}).length
    );
};

// ["FriendRequestTo", "Friends", "FollowedBy", "Following", "FriendRequestFrom"]
// DGW.main.cache.userRelations.users
// DGW.main.cache.userRelations.count