import {observable, action, computed} from 'mobx'
import * as mobx from 'mobx'
import _ from 'lodash'

class ChartStore{
    @observable responseData = {};
    @observable chartType = "line";
    @observable searchStr = "";

    constructor(){      //初始化图表信息
        this.baseOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    show: false,
                    type: 'line',        // 默认为直线，可选为：'line' | 'shadow' | 'cross'
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: false,
                    start: 0,
                    end: 100,
                    handleSize: 30,
                    xAxisIndex: 0,
                    filterMode: 'empty'
                }, {
                    type: 'inside',
                    start: 0,
                    end: 100,
                    xAxisIndex: 0,
                    filterMode: 'empty'
                }
            ],
            legend: {
                type: 'scroll',
                data: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisPointer: {
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                axisTick: {
                    alignWithLabel: true
                },
                data: []
            },
            yAxis: [{
                type: 'value',
                name: '',
            }],
            series: [
                {
                    name: '',
                    type: 'line',
                    yAxisIndex: 0,
                    smooth: true,
                    stack: null,
                    data: []
                }
            ]
        }
        
    }

    @computed   //预计算
    get chartData(){
        if(_.isEmpty(this.responseData)) return {}; //下面这句话算是个小技巧，相当于做了一次深copy;可以尝试尝试
        let data = Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {
            legend: {
                type: 'scroll',
                data: mobx.toJS(this.responseData.seriesMeta)
            },
            xAxis: {
                boundaryGap: this.chartType !== "line",
                axisPointer: {
                    type: this.chartType == "line" ? 'line' : 'shadow'
                },
                data: mobx.toJS(this.responseData.xAxis)
            },
            series: mobx.toJS(this.responseData.series).map((item, index)=>{
                return {
                    name:mobx.toJS(this.responseData.seriesMeta)[index],
                    type:this.chartType,
                    areaStyle: {normal: {}},
                    data:item
                }
            })
        })
        return data
    }

    @computed
    get tableColumns(){
        if(_.isEmpty(this.responseData)) return [];
        let columns = [{
            title:'类型',
            dataIndex:'segment',
            key:'segment',
            width:'100',
            fixed:'center',
        }];
        this.responseData.xAxis.map(( item, index ) => {
            columns.push({
               title: item,
               dataIndex: 't' +index,
               key: 't' + index,
           })
        });
        return columns;
    }

    @computed
    get tableData(){
        if(_.isEmpty(this.responseData)) return [];
        let tableArr = [];
        this.responseData.seriesMeta.forEach((seriesItem, i)=>{
            let cData = {   // 这对应的类型数据
                key: i,
                segment: seriesItem
            };
            this.responseData.xAxis.forEach((item, j)=>{    // t 表示的key值，和上面是一一对应的
                cData["t" + j] = this.responseData.series[i][j]
            });
            tableArr.push(cData)
        });
        if(this.searchStr){
            return tableArr.filter((item) => {
                let isFind = false
                _.forIn(item, (value, key) => {
                    if (value.toString().indexOf(this.searchStr) != -1) {
                        isFind = true
                    }
                })
                if (isFind) return item
            })
        }
        return tableArr

    }

    @action
    setChartType(type = 'line'){
        this.chartType = type
    }

    @action
    setData(data){
        if(!_.isEmpty(this.responseData)){
            let cloneData = mobx.toJS(this.responseData)
            cloneData.series.forEach((items)=>{
                items.push(items[0])
                _.pullAt(items, 0)
            })
            this.responseData = cloneData
        }else {
            this.responseData = data
        }
    }
    
    @action
    setSearchStr(str){
        this.searchStr = str
    }
}

export default ChartStore

