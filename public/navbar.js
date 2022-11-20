function NavBar(props){
  const ctx = React.useContext(UserContext); 
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  




  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
       
          <li className="nav-item"  data-toggle="tooltip" title="Return Home">
              <a  href='/' className="nav-link" aria-current="page"> Home </a>              
          </li>

          <li className="nav-item" data-toggle="tooltip" title="Open your Bank Account">
            <a href="#/CreateAccount/" className="nav-link" >Create Account</a>
          </li>

          <li className="nav-item" data-toggle="tooltip" title="Log In to your Account">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          
          <li className="nav-item" data-toggle="tooltip" title="Make a Deposit">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>

          <li className="nav-item" data-toggle="tooltip" title="Make a Withdrawal">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>

          <li className="nav-item" data-toggle="tooltip" title="Check your Balance">
            <a className="nav-link"   href="#/balance/">Balance</a>
          </li>

          <li className="nav-item" data-toggle="tooltip" title="View All Data">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>       

          <li className="nav-item" data-toggle="tooltip" title="Log Out of your Account">
            <a className="nav-link" href="#/login/" >Logout</a>
          </li>       
             
        </ul>
        </div>
     
    </nav>
    </>
  );
}