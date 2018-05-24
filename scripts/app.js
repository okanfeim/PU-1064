(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_H1AUVTz1m"; // Place your appKey from Kinvey here...
    let appSecret = "725872e17f294118954130afe198ad2e"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "d69fab40-b4f2-4933-b6db-fc213c6aacbd.x0WCvqPCkPAlghE3ovgSgOXO0x7L+upb7svU8ubX0eI="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester
    let authService = new AuthorizationService(baseUrl,appKey,appSecret,_guestCredentials);
    let requester = new Requester(authService);

    authService.initAuthorizationType("Kinvey");

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let homeView = new HomeView(mainContentSelector,selector);
    let homeController = new HomeController(homeView,requester,baseUrl,appKey);

    let userView = new UserView(mainContentSelector,selector);
    let userController = new UserController(userView,requester,baseUrl,appKey);

    let postView = new PostView(mainContentSelector,selector);
    let postController = new PostController(postView,requester,baseUrl,appKey);

    initEventServices();

    onRoute("#/", function () {
        if(authService.isLoggedIn()){
            homeController.showUserPage();
        }
        else{
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function (params) {
        let top = $('#post-'+ this.params['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        let fullName = sessionStorage.getItem('fullName');
        postController.showCreatePostPage(fullName, authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createNewPost(data);
    });

    run('#/');
})();
