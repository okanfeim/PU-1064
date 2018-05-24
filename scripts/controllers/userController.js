class UserController{
    constructor(userView,requester, baseUrl, appKey){
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl+ "/user/" + appKey + "/";
    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }

    register(data){
        if(data.username.length < 6){
            showPopup('error','The username must contain minimum 6 characters.');
            return;
        }

        if(data.fullname.length < 6){
            showPopup('error','Name need to contain minimum 5 characters.');
            return;
        }

        if(data.password != data.confirmPassword){
            showPopup('error','Password must match');
            return;
        }

        if(data.password.length < 6){
            showPopup('error','password length must be minimum 6 characters');
            return;
        }

        delete data['confirmPassword'];

        this._requester.post(this._baseServiceUrl,data,
            function successCallback(response) {
                showPopup('success','Registered successfully');
                redirectUrl('#/login');
            },
            function errorCallback(response) {
                showPopup('error',"Nothing affected.");
            });
    }

    login(data){
        let requestUrl = this._baseServiceUrl + "login";
        this._requester.post(requestUrl,data,
            function successCallback(response) {
                sessionStorage.setItem('username',response.username);
                sessionStorage.setItem('_authToken',response._kmd.authtoken);
                sessionStorage.setItem('fullName',response.fullname);

                showPopup('success','You have successfully logged in');
                redirectUrl('#/');
            },
            function errorCallback(response) {
                showPopup('error',"Nothing affected.");
            });

    }

    logout(){
        sessionStorage.clear();
        redirectUrl('#/')
    }
}