import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import moment from 'moment';

const CustomComment = ({item}) => {
  const date = new Date(item?.created_at);
  return (
    <View
      style={{
        borderRadius: 8,
        padding: 10,
        width: '100%',
        marginTop: 10,
        backgroundColor: '#F4F6F8',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        {item?.avatar && (
          <Image
            source={{
              uri: item?.avatar,
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
            }}
          />
        )}
        <View style={{flex: 2, marginLeft: 10}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
              {item?.name}
            </Text>
          
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
            <Text
              style={{
                color: '#919EAB',
                fontSize: 14,
              }}>
              {moment(date).fromNow()}
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingVertical: 8}}>
        <Text style={{paddingHorizontal: 10, color: 'black', fontSize: 14}}>
          {item?.content}
        </Text>
      </View>
    </View>
  );
};

export default CustomComment;
