

function AllData() {
  const ctx = React.useContext(UserContext);

  const displayUsers = ctx.users.map((user) => {
    return (
      <tr key={user}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.balance}</td>
      </tr>
    );
  });

  return (
    <Card
      bgcolor="white"
      txtcolor="text-dark"
      header="All User Data"
      body={
        <table className="table table-striped ">
          <thead className="thead-info">
            <tr className="table-info">
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </table>
      }
    />
  );
}

