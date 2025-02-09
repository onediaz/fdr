// pages/index.js
import TransactionsComponent from '../components/transactions';
import './styling/index.css';

const Home = ({studentUser, pageViewCount}) => {

    return (
      <div className="mainContainer">
        <div className='textContainer'>
          <span className='welcome-message'>Welcome to FDR... You are the {pageViewCount} visitor.</span>
          <br/>
          <br/>
          This is a personal project, an app that was used by my students at Franklin D Roosevelt High School.
          The app works similar to venmo and was used to encourage students responsible spending. 
          <br/>
          Provided below is some transactions that were used during our class time.
        </div>
        <TransactionsComponent filterKey="all" className="about"/>
      </div>
      
    );
};
export default Home;
