import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routers from './routers/index';
import "./asset/css/App.css";
class App extends React.Component {
    render(){
        return (
            <div className='app-box'>
                <Router>
                    <Routes> 
                        {routers.map((item, index) => {
                            return (
                                <Route
                                    key={index}
                                    exact
                                    path={item.path}
                                    element={<item.component />}
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;