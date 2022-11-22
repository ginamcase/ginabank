

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus(
        `Your account could not be created, due to missing ${label}. Please try again.`
      );
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function validPassword(password) {
    if (password.length < 8) {
      setStatus(
        `Password must be at least 8 characters long. Please try again.`
      );
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validPassword(password, "password")) return;
    const auth  = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email,password);
		promise.catch(e => {
            e.message ? setShow(true): setShow(false)
            setStatus(e.message)
            console.log(e.message)});

       const url = `/account/create/${name}/${email}/${password}`;
       (async () => {
        var res = await fetch(url, {method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors' });
        var data = await res.json();
        console.log(data);
        ctx.user.email = email;
        ctx.user.balance = 0;
   })();
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      txtcolor="dark"
      header="Complete the fields below to create your new account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={name === "" && email === "" && password === ""}
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success! Your account was created.</h5>
            <button type="submit" className="btn btn-dark" onClick={clearForm}>
              Create Another Account
            </button>
          </>
        )
      }
    />
  );
}
