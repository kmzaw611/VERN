import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal, TextInput, FlatList, Switch, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const methods = require('../MondgoDB/testClient');

 

 export default class GroupScreen extends React.Component {

      constructor() 
      {
        super();
        this.state={
            show: false,
            names: [],
            reload: false,
            title: "",
            bio: "",
            privacy: false,
            pass: ""
          }
          this.showTitle = "No Groups";
          this.id = {
              _id: ""
          };
          this.gid = {
              _id: ""
          };
          this.groupList = [];
          this.inGroup = false;
     }

     componentDidMount() {
         AsyncStorage.getItem('userID')
             .then(result => {
                 this.id._id = ("" + result);
                 this.refresh_thing();
             })
             .catch(err => {
                 console.error(err);
             });
     }

     refresh_thing = () => {
         this.groupList.splice(0, this.groupList.length);
         methods.get_user(this.id, (res) => {
             if (res != null) {
                 for (var i = 0; i < res.groups.length; i++) {
                     this.gid._id = res.groups[i];
                     methods.get_group((res2) => {
                         if (res2 != null) {
                             this.inGroup = true;
                             const dat = {
                                 _id: res2._id,
                                 title: res2.title
                             }
                             this.groupList.push(dat);
                         }
                         if (i == res.groups.length)
                             this.setState({ reload: true });
                     }, this.gid);
                 }
                 if (res.groups.length == 0) {
                     this.inGroup = false;
                     this.groupList.push({
                         _id: "000000",
                         title: "No Groups Found"
                     });
                     this.setState({ reload: true });
                 }
             }
             else {
                 console.log("no users found");
             }
         });
     }

     addGroupHandler = () => {
         var groupjson = {
             creatorID: this.id._id,
             title: this.state.title,
             color: "#FFFFFF",
             bio: this.state.bio,
             private: this.state.privacy,
             password: ""
         };
         if (this.state.privacy == true)
             groupjson.password = this.state.pass;
         console.log(groupjson);
         console.log(this.groupList.length);
         if (this.groupList.length < 10) {
             methods.create_group((result) => {
                 if (result != null) {
                     if (!(result === "Title Taken")) {
                         console.log("Result:");
                         console.log(result);

                         var data = {
                             _id: result._id,
                             userID: groupjson.creatorID
                         }
                         methods.group_add((result2) => {
                             this.inGroup = true;
                             this.showTitle = result.title;
                             data.userID = "6062b01ff3991910e0a4291e";
                             methods.group_add((result2) => {
                                 this.refresh_thing();
                             }, data);
                         }, data);

                     } else {
                         console.log("Title taken")
                     }
                 } else {
                     console.log("Failed");
                 }

             }, groupjson);
         }
     }

      addName(newName) {
        this.setState({names: newName})
     }


     onGroupPress = (groupID) => {
         if (this.inGroup)
             this.props.navigation.navigate("MyGroupScreen",
                 {
                     refresh: this.refresh_thing.bind(this),
                     id: groupID
                 });
     }


     render() {
         const renderGroup = ({ item }) => (
             <TouchableOpacity onPress={() => { this.onGroupPress.bind(this)(item._id) }}
                 style={styles.sampleGroup}>
                     <Text style={styles.sampleGroupText}>{item.title}</Text>
             </TouchableOpacity>
         )
         if (this.state.reload === true) {
             return (
                 <ScrollView>
                 <View>
                     <TouchableOpacity onPress={() => { this.setState({ show: true }) }}>
                         <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15 }}>Create a New Group</Text>
                     </TouchableOpacity>

                         <TouchableOpacity onPress={() => { this.props.navigation.navigate("SearchScreen") }}>
                         <Text style={{ color: 'brown', fontSize: 14, fontWeight: 'bold', textAlign: 'right', marginRight: 15 }}>Find Group</Text>
                    </TouchableOpacity>

                    

                    <Text style={styles.title}>Groups</Text>
                    <TouchableOpacity style={styles.followButton}
                        onPress={() => { this.refresh_thing.bind(this)() }}>
                        <Text>refresh</Text>
                    </TouchableOpacity>
                         <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                             data={this.groupList}
                             renderItem={renderGroup}
                             keyExtractor={(item, index) => item._id}
                             />
                         </SafeAreaView>
                     
                     <Modal
                         transparent={true}
                         visible={this.state.show}

                     >
                         <View style={{ backgroundColor: "#000000aa", flex: 1 }}
                         >
                             <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                 <Text style={styles.title}>Create a Group</Text>

                                 <TextInput
                                     style={styles.inputEmailPassword}
                                     label="Group Name"
                                     placeholder="Enter your Group Name"
                                     value={this.state.title}
                                     onChangeText={(newValue) => this.setState({ title: newValue })}
                                 />

                                 <TextInput style={styles.inputEmailPasswordBio}
                                     label="Group Bio"
                                     placeholder="Enter your Group Bio"
                                     value={this.state.bio}
                                     onChangeText={(newValue) => this.setState({ bio: newValue })}
                                 />
                                 <Text>Private?</Text>
                                 <Switch
                                     trackColor={{ false: "#767577", true: "#81b0ff" }}
                                     thumbColor={this.state.privacy ? "#f5dd4b" : "#f4f3f4"}
                                     value={this.state.privacy}
                                     onValueChange={(newValue) => {
                                         this.setState({ privacy: newValue });
                                     }}
                                  />
                                 {
                                     this.state.privacy ?
                                     <TextInput
                                         style={styles.inputEmailPassword}
                                         label="Password"
                                         placeholder="Enter your password"
                                         value={this.state.pass}
                                         onChangeText={(newValue) => this.setState({ pass: newValue })}
                                     /> : null
                                 }
                                 <TouchableOpacity onPress={() => {
                                     this.addGroupHandler.bind(this)();
                                     this.setState({ show: false });
                                 }}>
                                     <Text style={{ color: 'brown', marginTop: 15, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Done</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={() => {
                                     this.setState({ show: false });
                                 }}>
                                     <Text style={{ color: 'brown', marginTop: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 15, textAlign: 'center' }}>Cancel</Text>
                                 </TouchableOpacity>
                             </View>
                         </View>
                     </Modal>
                     </View>
                 </ScrollView>
             )
         }
         else {
             return (<Text> Loading </Text>);
         }
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
followButton: {
    alignItems: 'center',
    backgroundColor: '#cfb991',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
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
