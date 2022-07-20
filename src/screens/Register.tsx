import { VStack } from 'native-base';

import { Header } from '../components/header';
import { Input } from '../components/input';
import { Button } from '../components/button';

export function Register() {

  return (
    <VStack flex={1} bg="gray.600" p={6}>
        <Header title="Nova Solicitação" />

        <Input 
            placeholder='Número do patrimônio'
            mt={4}
        />

        <Input 
            placeholder='Descrição do problema'
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
        />

        <Button 
            title='Cadastrar'
            mt={10}
        />

    </VStack>
  );
}