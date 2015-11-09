var React = require('react-native');
var Api = require('./src/api');

var {
  AppRegistry,
  MapView,
  View,
  Text,
  StyleSheet
} = React;

var Weather = React.createClass({
    getInitialState: function(){
      return {
        pin: { latitude: 0, longitude: 0 },
        city: '',
        temperature: '',
        description: ''
      }
    },
    render: function(){
      var pins = [
        { latitude: 37, longitude: -95 }
      ];

      return(
        <View style={styles.container}>
          <MapView 
            style={styles.map}
            annotations={[this.state.pin]}
            onRegionChangeComplete={this.onRegionChangeComplete}
            >
          </MapView>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{this.state.city}</Text>
            <Text style={styles.text}>{this.state.temperature}</Text>
            <Text style={styles.text}>{this.state.description}</Text>
          </View>
        </View>
      )
    },
    onRegionChangeComplete: function(region){
      // whenever user stops dragging, return long/lat coords
      this.setState({
        pin: {
          longitude: region.longitude,
          latitude: region.latitude
        }
      });

      // when using 'function' keyword, 'this' is a mystery in promise, unless we bind
      // fat arrow function, 'this' === entire component
      // pin will not be overwritten: setState is additive, not destructive
      Api(region.latitude, region.longitude)
        .then((data) => {
            console.log(data);
            this.setState({
              city: data.city,
              temperature: data.temperature,
              description: data.description
            });
        });
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('DeepThoughts', () => Weather);