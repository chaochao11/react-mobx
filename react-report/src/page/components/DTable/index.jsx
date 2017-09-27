/***
 * Created by xiaosong 2017/09/16
 * **/

import React from 'react';
import { Table,Icon,Input } from 'antd';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';


@inject('chartStore')
@observer
export default class DTable extends React.Component{
    constructor(props) {
        super(props);
    };
    
    onSearchChange = (e) => {
        this.props.chartStore.setSearchStr(e.target.value || "");
    }
    
    getTableHeader() {
        return (
            <div>
                <div>
                    <Input placeholder="搜索内容" onChange={this.onSearchChange}/>
                </div>
            </div>
        )
    }
    
    render() {
        return(
            <Table
                columns={ this.props.chartStore.tableColumns }
                dataSource={ this.props.chartStore.tableData }
                scroll={{x: true}}
                title={ this.getTableHeader.bind(this) }
            />
        )
    }
}