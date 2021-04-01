import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Modal, TextInput} from 'react-native'



 

 class GroupScreen extends React.Component {

  constructor() 
  {
    super();
    this.state={
      show: false,
      names: []
    }
    
  }
  
  addName2 = (newName) => {
    this.setState({names: newName})
  }

  onGroupPress = () => navigation.navigate("MyGroupScreen");
 //}= ({ navigation }) => {
   render() {

   
  return (
      <View>

    <TouchableOpacity onPress={()=>{this.setState({show: true})}}>
          <Text style={{color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15}}>Create a New Group</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{color: 'brown', fontSize: 14, fontWeight: 'bold', textAlign: 'right', marginRight: 15}}>Find Group</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Groups</Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyGroupScreen")}
        style={styles.sampleGroup}>
          <Text style={styles.sampleGroupText}>Sample Group Name</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={this.state.show}
          
          >
            <View style={{backgroundColor: "#000000aa", flex: 1}}
            >
              <View style={{backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1}}>
              <Text style={styles.title}>Create a Group</Text>

              <TextInput 
                style={styles.inputEmailPassword}
                label="Group Name"
                placeholder="Enter your Group Name"
                //value={email}
                //onChangeText={onChangeEmail}
              />

              <TextInput style={styles.inputEmailPasswordBio}
                label="Group Bio"
                placeholder="Enter your Group Bio"
                //value={email}
                //onChangeText={onChangeEmail}
              />

              <Text style={styles.title}>Users</Text>
              <TextInput style={styles.inputEmailPassword}
                label="New User"
                placeholder="New User..."
                //value={email}
                onChangeText={this.addName2}
              />

              <View>
                <Text>{this.state.names}</Text>
              </View>

              <TouchableOpacity onPress={()=>{this.addName2({names})}}>
                <Text style={{color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center', borderRadius: 10}}>Add User</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{this.setState({show: false})}}>
                <Text style={{color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center'}}>Done</Text>
              </TouchableOpacity>
              </View>
              
            </View>
            
          </Modal>

      </View>
  )
  }
}
 

 const styles = StyleSheet.create({
  inputEmailPassword: {
    width: 225,
    height: 40,
    margin: 5,
    backgroundColor: '#cfb991',
    color: 'black',
    borderRadius: 10,
    textAlign: 'center'
  },
  inputEmailPasswordBio: {
    width: 225,
    height: 100,
    margin: 5,
    backgroundColor: '#cfb991',
    color: 'black',
    borderRadius: 10,
    textAlign: 'center'
  },
  groupCard: {
    width: 250,
    height: 250,
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 2.0,
    alignItems: 'center',
  },
  groupName: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  groupMembers: {
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
  groupImage: {
    width: 225,
    height: 150,
    borderRadius: 15,
    marginTop: 15,
  },
  horizontalRule: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.0,
    width: 250,
  },
  playlistCard: {
    width: 150,
    height: 150,
    marginTop: 20,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistImage: {
    width: 150,
    height: 150,
  },
  performanceCard: {
    width: 225,
    margin: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center'
  },
  performanceDetail: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  performanceImage: {
    width: 200,
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
  },
  performanceTitle: {
    color: 'gray',
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  playlistTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    padding: 10,
  },
  sectionContainer: {
    justifyContent: 'center',
    margin: 10,
    marginBottom: 5,
  },
  tintDarkContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8e6f3e',
    margin: 10,
    marginBottom: 5,
    fontFamily: 'sans-serif-condensed',
    textAlign: 'center'
  },
  sampleGroup: {
    backgroundColor: '#8e6f3e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding:15,
    margin: 20
  },
  sampleGroupText: {
    alignContent: 'center',
    fontWeight: 'bold',
    fontSize: 20

  }
})

export default GroupScreen;
