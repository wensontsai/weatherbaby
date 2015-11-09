var React = require('react-native');
var Api = require('./src/api');

var {
  AppRegistry,
  MapView,
  View,
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
        <MapView 
          style={styles.map}
          annotations={[this.state.pin]}
          onRegionChangeComplete={this.onRegionChangeComplete}
          >
        </MapView>
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
        });
    }
});

var styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

AppRegistry.registerComponent('DeepThoughts', () => Weather);