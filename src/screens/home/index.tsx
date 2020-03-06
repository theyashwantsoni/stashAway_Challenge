import React, { Component } from 'react';
import {  FlatList, AsyncStorage, ImageBackground, Image,  Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, Button, Picker, SafeAreaView} from 'react-native';
import {  NavigationScreenProp } from 'react-navigation';
import FormInput from '../../components/common/form-input';
import Icon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

interface props{
  navigation: NavigationScreenProp<any,any>
}
interface state{
  searchBarConfig:any,
  expanded:boolean,
  expandedIndex:any,
  restaurentsData:any,
  filteredData:any,
  location:string,
  countries:any
}

export default class HomeScreen extends Component<props, state> {

    handleChangeOption = (val:string) => {      
      if(this.state.location!=val){        
        this.setState({location:val})
      }else{        
        this.setState({location:null})
      }
    }
    createOptions = () =>{
      let optionsTsx = [];
      optionsTsx.push(<Picker.Item label={'none'} value={'none'} />)
      for(let i=0; i <this.state.countries.length ; i++){      
          optionsTsx.push(<Picker.Item label={this.state.countries[i]} value={this.state.countries[i]} />)
      }
      return optionsTsx; 
    }
  
  
 
    HeaderLocationIcon = () =>{
      return (
      <View style={{backgroundColor:"white",paddingHorizontal:20,flexDirection:"row",alignItems:"center",position:"absolute",top:0,right:0}}>
          <Picker
                prompt="Select country"
                style={{width: 20,padding:0}}
                onValueChange={(itemValue, itemIndex) =>
                    this.handleChangeOption(itemValue)
                }>
                {this.createOptions()}
          </Picker>
          <FaIcon name="map-marked" size={25} style={{marginLeft:-34}} color="#6a8680" />
         </View>
      )
    }
  
  
  constructor(props: props){
    super(props);
    this.state = {
        searchBarConfig: {
          value:"",
          isHidden:false,
          placeholder:"Search for restaurants...",
          name:"search"
        },
        expanded:false,
        expandedIndex:null,
        restaurentsData:[],
        filteredData:[],
        location:null,
        countries:[]
    } 
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount = () => {
    this.fetchData();

  }
  changeLayout = (index:number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });  
    if(index!=this.state.expandedIndex){
      this.setState({expandedIndex:index})
    }else{
      this.setState({expandedIndex:null})
    }
  }
  _filterText =(name:string, value:string)=>{
    let filtered = this.state.restaurentsData.filter(
      (element:any) => {
        if(this.state.location!=null){
         if(element.Brand.toLowerCase().includes(value.toLowerCase()) && element.Country.toLowerCase() == this.state.location.toLowerCase()){ 
            return element;
          }else if(value.length==0){
            return element;
          }
        }else if(element.Brand.toLowerCase().includes(value.toLowerCase())){
          return element;
        }
      }
    );
    this.setState({filteredData:filtered})
  }

  item = ( item :any ) => {    
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.changeLayout(item.index)}}>
          <View style={{ height: this.state.expandedIndex==item.index ? 180 : 120,overflow:'hidden',backgroundColor:"white",paddingVertical:20,width:'95%',alignSelf:'center',marginVertical:10,borderRadius:10}}>
            <View  style={styles.item}>
              <View style={styles.image}></View>
              <View style={styles.iteminfo}>
                  <Text style={styles.itemTitle}>{item.item.Brand}</Text>
                  <Text style={styles.itemPara}>{item.item.Country}</Text>
                  <Text style={styles.itemPara}>{item.item['Top Ten']}</Text>
                  <View style={styles.ratingLabel}><Text style={{fontSize:16,color:"#fff"}}>{item.item.Stars}</Text></View>
              </View>
            </View>
            <View  style={styles.item2}>
              <View style={{width:"100%"}}><Text >{item.item.Variety}</Text></View>
              <View style={{width:"100%"}}><Text >{item.item.Style}</Text></View>
            </View>
          </View>
        </TouchableOpacity>
    );
    }

    fetchData = () => {
      let countries = [];
      fetch('http://starlord.hackerearth.com/TopRamen', {
        method: 'GET'
      })
     .then((response) => response.json())
     .then((responseJson) => {
       responseJson.forEach((element:any) => {
         element.id = makeid(10);
         countries.push(element.Country);
       });

        this.setState({filteredData:responseJson, restaurentsData:responseJson});
        this.setState({countries:getUnique(countries)})
     })
     .catch((error) => {
        console.error(error);
     });
    }
  render() {
    return (
      <View style={styles.mainContainer}>
          <View style={{alignItems:"center",position:"relative",backgroundColor:'white',height:60,justifyContent:'center'}}>
            <Text style={{fontSize:24,fontWeight:"bold",letterSpacing:2,backgroundColor:'white'}}>{'Discover'}</Text>
            {this.HeaderLocationIcon()}
          </View>
          <View style={styles.locationBox}>
            <Icon name="location-pin" size={30} color="#6a8680"/>
            <Text style={{fontSize:16,color:"#6a8680"}}>{this.state.location!=null?this.state.location:'Not selected'}</Text>
          </View>
          <View style={styles.inputBox}>
            <FormInput conf={this.state.searchBarConfig} updateState={this._filterText}/>
          </View>
          <FlatList
            style={styles.listStyle}
            data={this.state.filteredData}
            renderItem={(item :any ) =>this.item(item)}
            keyExtractor={(item:any) => item.id}
          />
      </View>
    );
  }
}

const getUnique = (array:any) =>{
  let uniqueArray = [];
  
  for(let i=0; i < array.length; i++){
      if(uniqueArray.indexOf(array[i]) === -1) {
          uniqueArray.push(array[i]);
      }
  }
  return uniqueArray;
}
const makeid = (length:number) : string =>{
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }



const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor:"#13568A", 
    flex:1,
  },
  inputBox: {
    backgroundColor:"#fff",
    marginBottom:0,
    paddingVertical:15,
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  },
  locationBox: {
    flexDirection:"row",
    alignItems:"center", 
    backgroundColor:"white",
    paddingHorizontal:10,
  },
  item: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  item2: {
    paddingVertical:20,
    paddingHorizontal: 20,

  },
  title: {
    fontSize: 32,
    color:"#000",
  },
  image:{
    width:80,
    height:80,
    borderColor:"#000",
    borderRadius:5,
    backgroundColor:"#ccd8b2",

  },
  iteminfo:{
    position:"relative",
    width:270,
    marginHorizontal:20
  },
  itemTitle:{
    fontSize:32,
    // fontWeight:"900",
    lineHeight:32,
    color:"#013220",
    fontFamily:'Montserrat-Medium'
  },
  itemPara:{
    fontSize:16,
    color:"grey",
    lineHeight:26,
    fontWeight:"800"
  },
  ratingLabel:{
    position:"absolute",
    top:0,
    right:10,
    paddingVertical:2,
    paddingHorizontal:15,
    backgroundColor:"#5C97D1",
    borderRadius:50
  },
  listStyle: {
    width:'100%',
  }
});