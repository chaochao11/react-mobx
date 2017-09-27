/***
* Created by xiaosong by 2017/09/15
* ***/

import React from 'react'
import ECharts from 'echarts'
import {inject, observer} from 'mobx-react'
import {autorun} from 'mobx'
import {Select, Icon, Radio, DatePicker} from 'antd'
import _ from 'lodash'

@inject("chartStore")       // 注入store的，作用就是在组件里面可以直接通过this.props去调用。。。
@observer       // store 和 components 的组件进行数据绑定，
export default class Chart extends React.Component{
    constructor(props){
        super(props)
        this.chart
        this.chartStore = this.props.chartStore

        setTimeout(()=>{
            this.chartStore.setData({
                "xAxis": [
                    "2017-04-01",
                    "2017-05-01",
                    "2017-06-01",
                    "2017-07-01"
                ],
                "series": [
                    [ 1431995,1150919,1600187,1599544],
                    [ 1231995,1050919,1200187,1199544],
                    [ 1331995,1250919,1900187,1799544]
                ],
                "seriesMeta": ["VPN使用时长","上报日活","分享平台"]
            })
        }, 1000)
    }

    componentDidMount(){
        if(!this.chart){
            this.chart = ECharts.init(document.getElementById("chart"))
            autorun(()=>{
                this.chartStore.responseData;     //这两个是必须的，你可以注释掉看看效果
                this.chartStore.chartType;
                this.setOption(this.chartStore.chartData)
            })
            this.bindEvent()
        }
    }

    // 卸载
    componentWillUnmount () {
        this.removeEvent()
        this.chart && this.chart.dispose()
        delete this.chart
    }

   //绑定图表时间
    bindEvent () {
        window.addEventListener('resize', this.handleResize)
    };

    //解除绑定图表时间
    removeEvent () {
        window.removeEventListener('resize', this.handleResize)
    };

    //监听    这几个事件是为了让图表宽度自适应的
    handleResize = ()=> {
        this.chart && this.chart.resize()
    };

    setOption(chartData){
        !_.isEmpty(chartData) && this.chart.setOption(chartData)
    };

    //切换图表
    onChangeType = (e) =>{
        this.chartStore.setChartType(e.target.value)
    };

    render() {
        return (
            <div >
                <div>
                    <div>
                        <Radio.Group defaultValue="line" onChange={this.onChangeType}>
                            <Radio.Button value="line"> <Icon type="line-chart"/></Radio.Button>
                            <Radio.Button value="bar"> <Icon type="bar-chart"/> </Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <div style={{height: '200px'}} id="chart"></div>
            </div>
        )
    }
}
