// pages/index.js
import TransactionsComponent from '../components/transactions';


const Home = ({studentUser}) => {

    return (
      <div className="mainContainer">
        <div className='titleContainer'> FDR</div>
        <div className='textContainer'>
          {studentUser ? studentUser.email : 'false'}
          Hi Welcome to FDR. This is a personal project, to advance student learning on income, savings and much much more. 
          My name is Juan, and I am currently teaching Algebra 1 at Franklin D. Roosevelt High School of Innovation. 
          <br/>
          The purpose of my website is for students to get a sense of real life budgeting.
          Students will have their own bank accounts and be able to send/receive money from other students.
          <br/>
          My future goals will be for students to have access to an investing account, and roles that pay them on a schedule. 
        </div>
        <TransactionsComponent user={studentUser}/>
      </div>
      
    );
};
export default Home;
