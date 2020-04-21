
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';


// const App: () => React$Node = () => {
  class Products extends Component {
    constructor(){
      super()
      this.state = {
        productImages: [],
        fetching: false
      }
    }
    componentDidMount(){
      this.setState({fetching: true})
      fetch('https://hplussport.com/api/products.php')
      .then(response => response.json())
      .then(products => products.map(product => product.image))
      .then(productImages => this.setState({
        productImages,
        fetching: false
      }))
      .catch(err => 
        console.error('error fetching products', err),)
    }
    render(){
      return (
        <ScrollView horizontal={true}>
          <ActivityIndicator 
            size='large'
            style={styles.spinner}
            animating={this.state.fetching}
          />
          {this.state.productImages.map((uri, i) => (
            <Image 
              style={styles.thumb} 
              key={i}
              source={{uri}}/>
          ))}
        </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  thumb: {
    width: 375,
    resizeMode: 'cover'
  }
})

export default Products
