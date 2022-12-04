function Deposit() {
  const [deposit, setDeposit] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [users, setUsers] = React.useState([]);
  let userBalance = ctx.user.balance;
  let userName = ctx.user.name;


  function validate(number) {
    if (isNaN(number) || number < 0) {
      setStatus("Transaction Failed. Please enter a valid, positive number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit(amount) {
    if (!validate(amount)) return;
    setBalance(userBalance + amount);
    setStatus("");

    ctx.user.balance += Number(amount);
    setShow(false);
console.log("before");
    
//...

  fetch(`/account/update/${ctx.user.email}/${ctx.user.balance}`)
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      setStatus(JSON.stringify(data.amount));
      console.log('JSON:', data);
    } catch(err) {
      props.setStatus('Deposit failed')
      console.log('err:', text);
    }
  });

}

  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      txtcolor="dark"
      style="width: 25rem;"
      header="Make a Deposit"
      status={status}
      body={
        show ? (
          <>
            <h2>Welcome, {userName}!</h2>
            <br />
            <h4>Current Balance: $ {userBalance}</h4>
            <br />
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter Amount"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-dark"
              disabled={deposit === ""}
              onClick={() => handleDeposit(deposit)}
            >
              Deposit Amount
            </button>
          </>
        ) : (
          <>
            <h5>Success!</h5>
            <h4>Current Balance: $ {userBalance}</h4>
            <button type="submit" className="btn btn-dark" onClick={clearForm}>
              Make Another Deposit
            </button>
          </>
        )
      }
    />
  );
}




  // React.useEffect(() => {
  //   fetch(`/account/update/${ctx.users[0].email}/${ctx.users[0].balance}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data);
  //       console.log("after");
  //     });
  // }, []);