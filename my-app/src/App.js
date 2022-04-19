
import './App.css'

const App = () => {
  
    const date = new Date(2022,4,4,18,9);
    const curtime = date.getHours();
    let getting ="";

    let css ={};

    if (curtime >= 1 && curtime < 12){

       getting ="good morning";
       css.color = "green";

    }else if(curtime >=12 && curtime < 19 ){

      getting ="good afternoon";
      css.color = "yellow";

    }else{
      
      getting ="good night";
      css.color ="black";

    }
  
   return(
     <div>
      <h1 > Hello Sir,<span style ={css}>{getting}</span></h1>
     </div>
   )
}

export default App;
