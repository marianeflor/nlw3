import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

interface HeaderProps {
  title: string
  showCancel ?: boolean
}

const Header = ({title, showCancel = true} : HeaderProps) => {

  const navigation = useNavigation()

  const handleGoBackAppHomePage = () => {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name='arrow-left' seize={24} color='#15d6d6'/>
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>
      
      { showCancel 
        ? (
          <BorderlessButton onPress={handleGoBackAppHomePage}>
            <Feather name='x' seize={24} color='#ff669d'/>
          </BorderlessButton>
        )
        : (
          <View />
        )
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    padding: 24,
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: '#8fa7b3',
  },
})
