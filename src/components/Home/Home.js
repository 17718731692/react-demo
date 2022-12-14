import React from 'react';
import { Button, message, Table ,Space} from 'antd';
import TableModal from '../addModal'
import EditModal from '../editModal'
import axios from 'axios';
import '../../asset/css/Home.css'
class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading:false,
        columns:[
          {
            title: '药品代码',
            width: 100,
            dataIndex: 'drugCode',
            key: 'drugCode',
            fixed: 'left',
          },
          {
            title: '药品名',
            dataIndex: 'drugName',
            key: 'drugName',
            fixed: 'left',
          },
          {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: '商家',
            dataIndex: 'business',
            key: 'business',
          },
          {
            title: '类别',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            render: (record) => (
              <Space>
                <EditModal data={this.state.data} listData={record} getData={this.getData}></EditModal>
                <Button onClick={() => {this.delete(record)}}>删除</Button>
              </Space>
            ),
          },
        ],
      }
    }
    componentDidMount(){
      this.getData()
    }
    delete = (record)=>{
      console.log(record);
      axios.delete(`http://localhost:3004/list/${record.id}`).then((res)=>{
        if(res.status === 200){
          this.getData()
          message.success('删除成功')
        }
        
      })
    }
    getData = ()=>{
      this.setState({
        loading:true
      })
      axios.get('http://localhost:3004/list').then((res)=>{
        setTimeout(()=>{
          this.setState({
            data:res.data,
            loading:false
          })
        },1000)
        
      })
    }
    render(){
      let data = this.state.data;
      let columns = this.state.columns;
      let loading = this.state.loading
      return (
        <div className='list-box'>
          <TableModal data={this.state.data} getData={this.getData}></TableModal>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={loading}
            scroll={{
              y: 400,
            }}
          />
        </div>
        
      );
    }
}

export default Home;