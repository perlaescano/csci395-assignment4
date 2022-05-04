import { Link } from 'react-router-dom';


const Credits = (props) => {
	let creditsView = () => {
        const { credits } = props;
        return credits.map((credit) => {
            let date = credit.date.slice(0,10);
            return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
        }) 
    }
    return (
    	<div>
    	   <h1>Credits</h1>
    	   {creditsView()}
           <form onSubmit={props.addCredit}>
             <input type="text" name="description" placeholder="Item"/>
             <input type="number" name="amount" placeholder="Price"/>
             <button type="submit">Add Credit</button>
           </form>
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
             <Link to="/" style = {{color: "black", textDecoration: "none", fontSize: "20px"}}>Home</Link>
           </div>
    	</div>

    )
}
export default Credits;