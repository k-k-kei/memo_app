      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return true;
          },
          uiShown: function () {
            document.getElementById("loader").style.display = "none";
          },
        },
        signInFlow: "popup",
        signInSuccessUrl: "./content.html",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      };
      ui.start("#firebaseui-auth-container", uiConfig);