import React, {Component} from 'react'
import {Text, StyleSheet, View, TextInput, Button} from 'react-native'
import socket from 'socket-io'

export default class ServerExample extends Component {
    constructor(props){
      super(props)
      this.state ={
        chatMessage: "",
        chatMessage: []
      
      };
    }
    
    componentDidMount() {
      this.socket = io("http://127.0.0.1:3000");
       this.socket.on("chat message", msg => {
             this.setState({ chatMessages: [...this.state.chatMessages, msg]   
        });
     });
   }
   submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

//     connect= () =>{
//       const URL = "http://10.0.2.2:8080/welcome";
//       fetch(URL).then(response => {
//         if(response.status == 200){
//           //the server responded good no problem at all
//           return response.text()
//         }
//         else{
//           throw new Error("Something is wrong");
//         }
//       }).then(resonseText => {
// this.setState({response: resonseText});
//       }).catch(error => {
//         console.error(error.message);
//       });
//     }
  
    render() {
      const chatMessages = this.state.chatMessage.map(chatMessage => (
        <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
      ));

      return(
        <View style={styles.container}>
        {chatMessages}
        <TextInput
          style={{height: 40, borderWidth: 2, top: 600}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
        </View>
      )
      
    }
}
const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    margin:10
  },
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

});