// pages/index.js
import TransactionsComponent from '../components/transactions';


const Home = ({studentUser}) => {

    return (
      <div className="mainContainer">
        <div className='titleContainer'> FDR</div>
        <div className='textContainer'>
          Welcome to FDR. This is a personal project, to advance student learning on income, savings and much much more. 
          My name is Juan, and I am currently teaching Accelerated Physics at Franklin D. Roosevelt High School of Innovation. 
          <br/>
          The purpose of my website is for students to get a sense of real life budgeting.
          Students will have their own bank accounts and be able to send/receive money from other students.
          <br/>
          My future goals will be for students to have access to an investing account, and roles that will pay them on a real life schedule. 
        </div>
        <TransactionsComponent user={studentUser} filterKey="recent" />
      </div>
      
    );
};
export default Home;
