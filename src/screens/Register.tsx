import { VStack } from 'native-base';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/header';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useState } from 'react';
import { isLoading } from 'expo-font';


export function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState(false);
  const [description, setDescription] = useState(false);

  const navigation = useNavigation();

  function handleNewOrderRegister() {

    if (!patrimony || !description){
      return Alert.alert("Oops!", "Existem campos não preenchidos!");
    }

    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert("Sucesso!", "Sua solicitação foi cadastrada.");
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert("Não foi possível registrar", "Erro: "+error);
    })

  }

  return (
    <VStack flex={1} bg="gray.600" p={6}>
        <Header title="Nova Solicitação" />

        <Input 
            placeholder='Número do patrimônio'
            mt={4}
            onChangeText = {setPatrimony}
        />

        <Input 
            placeholder='Descrição do problema'
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
            onChangeText = {setDescription}
        />

        <Button 
            title='Cadastrar'
            mt={10}
            isLoading={isLoading}
            onPress={handleNewOrderRegister}
        />

    </VStack>
  );
}