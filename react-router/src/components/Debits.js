import { Link } from 'react-router-dom';

const Debits = (props) => {
	let debitsView = () => {
        const { debits } = props;
        return debits.map((debit) => {
            let date = debit.date.slice(0,10);
            return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
        }) 
    }
    return (
    	<div>
    	   <h1>Debits</h1>
    	   {debitsView()}
           <form onSubmit={props.addDebit}>
             <input type="text" name="description" placeholder="Item"/>
             <input type="number" name="amount" placeholder="Price" />
             <button type="submit">Add Debit</button>
           </form>
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
export default Debits;