DGW.main.methods.activitiesInit = function(){

    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').addEventListener('change', function(){
        if (this.value === 'all-activities') {
            DGW.global.api.requests.getAllActivities(function(response){
                DGW.main.methods.activitiesConstructor(response.Activities);
            });
        } else {
            DGW.global.api.requests.getUserActivities(function(response){
                DGW.main.methods.activitiesConstructor(response.Activities);
            });
        }
    });

};