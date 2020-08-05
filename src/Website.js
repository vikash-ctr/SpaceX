import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '././index.css';
import Home from "./Home";
import {Switch, Route, Redirect } from "react-router-dom"

const Website = () =>{
   return (
       <div>
           
           <Switch>
               <Route exact path = "/" component={Home} />                  
           </Switch>
        
       </div>
   ) 
}
export default Website