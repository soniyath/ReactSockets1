import React, {Component} from 'react'
import {Text, StyleSheet, View, Button} from 'react-native'

export default class ServerExample extends Component {
    constructor(props){
      super(props)
      this.state ={
        response: " Click to connect the server"
      }
    }

    connect= () =>{
      const URL = "http://10.0.2.2:8080/welcome";
      fetch(URL).then(response => {
        if(response.status == 200){
          //the server responded good no problem at all
          return response.text()
        }
        else{
          throw new Error("Something is wrong");
        }
      }).then(resonseText => {
this.setState({response: resonseText});
      }).catch(error => {
        console.error(error.message);
      });
    }
  
    render(){
      return(
        <View>
          <Text style={styles.title}> {this.state.response}</Text>
          <Button title="connect" onPress={this.connect}></Button>
          </View>
      )
    }
}
const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    margin:10
  }

});