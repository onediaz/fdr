// pages/index.js
import TransactionsComponent from '../components/transactions';


const Home = ({studentUser}) => {

    return (
      <div className="mainContainer">
        <div className='titleContainer'> FDR</div>
        <div className='textContainer'>
          Welcome to FDR. This is a personal project, an app that was used by my students at Franklin D Roosevelt High School.
          The app was worked similar to venmo and was used to encourage students responsible spending. 
          <br/>
          Provided below is some transactions that were used during our class time.
        </div>
        <TransactionsComponent filterKey="all" className="about"/>
      </div>
      
    );
};
export default Home;
