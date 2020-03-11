import React, { Component } from 'react';
import {  FlatList, AsyncStorage, ImageBackground, Image,  Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, Button, Picker, SafeAreaView, StatusBar} from 'react-native';
import {  NavigationScreenProp } from 'react-navigation';
import FormInput from '../../components/common/form-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import EnIcon from 'react-native-vector-icons/Entypo';
import AppConstant from '../../utils/appConstants';
import UtilsFunction from '../../utils/utilsFunction';

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
      <View style={{backgroundColor:"#1F3279",paddingHorizontal:20,flexDirection:"row",alignItems:"center",position:"absolute",top:0,right:0}}>
          <Picker
                prompt="Select country"
                style={{width: 60,padding:0}}
                onValueChange={(itemValue, itemIndex) =>
                    this.handleChangeOption(itemValue)
                }>
                {this.createOptions()}
          </Picker>
          <EnIcon name="location" size={25} style={{marginLeft:-34}} color="white"/>
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

  item = ( item :any) => {    
    return (
      <View style={{paddingVertical:10,flexDirection:'row',alignSelf:'center',marginVertical:5,width:"90%"}}>
          <View style={styles.itemLeftBody}>
              <Text style={styles.itemTitle}>{item.item.Variety}</Text>
              <Text style={styles.itemPara}>{item.item.Country}</Text>
              <Text style={styles.itemVariety}>{item.item.Brand}</Text>
              <Text style={{fontFamily:'Montserrat-Regular'}}>{item.item.Style}</Text>
              <View style={[styles.ratingLabel,{backgroundColor:item.item.Stars>4.5?'#4FB172':'#FBA635',opacity:item.item.Stars=="NaN"?0:1}]}>
                <Icon name="star" color="white" size={10} style={{paddingHorizontal:3}}/>
                <Text style={{fontSize:12,color:'white',fontFamily:'Montserrat-Medium'}}>{item.item.Stars}</Text>
              </View>
          </View>
          <View style={[styles.itemRightBody,{backgroundColor:AppConstant.colors[new UtilsFunction()._setColor(item.index)]}]}>
            <Text style={styles.itemYearTag}>{item.item['Top Ten'].split(' ')[0]}</Text>
            <Text style={styles.itemRankTag}>{item.item['Top Ten'].split(' ')[1]}</Text>
            <Icon name="circle" style={{position:'absolute',bottom:-15,right:-12}} size={40} color={AppConstant.secondaryColors[new UtilsFunction()._setColor(item.index)]}/>
          </View>
      </View>
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
    showSearchbox = () => {            
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ expanded: !this.state.expanded });  
    }
  render() {
    return (
      <View style={styles.mainContainer}>
          <StatusBar backgroundColor="#F5F6FA" barStyle="dark-content"></StatusBar>
          <FlatList
            style={styles.listStyle}
            data={this.state.filteredData}
            renderItem={(item :any) =>this.item(item)}
            keyExtractor={(item:any) => item.id}
          />
          <View style={styles.inputBox}>
            {this.state.expanded &&  <FormInput conf={this.state.searchBarConfig} updateState={this._filterText}/>}
            
          </View>
          <View style={styles.locationBox}>
            <EnIcon name="location-pin" size={20} color="black"/>
            <Text style={{fontSize:16,fontFamily:'Montserrat-Medium'}}>{this.state.location!=null?this.state.location:'Not selected'}</Text>
          </View>
          <View style={{alignItems:"center",position:"relative",backgroundColor:'#1F3279',height:50,justifyContent:'center'}}>
            <TouchableOpacity  style={{position:'absolute',left:20,bottom:15}} activeOpacity={1} onPress={()=>this.showSearchbox()}>
              <Icon name="search" size={25} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize:24,fontFamily:'Montserrat-Bold',letterSpacing:2,backgroundColor:'#1F3279',color:'white'}}>{'Eatery'}</Text>
            {this.HeaderLocationIcon()}
          </View>
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
    flex:1,
    backgroundColor:'#F5F6FA'
  },
  inputBox: {
    backgroundColor:"#1F3279",
    marginBottom:0,
    paddingVertical:15,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
  },
  locationBox: {
    position:'absolute',
    top:20,
    flexDirection:"row",
    alignSelf:"center", 
    backgroundColor:"white",
    paddingHorizontal:10,
    borderRadius:50,
    alignItems:'center',
    elevation:15,
    paddingVertical:5,
  },
  title: {
    fontSize: 32,
    color:"#000",
  },
  itemLeftBody:{
    backgroundColor:'white',
    width:'76%',
    marginRight:'4%',
    borderRadius:8,
    elevation:5,
    paddingHorizontal:15,
    paddingVertical:10,
    justifyContent:'center'
  },
  itemRightBody:{
    backgroundColor:'red',
    width:'20%',
    borderRadius:8,
    elevation:5,
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden'
  },
  itemTitle:{
    fontSize:18,
    color:"#013220",
    fontFamily:'Montserrat-Bold'
  },
  itemPara:{
    fontSize:16,
    color:"grey",
    lineHeight:26,
    fontFamily:'Montserrat-Regular'
  },
  itemVariety:{
    fontFamily:'Montserrat-Bold'
  },
  itemYearTag:{
    color:'white',
    paddingBottom:10,
    fontSize:18,
    fontFamily:'Montserrat-Bold'
  },
  itemRankTag:{
    color:'white',
    fontSize:24,
    fontFamily:'Montserrat-Bold'
  },
  ratingLabel:{
    position:"absolute",
    bottom:10,
    right:10,
    paddingVertical:2,
    paddingRight:10,
    paddingLeft:5,
    backgroundColor:"#5C97D1",
    borderRadius:50,
    flexDirection:'row',
    alignItems:'center'
  },
  listStyle: {
    width:'100%',
  }
});