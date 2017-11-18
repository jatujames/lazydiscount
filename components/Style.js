import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 3,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center'
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },
    displayText: {
        color: '#212121',
        fontSize: 38,
        fontWeight: 'normal',
        textAlign: 'right',
        justifyContent: 'center',
        padding: 20
    },
    displayTextContent:{
        flex:0.5,
        justifyContent: 'center',
        paddingLeft:10,
        backgroundColor:'#FFF',
        alignItems:'center',
        paddingBottom:3    
    },
    displayTextContent2:{
        flex:1,
        justifyContent: 'center',
        paddingLeft:10,
        backgroundColor:'#F44336',
        alignItems:'center',
        paddingBottom:3
         
    },
    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },
    
});

export default Style;