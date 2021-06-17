import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputSearchPass from './comp/InputSearchPass';
import axios from 'axios';


const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6204,-122.3491&radius=2500&type=restaurant&key=AIzaSyDkGIvqAXuuOE5TUoDedazelbPdKtQxb1E';
const Home = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    /**
     * it will call search api on every keystroke
     * and update ui accordingly
     */
    useEffect(() => {
        if (searchValue && searchValue.length === 0) {
            fetchApi();
        } else {
            searchApi();
        }
    }, [searchValue]);

    /// it will show initial restaurant
    const fetchApi = () => {
        setLoading(true);
        axios.get(url).then(x => {
            let _data = x.data?.results;
            setData(_data);
            setLoading(false);
        });
    };

    /// search api to display result using keyword
    const searchApi = () => {
        setLoading(true);
        const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6204,-122.3491&radius=2500&type=restaurant&keyword=${searchValue}&key=AIzaSyDkGIvqAXuuOE5TUoDedazelbPdKtQxb1E`;
        axios.get(searchUrl).then(x => {
            let _data = x.data?.results;
            setData(_data);
            setLoading(false);
        });
    };

    const renderItem = (item, index) => {
        // let url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=5184&photoreference=';
        // let photoRef = item['photos'][0]['photo_reference'];
        // let imageUrl = url + photoRef;
        return <View style={styles.itemContainer}>
            <Image source={{uri: item.icon}} style={styles.imageStyle}/>
            <View style={styles.itemInner}>
                <View style={{flex: 1}}>
                    <Text style={styles.header}>{item.name}</Text>
                    <Text style={styles.header1}>{item.business_status}</Text>
                    <Text style={styles.header1}>{item.vicinity}</Text>
                </View>
                <Text style={styles.rating}>{item.rating}</Text>
            </View>
        </View>;
    };

    return <View style={{flex: 1, height: '100%'}}>

        <InputSearchPass
            containerStyle={{marginVertical: '1%'}}
            placeholder={'Enter your search here'}
            value={searchValue}
            onCrossPress={() => setSearchValue('')}
            onChangeText={(v) => setSearchValue(v)}
        />

        {loading ? (
            <ActivityIndicator
                style={styles.progress}
                color={'blue'}
                size={'large'}
            />
        ) : null}
        <View style={{flex: 1, height: '100%'}}>
            <FlatList
                data={data}
                style={{marginTop: 30}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return renderItem(item, index);
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    </View>;
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    itemInner: {
        justifyContent: 'space-around', flexDirection: 'row', marginLeft: 10, flex: 1,
    },
    progress: {
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    itemContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        padding: 3,
        marginVertical: 5,
        elevation: 6,
        backgroundColor: 'white',
    },
    imageStyle: {
        margin: 4,
        width: 120, height: 120, resizeMode: 'stretch',
    },
    header: {
        padding: 4,
        fontSize: 18,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 5,
        paddingVertical: 2,
        margin: 4,
        color: 'white',
        alignSelf: 'flex-start',
        backgroundColor: 'green',
    },
    header1: {
        fontSize: 15,
        color: 'gray',
    },
});
