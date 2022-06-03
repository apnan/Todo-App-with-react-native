import React,{useState} from 'react';
import { StyleSheet, SafeAreaView, View,Text, TextInput,TouchableOpacity,FlatList, Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { MaterialIcons,Ionicons } from '@expo/vector-icons'; 
const COLORS = {primary:'coral', white:'#fff'}


const App = () => {
  const[textInput,setTextInput]=useState('');
  // textInput is a variable which contain value textbox.
  // when I change text input value then it add new value for usestate.
  // todos,completetodos current state and setTexinput is function and it updates curerent state
  // todo list of item
  const[todos, setTOdos]= useState([
    // todos=intial todo list.set some initial value
    {id:1, task:'First',completed:false},
    {id:2, task:'Second',completed:false},
  ]);
  // when click todos then go progresstodos and then set setProgresstodos
  const[progresstodos, setProgresstodos]= useState([]);
  const[completetodos, setCompletetodos]= useState([]);

  

// listitem,listitem1,listitem2 3 function  for 3 coloum and todo is parameter and take task attribute.
// when I get todo value then style it.
// then assign todo task property value.
// when onpress markTodoProgress function button then pass todo unique id value
  const ListItem =({todo}) =>{
   return (
   <View style={styles.listItem}>
     <View style={{flex:1}}>
       <Text 
          style={{
            fontWeight:'bold',
            fontSize:15,
            color:COLORS.primary,
            }}>
            {todo.task}
         </Text>
       </View>      
       <TouchableOpacity style={[styles.actionIcon]} onPress={()=>markTodoProgress(todo.id)}>
       <MaterialIcons name="done" size={24} color={COLORS.white} />
       </TouchableOpacity>
       <TouchableOpacity
        style={[styles.actionIcon,{backgroundColor:'blue'}]}        
        onPress={() => deleteTodo(todo.id)}>
       <MaterialIcons name="delete" size={24} color={COLORS.white} />
       </TouchableOpacity>
    </View>
   );
};


const ListItem1 =({todo}) =>{ 
 
  return (
  <View style={styles.listItem}>
    <View style={{flex:1}}>
      <Text 
         style={{
           fontWeight:'bold',
           fontSize:15,
           color:COLORS.primary
           }}>
           {todo.task}     
        </Text>
      </View>
      <TouchableOpacity
       style={[styles.actionIcon,{backgroundColor:'blue'}]}       
       onPress={() => moveToComplete(todo.id)}>
      <MaterialIcons name="delete" size={24} color={COLORS.white} />
      </TouchableOpacity>
   </View>
  );
};

const ListItem2 =({todo}) =>{ 
 
  return (
  <View style={styles.listItem}>
    <View style={{flex:1}}>
    <Text 
         style={{
           fontWeight:'bold',
           fontSize:15,
           color:COLORS.primary,          
           }}>
           {todo.task}     
        </Text>
      </View>     
   </View>
  );
};


// to add task and its validationtion part when I click then its empty
const addTodo =() =>{
  if(textInput ==''){
    Alert.alert('Error','Please write to do');
  } else {
const newTodo={
  // it generates random Id and math a library .when take task then we select random number so we get unique id
  id:Math.random(),
  task:textInput,
  completed:false,
};
// ...spread operator and its add of existing todos and newtodo. no ... new one
setTOdos([...todos,newTodo]);
setTextInput('');
  }
};

// markTodoProgress take todo id value.then filter from todo list find id value.
// when get id value then its come to progress then from doneTodo we make task for newtodo.
// when we filter then done todo filter  and return an array.then 0 index id,task and completed return.
// clone newTodo set progresstodos
const markTodoProgress=(todoId) =>{
const doneTodo = todos.filter(item => item.id == todoId);
const newTodo={
  id:doneTodo[0].id,
  task:doneTodo[0].task,
  completed:true,
};
//add new task to progress.now we have to delete so we filter
//and except that item we take rest and set remaining. when set that means state change.!=not id
setProgresstodos([...progresstodos, newTodo]);
const notcompletedTodos =todos.filter(item => item.id != todoId);
setTOdos(notcompletedTodos);
};
// when tigger deletetodo then filter and take rest  item
const deleteTodo = todoId =>{
  const newTodos = todos.filter(item => item.id != todoId);
  setTOdos(newTodos);
};
const moveToComplete = todoId =>{
  const doneTodo = progresstodos.filter(item => item.id == todoId);
 
const newTodo={
  id:doneTodo[0].id,
  task:doneTodo[0].task,
  completed:true,
};

console.log(newTodo);
// its a spread operator and copy of complete todos and new todo aswell and it filters item based on id
setCompletetodos([...completetodos, newTodo]);
const progresstodo =progresstodos.filter(item => item.id != todoId);
setProgresstodos(progresstodo);
};


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
      <View style={styles.header}>
      <Text style={styles.tittle}>My Todo list </Text>
      </View>
      <FlatList 
      contentContainerStyle={{padding:20, paddingBottom:100}}
      data={todos}
       renderItem={({item}) => <ListItem todo={item}/>}
       />
      <Text style={{fontWeight: 'bold',fontSize:20,color:COLORS.primary,textAlign:'center'}}>
        In Progress
      </Text>
      <FlatList 
     contentContainerStyle={{padding:20, paddingBottom:100}}
     data={progresstodos}
      renderItem={({item}) => <ListItem1 todo={item}/>}
      />
     <Text style={{fontWeight: 'bold',fontSize:20,color:COLORS.primary,textAlign:'center'}}>
        Completed List
      </Text>
     <FlatList 
      contentContainerStyle={{padding:20, paddingBottom:100}}
      data={completetodos}
       renderItem={({item}) => <ListItem2 todo={item}/>}
       />
      <View style={styles.footer}>
      <View style={styles.inputContainer}>
      <TextInput placeholder="Add TODO"
      value={textInput}
      onChangeText={(text) =>setTextInput(text)}/>
      </View>
      <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
        <Ionicons name="add" color={COLORS.white} size={30}/>
        </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  listItem:{
    padding:20,
    backgroundColor:COLORS.white,
    flexDirection:'row',
    elevation:12,
    borderRadius:7,
    marginVertical:10,
  },
  actionIcon:{
    height:25,
    width:25,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    borderRadius:3,
  },
  header:{
    height:80,
    paddingTop:38,
    backgroundColor:'coral'
},
tittle:{
    textAlign:'center',
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
},
  footer:{
    position:'absolute',
    bottom:0,
    backgroundColor:COLORS.white,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
  },
  inputContainer:{
    backgroundColor: COLORS.white,
    elevation:40,
    flex:1,
    height:50,
    marginVertical:20,
    marginRight:20,
    borderRadius:30,
    paddingHorizontal:20,
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor: COLORS.primary,
    elevation:40,
    alignItems:'center',
    borderRadius:25,
    justifyContent:'center',
  },
});

export default App;
