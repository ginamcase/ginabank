function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const ctx = React.useContext(UserContext);
    const emailinput = document.getElementById("emailinput");
    const passwordinput = document.getElementById("passwordinput");
    var provider = new firebase.auth.GoogleAuthProvider(); 
  
    function googleLogin () {
      firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
  
        setShow(false);
        setStatus(true);
  
        /* @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        ctx.user.email = user.email;
  
        (async () => {
          const url = `/account/findOne/${user.email}`;
          var res = await fetch(url, { method: 'GET'});
          var data = await res.json();
          if (data.error) {
            console.log(data.error);
            setStatus('Error: ' + data.error);
          }
          if (data.response.redirected)  //take out redirected???
          {
            ctx.user.name = data.name;
            ctx.user.email = data.email;
            ctx.user.password = data.password;
            ctx.user.balance = data.balance;
            let activeuser = document.getElementById('activeuser');
            activeuser.innerText = data.email;
            setShow(false);
            console.log("test");
          }
          else
          {
            console.log(data.response);
            fetch(`/account/create/${user.displayName}/${user.email}/dummy`, {
              method: 'POST'})
              .then((data) => console.log(data))
            setShow(false);
            ctx.user.name = data.name;
            ctx.user.email = data.email;
            ctx.user.password = data.password;
            ctx.user.balance = 0;
          }
          ///SOMEWHERE in the above or down below is where I need a conditional statement so firebase will check for an existing account and only create an account for google logins that arent already in the database.  See props and methods here https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createUserWithEmailAndPassword
        })();
  
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    }
  
    function firebaseAuthentication() {
      firebase
        .auth()
        .signInWithEmailAndPassword(emailinput.value, passwordinput.value)
        .then((user) => {
          (async () => {
            const url = `/account/login/${emailinput.value}/${passwordinput.value}`;
            var res = await fetch(url, { method: 'get'});
            var data = await res.json();
            console.log(data);
            console.log(ctx);

            if (data.error) {
              console.log(data.error);
              setStatus('Error: ' + data.error);
            }
            else
            {
              ctx.user.name = data.name;
              ctx.user.email = data.email;
              ctx.user.password = data.password;
              ctx.user.balance = data.balance;
              setShow(false);
              let activeuser = document.getElementById('activeuser');
              activeuser.innerText = data.email;
            }
          })();
            })
        .catch((e) => console.log(e.message));
}

    return (
      <Card
        bgcolor="warning"
        header="Login"
        txtcolor="black"
        status={status}
        body={
          show ? (
            <>
              Login Email:
              <br />
              <input type="input" className="form-control" id="emailinput" placeholder="Enter email" value={email} onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <br />
              Password:
              <br />
              <input type="password" className="form-control" id="passwordinput" placeholder="Enter password" value={password} onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <br />
              <input
                type="submit" className="btn btn-light text-black-100" id="firebase-submit-button" onClick={firebaseAuthentication} value="Login" 
              />
              <br /> 
              <br />
              <button type="submit" onClick={googleLogin}>
                <img
                  src="googlebutton.png"
                  alt="Responsive image"
                  height="75em"
                  width="250em"
                ></img>
              </button>              
            </>
          ) : (
            <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light">
                Welcome back!
              </button>
            </>
          )
        }
      />
    );
    }