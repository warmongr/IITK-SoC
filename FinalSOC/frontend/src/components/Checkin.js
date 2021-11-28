import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import './circulation.css';
import './input.css';


export default class Check extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bar_checkin : "",
        date_checkin : "",
        card_checkout : "",
        bar_checkout : "",
        date_checkout: "",
        books: [],
        circulation_books : []
      };

      this.checkin = this.checkin.bind(this);
      this.checkout= this.checkout.bind(this);
      this.search_barcode_in=this.search_barcode_in.bind(this);
      this.search_barcode_out=this.search_barcode_out.bind(this);
      this.handleBar_checkin= this.handleBar_checkin.bind(this);
      this.handleDate_checkin= this.handleDate_checkin.bind(this);
      this.handleCard_checkout= this.handleCard_checkout.bind(this);
      this.handleBar_checkout= this.handleBar_checkout.bind(this);
      this.handleDate_checkout= this.handleDate_checkout.bind(this);

    }
    handleBar_checkin(e) {
        this.setState({bar_checkin: e.target.value});
    }
    handleDate_checkin(e) {
        this.setState({date_checkin: e.target.value});
    }
    handleCard_checkout(e) {
        this.setState({card_checkout: e.target.value});
    }
    handleBar_checkout(e) {
        this.setState({bar_checkout: e.target.value});
    }
    handleDate_checkout(e) {
        this.setState({date_checkout: e.target.value});
    }



    componentDidMount(){
    this.getdata();
    }

    getdata = () => {
        axios
              .get("http://localhost:8000/api/catalogue/")
              .then(res => this.setState({ books: res.data}))
              .catch(err => console.log(err));
        axios
              .get("http://localhost:8000/api/circulation/")
              .then(res=> this.setState({circulation_books: res.data}))
              .catch(err => console.log(err));

      }





    render() {
      return (

        <div className="bg">
        <div className="content">
        <h1 className="heading" align="center">Book Circulation</h1>
        <hr />


        <div className="conatiner">
<div className="wrap">

	<div className="box one">
		<h1>CHECKIN</h1>
		<div class="poster p1">
        <form name='check_in'>
                        Book Code <input type='text' name='bar_checkin' placeholder="Please enter book code" value={this.state.bar_checkin} onChange={this.handleBar_checkin} /><br/> <br/>
                        {/* Date <input type='text' name='date_checkin' placeholder="dd/mm/yy" value={this.state.date_checkin} onChange={this.handleDate_checkin} /><br/> <br/> */}
                        <button type="button" onClick={this.checkin}>CHECKIN</button>
                        <br/><br/>
                        <br/><br/><br/>
                    </form>
		</div>
	</div>

    <div class="box two">
		<h1>CHECKOUT</h1>
		<div class="poster p2">
        <form name='checkout'>
                        Card No. <input type="text" name="card_checkout" placeholder="Enter card no." value={this.state.card_checkout} onChange={this.handleCard_checkout} /> <br/><br/>
                        Book Code <input type='text' name='bar_checkout' placeholder="Please enter book code" value={this.state.bar_checkout} onChange={this.handleBar_checkout} /><br/> <br/>
                        {/* Date <input type='text' name='date_checkout' placeholder="dd/mm/yy" value={this.state.date_checkout} onChange={this.handleDate_checkout} /><br/> <br/> */}
                        <button type="button" onClick={this.checkout}>CHECKOUT</button>
                        <br/><br/>
                        <br/><br/><br/>
                    </form>

		</div>
	</div>

    </div>
    </div>




        </div>
        </div>

      );
    }

incr_date(date_str){
  var parts = date_str.split("-");
  var dt = new Date(
    parseInt(parts[0], 10),      // year
    parseInt(parts[1], 10) - 1,  // month (starts with 0)
    parseInt(parts[2], 10)       // date
  );
  dt.setDate(dt.getDate() + 7);
  parts[0] = "" + dt.getFullYear();
  parts[1] = "" + (dt.getMonth() + 1);
  if (parts[1].length < 2) {
    parts[1] = "0" + parts[1];
  }
  parts[2] = "" + dt.getDate();
  if (parts[2].length < 2) {
    parts[2] = "0" + parts[2];
  }
  return parts.join("-");
}
    search_barcode_in(books){
        const bar = this.state.bar_checkin.toLowerCase();

        const result = books.filter(item =>(
            item.barcode.toLowerCase().includes(bar)
        ));
        return result[0];

    }
    search_barcode_out(){
        const bar = this.state.bar_checkout.toLowerCase();

        const result = this.state.books.filter(item =>(
            item.barcode.toLowerCase().includes(bar)
        ));
        return result[0];

    }
    checkin(){
        const book = this.search_barcode_in(this.state.books);
        if(book.status){
            alert("Already checked in!");
        }
        else{
        book.status = true;
        book.issued_to = "";
        book.return_date =new Date().getFullYear() + '-' + new Date().getMonth() + '-'+ new Date().getDate();
        console.log(book);
        var url = "http://localhost:8000/api/catalogue/" + book.id + "/";
        console.log(url);
        axios
            .put(url,book)
            .then(res => alert(book.title+" checked in"))
            .catch(err=> console.log(err));
        const circulated_book = this.search_barcode_in(this.state.circulation_books);
        circulated_book.status = true;
        circulated_book.return_date =book.return_date;
        var url2 = 'http://localhost:8000/api/circulation/'+ circulated_book.id + "/";
        axios
            .put(url2,circulated_book)
            .then(res => console.log("yep"))
            .catch(err => console.log(err));
        }
    }
    checkout(){
        const book = this.search_barcode_out();
        book.status = false;
        book.issued_to = this.state.card_checkout;
        book.issue_date = new Date().getFullYear() + '-' + new Date().getMonth() + '-'+ new Date().getDate();
        book.return_date = this.incr_date(book.issue_date);
        var url = "http://localhost:8000/api/catalogue/" + book.id + "/";
        axios
            .put(url,book)
            .then(res => console.log('checked out'))
            .catch(err=> console.log(err));
        const circulation_book = {"username":book.issued_to,"title":book.title,'author':book.author,'barcode':book.barcode,'status':book.status,'issue_date':book.issue_date,"return_date":book.due_date}
        axios
            .post("http://localhost:8000/api/circulation/",circulation_book)
            .then(res => alert(book.title +" cheked out to " + book.issued_to ))
            .catch(err => console.log(err));

    }



  }
