import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Debits from "./components/Debits";
import Credits from "./components/Credits";
import axios from "axios";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      debits: [],
      credits: []
    }
  }

  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
   
    //get data from API response
    debits = debits.data
    credits = credits.data

    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })

    let accountBalance = creditSum - debitSum;
    accountBalance = roundAccountBalance(accountBalance);
    this.setState({debits, credits, accountBalance});
  } 


  addDebit = (e) => {
    //send to debits view via props
    //updates state based off user input
    e.preventDefault()
    let { debits } = this.state
    let balance = this.state.accountBalance;

    const description  = e.target[0].value
    const amount  = Number(e.target[1].value)
    const today = new Date();

    //formatting to match other dates
    const month = today.getMonth() + 1;
    const date = today.getFullYear().toString() + "-" + month.toString() + "-" + today.getDate().toString();
    
    const newDebit = {description, amount, date}
    balance = balance - amount;
    debits = [...debits, newDebit]
    balance = roundAccountBalance(balance);
    this.setState({debits: debits, accountBalance: balance})
  }

  addCredit = (e) => {
    //send to credits view via props
    //updates state based off user input
    e.preventDefault()
    let { credits } = this.state
    let balance = this.state.accountBalance;

    const description  = e.target[0].value
    const amount  = Number(e.target[1].value)
    const today = new Date();

    //formatting to match other dates
    const month = today.getMonth() + 1;
    const date = today.getFullYear().toString() + "-" + month.toString() + "-" + today.getDate().toString();
    
    const newCredit = {description, amount, date}
    balance = balance +  amount;
    credits = [...credits, newCredit]
    balance = roundAccountBalance(balance);
    this.setState({credits: credits, accountBalance: balance})
  }

  render() {
    return (
      <div className="App" style = {{backgroundColor:"beige", 
                                     width: "500px", 
                                     marginLeft:"auto",
                                     marginRight:"auto",
                                     borderRadius: "10%",
                                     border:"black solid",
                                     marginTop:"50px",
                                     }}>
        <h1>Welcome to React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debits" element={<Debits addDebit={this.addDebit} debits={this.state.debits} />} />
          <Route path="/credits" element={<Credits addCredit={this.addCredit} credits={this.state.credits} />} />
        </Routes>
        <h3>Balance: {this.state.accountBalance}</h3>
      </div>
    );
  }


}

// Function used to concatonate and round the balance
function roundAccountBalance(balance){
  let balanceString = balance.toString();
  let indexOfDecimel = balanceString.indexOf(".");
  let afterDecimel = balanceString.substring(indexOfDecimel+1,indexOfDecimel+3);
  let beforeDecimel = balanceString.substring(0,indexOfDecimel+1);
  let roundCheck = balanceString[indexOfDecimel + 3];
  let roundCheckInt = parseInt(roundCheck);
  if(roundCheckInt>=5){
    let afterDecimelInt = parseInt(afterDecimel);
    afterDecimelInt++;
    afterDecimel = afterDecimelInt.toString();
  }
  let newBalance = beforeDecimel + afterDecimel;
  return newBalance;
}

function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <div style = {{borderRadius:"5%", 
                          backgroundColor:"beige", 
                          width: "70px",
                          marginLeft:"auto",
                          marginRight:"auto",
                          marginTop:"10px",
                          border: "black solid",
                          }}>
             <Link to="/Debits" style = {{color: "black", textDecoration: "none", fontSize: "20px"}}>Debits</Link>
           </div>
           <div style = {{borderRadius:"5%", 
                          backgroundColor:"beige", 
                          width: "70px",
                          marginLeft:"auto",
                          marginRight:"auto",
                          marginTop:"10px",
                          border: "black solid",
                          }}>
             <Link to="/Credits" style = {{color: "black", textDecoration: "none", fontSize: "20px"}}>Credits</Link>
           </div>
    </div>
  );
}


export default App;