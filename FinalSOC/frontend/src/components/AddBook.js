import React ,{Component} from 'react';
import axios from 'axios';
import { withStyles,makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { mergeClasses } from '@material-ui/styles';
import './input.css';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));


export default class Staff extends Component{
  constructor(props){
    super(props);
    this.state = {
      new_book : {
        title : "",
        author: "",
        barcode : "",
        status : true
      },
      newbook:[],
      activebook : []
    }
  }
  handleChange = e => {
    let { name , value } = e.target;
    if (e.target.type === "checkbox") {
          value = e.target.checked;
    }
    const xyz = { ...this.state.new_book , [name]:value };
    this.setState({new_book : xyz});
  }


  addBook = () => {
    const thing = this.state.new_book;
    var x =this.search(thing,true);
    if(x===1){
      if(thing.title===''){
        alert("no title");
      }
      else{
      axios
       .post("http://localhost:8000/api/catalogue/",thing)
       .then(res => this.getdata())
       .catch(err => console.log(err));
       // .catch(err => alert("field missing or already there"));
      }
    }
    else{
      alert("already exists");
    }
  }

  deleteBook = () => {
    let item = this.state.new_book;
    var id = this.search(item,false);
    if ((id !==0) && (id !==-1)){
      var net = id.toString();
      var ur = "http://localhost:8000/api/catalogue/" + net;
      axios
      .delete(ur)
      .then(res => this.getdata());
    }
    else if(id ===0) {
      alert('no item found');
    }
    else{
      alert("more than one item");
    }


  };
  search = (item,x) =>{
      const list = this.state.activebook;
      var is_present = false;
      const filter = item.title.toLowerCase();

      if(x){
      list.map(some => {
        var lis = some.title.toLowerCase();
        if(lis===filter)is_present = true;
        return 0 ;
        });
      if(is_present){return 0;}
      else return 1;
      }
      else{
            var filtered_item = list.filter(book => {
            const lc = book.title.toLowerCase();
            return lc.includes(filter);
      		} );


      		if(filtered_item.length ===1){
       		 	return filtered_item[0].id;
     	 	}
     		else if ( filtered_item.length === 0 ){
       			return 0;
     		}
      		else{
        		return -1;
      		}
		}
  }



  componentDidMount(){
    this.getdata();
  }
  getdata = () => {
      axios
          .get('http://localhost:8000/api/catalogue/')
          .then(res => this.setState({ activebook: res.data}))
          .catch(err => console.log(err));
  }




  render(){
    return(
      <div className="bg2">
        <h2 align="center" className="heading">Add a new Book</h2>
        <div align="center">
        <button className="button button1" onClick={this.addBook} >Add new Book</button>
        <button className="button button3" onClick={this.deleteBook}>Delete book</button>
        <form >
          <input className="addBookForm" type="text" name="title" value={this.state.new_book.title} onChange={this.handleChange} placeholder="Title" />
          <input className="addBookForm" type="text" name="author" value={this.state.new_book.author} onChange={this.handleChange} placeholder="author" />
          <input className="addBookForm" type="text" name="barcode" value={this.state.new_book.barcode}  onChange={this.handleChange} placeholder="barcode" />
        </form></div><br/><br/>
        <Paper >
              <Table >
                <TableHead>
                  <TableRow hover>
                    <StyledTableCell align="center">Book Title</StyledTableCell>
                    <StyledTableCell align="center">Author</StyledTableCell>
                    <StyledTableCell align="center">Bar Code</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
          {this.state.activebook.map(item =>(
            <TableRow hover >
            <StyledTableCell align="center">{item.title}</StyledTableCell>
            <StyledTableCell align="center">{item.author}</StyledTableCell>
            <StyledTableCell align="center">{item.barcode}</StyledTableCell>
            </TableRow>
          ) )}
          </TableBody>
          </Table>
            </Paper>
      </div>
    )
  }


}
