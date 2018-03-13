import React,{Component} from 'react';
import axios from 'axios';
import Transmit from 'react-transmit';

class Demo extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         data: [],
    //     }
    // }
    // componentDidMount() {
    //     axios.get('http://cangdu.org:8001/v1/cities?type=hot').then( ({data}) => {
    //         this.setState({data});
    //     });
    //     axios.get('http://localhost:3000/ssr').then( res => {
    //         console.log(res);
    //     }, err => console.log(err));
    // }
    render() {
        // const {list} = this.props;
        console.log(this.props.list);
        // return (
        //     <div>
        //         {list.map( item => {
        //             return <p className="list" key={item.id}> {item.name} </p>
        //         } )}
        //     </div>
        // )
    }
}

export default Transmit.createContainer(Demo, {
    initialVariables:{},
    fragments: {
        list() {
            return axios.get('http://cangdu.org:8001/v1/cities?type=hot')
            .then(({data}) => data)
        },
        html() {
            return axios.get('http://localhost:3000/ssr').then( res => console.log(res) );
        }
    }
})