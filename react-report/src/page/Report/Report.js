import React from 'react';
import Chart from '../components/Chart/index.jsx';
import DTable from '../components/DTable/index.jsx';


export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <div>
                <Chart  />
                <DTable />
            </div>

        )

    }
}