import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import api from '../services/api'
import mapMarker from '../images/map-marker.png'

interface OrphanageItem {
  id: number
  name: string
  latitude: number
  longitude: number
}

const OrphanagesMap = () => {

  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([])

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  const navigation = useNavigation()

  const handleNavigateToOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id })
  }

  const handleNavigateToCreateOrphanage = () => {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#15C3D6" style={"light"} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.446184,
          longitude: -48.4005532,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        { orphanages.map(orphanage => {
          return (
            <Marker 
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout 
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>
        <RectButton 
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name='plus' size={20} color='#FFF' />
        </RectButton>
      </View>
    </View>
  )
}

export default OrphanagesMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right:24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3, //sombra android

  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
})
